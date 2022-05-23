import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PMI,
  yearlyPaymentCalc,
  interestRateCalc,
} from "../Calculation/Calculations.js";

const obj = {
  PropertyTax: 0.012,
  PropertyInsurance: 1500,
  InterestRate: 0.05, //Calc
  QualifyingPerc: 0.33,
};



let displayData = (data,loanAmount,rate,monthly,qualified) => {
  return (
    <div>
    {qualified ?
    <div>
    <h1>You Qualified</h1> 
      <h3>Loan Amount: {loanAmount}</h3>
      <h3>Rate: {(rate*100).toFixed(2)}%</h3>


      <h1>Monthly: </h1>
      <h3>Payment: ${monthly.toFixed(2)}</h3>
      <h3>Taxes: ${((data.propertyAmount * obj.PropertyTax)/12).toFixed(2)}</h3>
      <h3>Insurance: ${(obj.PropertyInsurance/12).toFixed(2)}</h3>


      <h1>Yearly: </h1>
      <h3>Payment: ${(monthly*12).toFixed(2)}</h3>
      <h3>Taxes: ${(data.propertyAmount * obj.PropertyTax).toFixed(2)}</h3>
      <h3>Insurance: ${obj.PropertyInsurance.toFixed(2)}</h3>
  </div>
  : <div>
    
    <h1>You Didn't Qualify</h1>
    <h3>{((((monthly * 12) + obj.PropertyInsurance + (data.propertyAmount * obj.PropertyTax))/data.salary)*100).toFixed(2)}%</h3>
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
    console.log(obj)
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
      
    setData(data);

    setLoanAmount(data.propertyAmount - data.downPayment);

    //Calclate interest Rate
    const newInterestRate = interestRateCalc(
      adminValues,
      data.creditScore,
      data.downPayment,
      data.propertyAmount
    );

    setRate(newInterestRate);

    //calcualte Monthly 
    setMonthly(PMI(adminValues, data.downPayment, data.propertyAmount))

    //
    setQualified(yearlyPaymentCalc(adminValues,monthly,data.propertyAmount, data.salary))

    
    post(data);
    setLoad(true);
  };




  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="data_entry">
          <label>
            Enter First Name:
            <input type="text" value={"Derek"}{...register("firstName", { required: true })} />
            {errors.firstName?.type === "required" && "First name is required"}
          </label>
        </div>

        <div>
          <label>
            Enter Last Name:
            <input type="text" value={"Huynen"}{...register("lastName", { required: true })} />
            {errors.lastName?.type === "required" && "Last Name is required"}
          </label>
        </div>

        <div>
          <label>
            Credit Score:
            <input
              type="number"
              value="700"
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
            <input type="number" value={500000}{...register("salary", { required: true })} />
            {errors.salary?.type === "required" && "Salary Score is required"}
          </label>
        </div>

        <div>
          <label>
            Property Address:
            <input type="text" 
            value={"1123 Street"}{...register("address", { required: true })} />
            {errors.address?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <div>
          <label>
            Property Amount:
            <input
              type="number"
              value="500000"
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
              value="700"
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
        <input type="submit" />
      </form>


      Loan Amount: {loanAmount}
      {load? displayData(data,loanAmount,rate,monthly,qualified) : null}


      <div>
            Loans:
            {!loans ? "Loading..." :
                loans.map((loan, index)=>{
                return (
                    <div key={index}>
                        {loan.id}
                        {loan.firstName}
                    </div>
                )
            })}
        </div>

      </>
  );



  
}
