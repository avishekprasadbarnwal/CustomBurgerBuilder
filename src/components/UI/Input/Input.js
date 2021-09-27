// Input UI component which will take dynamic input and modify it's look and feel

import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.isvalid && props.touched){
        inputClasses.push(classes.Invalid);
    }
    // console.log(classes.InputElement)

    // Applying conditional check for identifying the type of input that is sent
    switch (props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}
                onChange={props.changed} 
                value={props.value}
                {...props.elementConfig} 
                />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                className={inputClasses.join(' ')}
                onChange={props.changed}  
                value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default: 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {/* <input>{props.input}</input> */}
        </div>
    )
}

export default Input;