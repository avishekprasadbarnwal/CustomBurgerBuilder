import React from 'react';

import classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button';
// using the burger component that is already created to display the summary
import Burger from '../../Burger/Burger';


// Used to display the preview of the ordered item and having buttons to cancel or continue with the order
const CheckoutSummary = (props) => {


    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes well!!!</h1>
            <div style={{width: "100%", margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;