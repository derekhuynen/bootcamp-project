// const obj = {
//     PropertyTax: 0.012,
//     PropertyInsurance: 1500,
//     InterestRate: 0.05, //Calc
//     QualifyingPerc: .33
// }


function PMI(adminValues,downPayment, propertyAmount){
        //var M; //monthly mortgage payment
        var p = propertyAmount - downPayment; //principle / initial amount borrowed
        var i = adminValues.interestRate / 12; //monthly interest rate
        var n = 30 * 12; //number of payments months
        
        //return monthly payment
        return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    }



   function interestRateCalc(adminValues,creditScore, downPayment, propertyAmount){


        //If you dont put 20% down you get 1% penalty
        let downPenalty = 0.00
        let loanAmount = propertyAmount - downPayment; 
        if(downPayment <= loanAmount * .20 ) {
            downPenalty +=  .01;
        }

        //If CreditScore is above 750 + downPentaly
        if(creditScore > 750) {
            return adminValues.interestRate + downPenalty
        }


        let creditAdditionalRate = Math.ceil((750 - creditScore) / 50)* .0025; 


        return adminValues.interestRate + creditAdditionalRate + downPenalty;

    }


   function yearlyPaymentCalc(adminValues, pmi, propertyAmount, salary){
        console.log("PMI: ", pmi)
        console.log("ProperAmount: ", propertyAmount)
        console.log("Salary:", salary)

        //Total Yearly Payment
        const total = (pmi * 12) + adminValues.propertyInsurance + (propertyAmount * adminValues.propertyTax)
        console.log("Total:",total)
        
        //console.log("Qualify:" ,temp)
        return (salary * adminValues.qualifyingPercent > total)
    }


    export {PMI, interestRateCalc, yearlyPaymentCalc};