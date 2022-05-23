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
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = (data) => {
      data.prevenetDefault();
    // const obj = {
    //   id: 1,
    //   propertyTax: data.propertyTax,
    //   propertyInsurance: data.propertyInsurance,
    //   interestRate: data.interestRate,
    //   qualifyingPercent: data.qualifyingPercent,
    // };

    // //put(obj);
    console.log("Data: ", data);
  };

  return (
    <>
      <h1> Admin Page</h1>

      <div>
        Loans:
        {!adminValues ? (
          "Loading..."
        ) : (
          <div>
            {/* <div>
              <div>{`Property Tax: ${values.propertyTax}`}</div>
              <div>{`Property Insurance: ${values.propertyInsurance}`}</div>
              <div>{`Interest Rate: ${values.interestRate}\n`}</div>
              <div>{`Qualifying Percent: ${values.qualifyingPercent}\n`}</div>
            </div> */}


            <form onSubmit={handleSubmit}>
              <div className="data_entry">
                <label>Property Tax:
                <input
                  type="number"
                  name = "propertyTax"
                  value={inputs.propertyTax || ""} 
                  onChange={handleChange}
                />
                </label>
              </div>

              <div className="data_entry">
                <label>Property Insurance:</label>
                <input
                  type="number"
                  name = "propertyInsurance"
                  value={inputs.propertyInsurance || ""} 
                  onChange={handleChange}
                />
              </div>

              <div className="data_entry">
                <label>Interest Rate:</label>
                <input
                  type="number"
                  name = "interestRate"
                  value={inputs.interestRate || ""} 
                  onChange={handleChange}
                />

              </div>

              <div className="data_entry">
                <label>Qualifying Percent:</label>
                <input
                  type="number"
                  name="qualifyingPercent"
                  value={inputs.qualifyingPercent || ""} 
                  onChange={handleChange}
                />

              </div>

              <input type="submit" />
            </form>

            

          </div>
        )}
      </div>
    </>
  );
}
