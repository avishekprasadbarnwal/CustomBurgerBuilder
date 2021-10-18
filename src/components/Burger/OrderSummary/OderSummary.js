import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OderSummary extends Component {

    // Making a check when the OderSummary component is updated
    // componentDidUpdate(){
    //     console.log("[OrderSummary] componentDidUpdate");
    // }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>
                    {this.props.ingredients[igkey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button 
                    btnType="Danger"
                    clicked={this.props.purchaseCancelled}
                >CANCEL</Button>
                <Button 
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OderSummary
