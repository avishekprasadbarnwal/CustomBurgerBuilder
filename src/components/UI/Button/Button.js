import React from 'react';
import classes from './Button.module.css';

function Button(props) {
    return (
        <div style={{display: 'inline'}}>
            <button 
                disabled={props.disabled}
                className={[classes.Button, classes[props.btnType]].join(' ')} 
                onClick={props.clicked}
            >{props.children}</button>
        </div>
    )
}

export default Button
