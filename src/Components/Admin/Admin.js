import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Admin() {
  const [adminValues, setAdminValues] = useState(null);
  const [inputs, setInputs] = useState({});

  const obj = {
    PropertyTax: 0.012,
    PropertyInsurance: 1500,
    InterestRate: 0.05, //Calc
    QualifyingPerc: 0.33,
  };

  useEffect(() => {
    get();
  }, []);

  function get() {
    fetch("http://localhost:5000/values/1")
      .then((res) => res.json())
      .then((data) => setAdminValues(data))
      .catch(function (error) {
        console.log(error);
      });
  }

  function put(data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/values/1", requestOptions)
      .then(() => get())
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const obj = {
        id: 1,
        propertyTax: 0, 
        propertyInsurance: 0, 
        interestRate: 0, 
        qualifyingPercent: 0

    }
    console.log(inputs);
  };

  return (
    <>
      <h1> Admin Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              PropertyTax:
              <input
                type="number"
                name="propertyTax"
                value={inputs.propertyTax || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              PropertyInsurance:
              <input
                type="number"
                name="propertyInsurance"
                value={inputs.propertyInsurance || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              InterestRate:
              <input
                type="number"
                name="interestRate"
                value={inputs.interestRate || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Qualifying Percent:
              <input
                type="number"
                name="qualifyPercent"
                value={inputs.qualifyPercent || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  );
}
