const obj = {
    PropertyTax: 0.012,
    PropertyInsurance: 1500,
    InterestRate: 0.05, //Calc
    QualifyingPerc: .33
}


function PMI(downPayment, propertyAmount){
        //var M; //monthly mortgage payment
        var p = propertyAmount - downPayment; //principle / initial amount borrowed
        var i = obj.InterestRate / 12; //monthly interest rate
        var n = 30 * 12; //number of payments months
        
        //monthly mortgage payment
        //M = monthlyPayment(P, N, I);
        
        
        //return monthly payment
        return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    }



   function interestRateCalc(creditScore, downPayment, propertyAmount){

        console.log("Interest Base: " + obj.InterestRate)
        
        let downPen = 0.00
        let loanAmount = propertyAmount - downPayment; 
        if(downPayment <= loanAmount * .20 ) {
            downPen +=  .01;
        }

        console.log("Down Pen: " + downPen)


        if(creditScore > 750) {
            return obj.InterestRate
        }

        let creditAdditionalRate = Math.ceil((750 - creditScore) / 50)* .0025; 
        console.log("Additional Rate: " + creditAdditionalRate)

        //console.log(downPen + creditAdditionalRate)

        return obj.InterestRate + creditAdditionalRate;

        // 0.025 + 0.01 + 0
    }


   function yearlyPaymentCalc(pmi, propertyAmount, salary){
        console.log("PMI: ", pmi)
        console.log("ProperAmount: ", propertyAmount)
        console.log("Salary:", salary)

        //Total Yearly Payment
        const total = (pmi * 12) + obj.PropertyInsurance + (propertyAmount * obj.PropertyTax)
        console.log("Total:",total)
        

        
        //console.log("Qualify:" ,temp)
        return (salary * obj.QualifyingPerc > total)
    }


    export {PMI, interestRateCalc, yearlyPaymentCalc};