import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

const OderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>
                    {props.ingredients[igkey]}
                </li>
            );
        });

    return (
        <Auxiliary>
            <h3>Your order</h3>
            <p>Delicious burger order with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxiliary>
    )
}

export default OderSummary
