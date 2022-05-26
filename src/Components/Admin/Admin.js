import { editableInputTypes } from "@testing-library/user-event/dist/utils";
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const obj = {
        id: 1,
        propertyTax: inputs.propertyTax, 
        propertyInsurance: inputs.propertyInsurance, 
        interestRate: inputs.interestRate, 
        qualifyingPercent: inputs.qualifyingPercent
    }

    put(obj)
    console.log(obj);
  };

  return (
    <>
      <h1> Admin Page</h1>
        <div>
        </div>
      {!adminValues ? "Loading..." : 
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              PropertyTax:
              <input
                type="number"
                name="propertyTax"
                value={inputs.propertyTax || adminValues.propertyTax}
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
                value={inputs.propertyInsurance || adminValues.propertyInsurance}
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
                value={inputs.interestRate || adminValues.interestRate}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Qualifying Percent:
              <input
                type="number"
                name="qualifyingPercent"
                value={inputs.qualifyingPercent || adminValues.qualifyingPercent}
                onChange={handleChange}
              />
            </label>
          </div>

          <input type="submit" />
        </form>
      </div>
}
    </>
  );
}
