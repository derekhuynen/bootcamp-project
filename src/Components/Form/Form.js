import React, { useState } from "react";
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
  const [qualified, setQualified] = useState(false);


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
      
    console.log(data)

    setData(data);

    setLoanAmount(data.propertyAmount - data.moneyDown);

    //Calclate interest Rate
    const newInterestRate = interestRateCalc(
      data.creditScore,
      data.moneyDown,
      data.propertyAmount
    );
    setRate(newInterestRate);

    //calcualte Monthly 
    setMonthly(PMI(data.moneyDown, data.propertyAmount))

    //
    setQualified(yearlyPaymentCalc(monthly,data.propertyAmount, data.salary))

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
            <input type="number" value={50000}{...register("salary", { required: true })} />
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
              {...register("moneyDown", { required: true })}
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

      </>
  );



  
}
