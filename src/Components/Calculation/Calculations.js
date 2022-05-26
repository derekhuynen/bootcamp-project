function calc(adminValues, userInputs) {
    let userLoan = {
        loanAmount: userInputs.propertyAmount - userInputs.downPayment,
        userRate: interestRateCalc(adminValues, userInputs)
    }
    const pmi = PMI(userLoan.userRate, userLoan.loanAmount);

    const yearly = setValues(
        pmi*12,
        (userInputs.propertyAmount * adminValues.propertyTax),
        adminValues.propertyInsurance
    )
    const monthly = setValues(
        pmi,
        yearly.propertyTax/12,
        adminValues.propertyInsurance/12
    )

    userLoan = {
        qualified: didQualify(adminValues, userInputs, yearly.total),
        ...userLoan
    }
    return {userLoan,yearly, monthly}
}

function setValues(loanPayment, propertyTax, propertyInsurance){
    return {
        total: loanPayment + propertyTax + propertyInsurance,
        loanPayment: loanPayment,
        propertyTax: propertyTax,
        propertyInsurance: propertyInsurance,
    }
}

function PMI(userRate, loanAmount) {
    const i = userRate / 12; //monthly interest rate
    const n = 30 * 12; //number of payments months
    //return monthly payment
    return loanAmount * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function interestRateCalc(adminValues, userInputs) {
    const  downPaymentPenalty = DownPaymentPenalty(userInputs);
    const creditScorePenalty = CreditScorePenalty(userInputs)
    return adminValues.interestRate + downPaymentPenalty + creditScorePenalty;
}

////If you don't put 20% down you get 1% penalty
function DownPaymentPenalty(userInputs){
    let loanAmount = userInputs.propertyAmount - userInputs.downPayment;
    return (userInputs.downPayment <= loanAmount * .20) ? 1 : 0;
}

//Every 50 Credit Point under 750 add .0025
function CreditScorePenalty(userInputs){
    if (userInputs.creditScore >= 750) {
        return 0
    } else{
        return Math.ceil((750 - userInputs.creditScore) / 50) * .25;
    }
}

function didQualify(adminValues, userInputs, yearlyTotal) {
    return (userInputs.salary * adminValues.qualifyingPercent > yearlyTotal)
}

export {PMI, interestRateCalc, didQualify, calc};