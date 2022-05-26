import React, {useEffect, useState} from 'react'
import Form from "../Form/Form";
import {get} from "../Services";
import {calc} from "../Calculation/Calculations";
import DisplayResult from "../DisplayResult/DisplayResult";


export default function Home(){
    const [adminValues, setAdminValues] = useState(null)
    const [userInputs, setUserInputs] = useState(null)
    const [loanCalculations, setLoanCalculations] = useState(null)
    const [loans, setLoans] = useState(null)

    useEffect(() =>{
        get(setAdminValues,"/values/1")
            .catch(err => console.log(err))
    },[])

    useEffect(() =>{
        if(userInputs) {
            const temp = calc(adminValues, userInputs);
            setLoanCalculations(temp)
        }
    },[userInputs])


    const onClick = (data) => {
        setUserInputs(data)
    }


    return(
        <div>
            <h2>Home</h2>
            <Form onClick={onClick}/>
            {/*{adminValues ? console.log(adminValues) : "Loading Admin Values..."}*/}
            {/*{userInputs ? console.log(userInputs) : "Loading User Values..."}*/}
            {loanCalculations ? <DisplayResult loanCalculations={loanCalculations}/> : "Loading User Values..."}
        </div>
    )
}