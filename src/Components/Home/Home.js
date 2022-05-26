import React, {useEffect, useState} from 'react'
import Form from "../Form/Form";
import {get} from "../Services";
import {calc} from "../Calculation/Calculations";
import DisplayResult from "../DisplayResult/DisplayResult";
import './Home.css'


export default function Home(){
    const [adminValues, setAdminValues] = useState(null)
    const [userInputs, setUserInputs] = useState(null)
    const [loanCalculations, setLoanCalculations] = useState(null)

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
        <div className={"home_container"}>
            <h2>Home</h2>
            <div className={"home_info"}>
                <div className={"home_section"}>
                    <Form onClick={onClick}/>
                </div>
                <div className={"home_section"}>
                    {loanCalculations ? <DisplayResult loanCalculations={loanCalculations}/> : null}
                </div>
            </div>
        </div>
    )
}