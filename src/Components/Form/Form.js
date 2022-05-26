import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import {post} from "../Services";


export default function Form({onClick}) {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    post(data, "/loan")
        .catch(err => {
          console.log(err)
        })

    onClick(data)
  };

  return (
    <div className="form_container">
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="data_entry">
          <label>Enter First Name:</label>
            <input type="text"{...register("firstName", { required: true })} />
            {errors.firstName?.type === "required" && "First name is required"}

        </div>

        <div className="data_entry">
          <label>Enter Last Name:</label>
            <input type="text"{...register("lastName", { required: true })} />
            {errors.lastName?.type === "required" && "Last Name is required"}
        </div>

        <div className="data_entry">
          <label>Credit Score:</label>
            <input
              type="number"
              {...register("creditScore", { required: true, min: 500 })}
            />
            {errors.creditScore?.type === "required" &&
              "Credit Score is required"}
            {errors.creditScore?.type === "min" &&
              "Credit Score must be above 500"}

        </div>

        <div className="data_entry">
          <label>Salary:</label>
            <input type="number"{...register("salary", { required: true })} />
            {errors.salary?.type === "required" && "Salary Score is required"}
        </div>

        <div className="data_entry">
          <label>Property Amount:</label>
            <input
              type="number"
              {...register("propertyAmount", { required: true, min: 200000, max: 10000000})}
            />
            {errors.propertyAmount?.type === "required" && "Property Amount is Required"}
            {errors.propertyAmount?.type === "min" && "Property Amount must be greater than 200,000"}
            {errors.propertyAmount?.type === "max" && "Property Amount must be less than 200,000"}
        </div>

        <div className="data_entry">
          <label>Money Down:</label>
            <input
              type="number"
              {...register("downPayment", { required: true })}
            />

        </div>

        <div className="data_entry">
          <label>Loan Term:
            <select>
              <option type="number" value="30" {...register("loanTerm")}>
                30 Year
              </option>
            </select>
        </label>
        </div>

      <h3>Address:</h3>

      <div className="data_entry">
          <label>Street:</label>
            <input type="text" 
            {...register("street", { required: true })} />
            {errors.street?.type === "required" && "Credit Score is required"}
        </div>

        <div className="data_entry">
          <label>City:</label>
            <input type="text" 
            {...register("city", { required: true })} />
            {errors.city?.type === "required" && "Credit Score is required"}
        </div>

        <div className="data_entry">
          <label>Zip Code:</label>
            <input type="text" 
            {...register("zip", { required: true })} />
            {errors.zip?.type === "required" && "Credit Score is required"}
        </div>

        <input type="submit" />
      </form>
    </div>

  );



  
}
