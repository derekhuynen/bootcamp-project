import react from 'react'
import './Displayresult.css'

export default function DisplayResult({loanCalculations}){
        const {userLoan, yearly, monthly} = loanCalculations;

        return (
            <div className={"display_result"}>
                {userLoan.qualified ?
                    <div>
                        <h1>You Qualified</h1>
                        <h3>Loan Amount: ${userLoan.loanAmount.toFixed(2)}</h3>
                        <h3>Rate: {(userLoan.userRate).toFixed(2)}%</h3>

                        <h1>Monthly: </h1>
                        <h3>Loan Payment: ${monthly.loanPayment.toFixed(2)}</h3>
                        <h3>Property Tax: ${monthly.propertyTax.toFixed(2)}</h3>
                        <h3>Property Insurance: ${monthly.propertyInsurance.toFixed(2)}</h3>
                        <h3>Total: ${monthly.total.toFixed(2)}</h3>

                        <h1>Yearly: </h1>
                        <h3>Loan Payment: ${yearly.loanPayment.toFixed(2)}</h3>
                        <h3>Property Tax: ${yearly.propertyTax.toFixed(2)}</h3>
                        <h3>Property Insurance: ${yearly.propertyInsurance.toFixed(2)}</h3>
                        <h3>Total: ${yearly.total.toFixed(2)}</h3>
                    </div>
                    : <div>

                        <h1>You Didn't Qualify</h1>
                        <h3>Loan Cost Per Year: ${yearly.total.toFixed(2)}</h3>
                        <h3>Your Salary: ${}</h3>
                        <h3>You Need to make: ${(yearly.total/.33).toFixed(2)}</h3>
                    </div>}
            </div>
        )
}