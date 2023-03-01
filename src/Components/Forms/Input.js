import React from 'react'
import "./Input.css"


export default function Input(props) {

    const changeHandler = (event) => {
        console.log(event.target.value)
    }

    const element = props.element === "input" ? (
        <input type={props.type} className={props.className} placeholder={props.placeholder} onChange={changeHandler} />
    ) : (
        <textarea placeholder={props.placeholder} className={props.class}  onChange={changeHandler}/>
    )
            
            
    
    return (
        <div>
            {element}
        </div>
    )
}
