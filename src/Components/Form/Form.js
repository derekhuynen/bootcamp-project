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

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    //Calclate interest Rate
    const newInterestRate = interestRateCalc(
      data.creditScore,
      data.downPayment,
      data.propertyAmount
    );

    //Calculate monthlyPayment
    const monthlyPayment = PMI(data.downPayment, data.propertyAmount);

    //Calculate if user qualifies
    const qualify = yearlyPaymentCalc(monthlyPayment, data.propertyAmount, data.salary);

    console.log(data);
  };

  return (
    <>
      {console.log("Qualify: " + yearlyPaymentCalc(1000000, 20000))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="data_entry">
          <label>
            Enter First Name:
            <input type="text" {...register("firstName", { required: true })} />
            {errors.firstName?.type === "required" && "First name is required"}
          </label>
        </div>

        <div>
          <label>
            Enter Last Name:
            <input type="text" {...register("lastName", { required: true })} />
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
            <input type="number" {...register("salary", { required: true })} />
            {errors.salary?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <div>
          <label>
            Property Address:
            <input type="text" {...register("address", { required: true })} />
            {errors.address?.type === "required" && "Credit Score is required"}
          </label>
        </div>

        <div>
          <label>
            Property Amount:
            <input
              type="number"
              {...register("propertyAmount", { required: true })}
            />
          </label>
        </div>

        <div>
          <label>
            Money Down:
            <input
              type="number"
              {...register("moneyDown", { required: true })}
            />
          </label>
        </div>

        <div>
          <label>
            Loan Term:
            <select>
              <option disabled selected value="30" {...register("loanTerm")}>
                30 Year
              </option>
            </select>
          </label>
        </div>
        <input type="submit" />
      </form>
    </>
  );
}
