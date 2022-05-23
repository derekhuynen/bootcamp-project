import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PMI,
  yearlyPaymentCalc,
  interestRateCalc,
} from "../Calculation/Calculations.js";

//Get Rid of
const obj = {
  PropertyTax: 0.012,
  PropertyInsurance: 1500,
  InterestRate: 0.05, //Calc
  QualifyingPerc: 0.33,
};


//Dispaly Calculation
let displayData = (adminValues,data,loanAmount,rate,monthly,qualified) => {

  const yearlyLoanCost = (monthly * 12)
  const yearlyPropertyTax = (data.propertyAmount * adminValues.propertyTax)
  const yearlyPropertyInsurance = adminValues.propertyInsurance;
  
  const yearlyTotal = yearlyLoanCost + yearlyPropertyTax + yearlyPropertyInsurance


  return (
    <div>
    {qualified ?
    <div>
    <h1>You Qualified</h1> 
      <h3>Loan Amount: {loanAmount}</h3>
      <h3>Rate: {(rate*100).toFixed(2)}%</h3>


      <h1>Monthly: </h1>
      <h3>Payment: ${monthly.toFixed(2)}</h3>
      <h3>Taxes: ${((data.propertyAmount * adminValues.propertyTax)/12).toFixed(2)}</h3>
      <h3>Insurance: ${(adminValues.propertyInsurance/12).toFixed(2)}</h3>


      <h1>Yearly: </h1>
      <h3>Payment: ${(monthly*12).toFixed(2)}</h3>
      <h3>Taxes: ${(data.propertyAmount * adminValues.propertyTax).toFixed(2)}</h3>
      <h3>Insurance: ${adminValues.propertyInsurance.toFixed(2)}</h3>
  </div>
  : <div>
    
    <h1>You Didn't Qualify</h1>
    <h3>Loan Cost Per Year: ${yearlyTotal.toFixed(2)}</h3>
    <h3>Your Salary: ${data.salary}</h3>
    <h3>You Need to make: ${(yearlyTotal/.33).toFixed(2)}</h3>
    </div>}
  </div>
  )
}



export default function Form() {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);

  const [loanAmount , setLoanAmount] = useState(0);
  const [rate , setRate] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [adminValues, setAdminValues] = useState(null);
  const [qualified, setQualified] = useState(false);

  const [loans, setLoans] = useState(null);


  useEffect(()=>{
    getLoans();

    fetch("http://localhost:5000/values/1")
    .then((res) => res.json())
    .then((data) => {
      const obj = {
        propertyTax: data.propertyTax/100,
        propertyInsurance: data.propertyInsurance,
        interestRate: data.interestRate/100,
        qualifyingPercent: data.qualifyingPercent/100,
    }
    setAdminValues(obj)
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])


  function getLoans(){
    fetch("http://localhost:5000/loan")
        .then(res =>
            res.json()
        ).then(data => 
          setLoans(data)
        )
        .catch(function (error) {
            console.log(error);
        })
  }


  const onClick = (user) =>{
    fetch("http://localhost:5000/loan/" + user.id,
        { method: 'DELETE' })
        .then(()=> getLoans())
}

  function post(data){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  fetch("http://localhost:5000/loan", requestOptions)
      .then(response =>
          response.json()
      )
      .then(()=> {
          getLoans()
      });
  }
  

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
  
    //this is good
    setData(data);

    console.log(adminValues);
    setLoanAmount(data.propertyAmount - data.downPayment);

    //Calclate interest Rate
    const newInterestRate = interestRateCalc(
      adminValues,
      data.creditScore,
      data.downPayment,
      data.propertyAmount
    );

    setRate(newInterestRate);

    
    const pmi = PMI(adminValues, data.downPayment, data.propertyAmount);
    console.log("PMI Main: " , pmi)
    //calcualte Monthly 
    setMonthly(pmi)

    setQualified(yearlyPaymentCalc(adminValues, pmi, data.propertyAmount, data.salary))

    
    post(data);
    setLoad(true);
  };




  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="data_entry">
          <label>
            Enter First Name:
            <input type="text"{...register("firstName", { required: true })} />
            {errors.firstName?.type === "required" && "First name is required"}
          </label>
        </div>

        <div>
          <label>
            Enter Last Name:
            <input type="text"{...register("lastName", { required: true })} />
            {errors.lastName?.type === "required" && "Last Name is required"}
          </label>
        </div>

        <div>
          <label>
            Credit Score:
            <input
              type="number"
              {...register("creditScore", { required: true, min: 500 })}
            />
            {errors.creditScore?.type === "required" &&
              "Credit Score is required"}
            {errors.creditScore?.type === "min" &&
              "Credit Score must be above 500"}
          </label>
        </div>

        <div>
          <label>
            Salary:
            <input type="number"{...register("salary", { required: true })} />
            {errors.salary?.type === "required" && "Salary Score is required"}
          </label>
        </div>

        <div>
          <label>
            Property Amount:
            <input
              type="number"
              {...register("propertyAmount", { required: true, min: 200000, max: 10000000})}
            />
            {errors.propertyAmount?.type === "required" && "Property Amount is Required"}
            {errors.propertyAmount?.type === "min" && "Property Amount must be greater than 200,000"}
            {errors.propertyAmount?.type === "max" && "Property Amount must be less than 200,000"}
          </label>
        </div>

        <div>
          <label>
            Money Down:
            <input
              type="number"
              {...register("downPayment", { required: true })}
            />
          </label>
        </div>

        <div>
          <label>
            Loan Term:
            <select>
              <option type="number" value="30" {...register("loanTerm")}>
                30 Year
              </option>
            </select>
          </label>
        </div>

      <h3>Address:</h3>

      <div>
          <label>
            Street:
            <input type="text" 
            {...register("street", { required: true })} />
            {errors.street?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <div>
          <label>
            City:
            <input type="text" 
            {...register("city", { required: true })} />
            {errors.city?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <div>
          <label>
            Zip Code:
            <input type="text" 
            {...register("zip", { required: true })} />
            {errors.zip?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <input type="submit" />
      </form>


      Loan Amount: {loanAmount}
      {load? displayData(adminValues,data,loanAmount,rate,monthly,qualified) : null}


      <div>
            Loans:
            {!loans ? "Loading..." :
                loans.map((loan, index)=>{
                return (
                    <div key={index}>
                        {loan.id}
                        {loan.firstName}
                        <button onClick={()=> onClick(loan)}>Delete</button>
                    </div>
                )
            })}
        </div>

      </>
  );



  
}
