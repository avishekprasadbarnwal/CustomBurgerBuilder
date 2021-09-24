import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import axios from '../../../axios-orders'

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            loading: false
        }  
    };

    // While placing the order we need to pass all the order details as well as the contact details 
    // to the server
    orderHandler = (event) => {

        // preventDefault will prevent default setting to not to execute
        event.preventDefault();

        // alert("You continue");

        this.setState({
            loading: true
        })

        // Creating a dummy order details that will be sent to the server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Avishek',
                address: {
                    street: 'hello street sector-12',
                    zipCode: '12234',
                    country: 'India'
                },
                email: 'texst@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        // Sending data to our database
        axios.post('/orders.json', order)
            .then(response => {
                // console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                // console.log(err);
                this.setState({loading: false});
            });
    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
                <input className={classes.Input} type="text" name="email" placeholder="Your email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postalcode"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        // Showing the spinner when the form data is sent to server
        if(this.state.loading === true){
            form = <Spinner></Spinner>
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);