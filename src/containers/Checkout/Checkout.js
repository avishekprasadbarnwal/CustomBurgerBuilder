import React, {Component} from 'react';
import { withRouter, Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// Used to display the checkout page
class Checkout extends Component{

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {

        // Here URLSearchParams basically retuns the array of the key and value
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        // query.entries() basically gives array of ojects of key-value pair
        for (let param of query.entries()){

            if(param[0] === 'price'){
                price = param[1];
                console.log(price);
            } else {
                // ['salad', '1']
                ingredients[param[0]] = parseInt(param[1]);
                // console.log(ingredients);
            }
            
        }
        console.log(ingredients);
        console.log(price);
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    componentDidMount() {
        console.log('[containers/Checkout/Checkout.js] is throughing warning');

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        
        console.log(this.props);

        return(
            <div>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}></CheckoutSummary>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}></ContactData>)}></Route>

{/* 
                <Route 
                    path={this.props.match.path + '/contact-data'} >
                    <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}></ContactData>
                </Route> */}

            </div>
        );
    }
}

export default withRouter(Checkout);