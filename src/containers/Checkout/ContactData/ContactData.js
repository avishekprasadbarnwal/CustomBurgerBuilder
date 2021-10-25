import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import axios from '../../../axios-orders'

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input  from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';


class ContactData extends Component{

    constructor(props){
        super(props);
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    label: 'Name: ',
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'street'
                    },
                    label: 'Street: ',
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    label: 'ZipCode ',
                    validation:{
                        required: true,
                        minLength: 5,
                        maxLength: 7
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    label: 'Country: ',
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    label: 'email: ',
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    label: 'Delivery Method: ',
                    validation:{
                        required: true,
                    },
                    valid: true,
                    touched: false,
                    value: 'fastest'
                }
            },
            formIsValid: false
        }  
    };

    // While placing the order we need to pass all the order details as well as the contact details 
    // to the server
    orderHandler = (event) => {

        // preventDefault will prevent default setting to not to execute
        event.preventDefault();
        const formData = {}
        // Loop through every element in the orderForm
        for(let formElementIdentifier in this.state.orderForm){
            // storing the data in the formData object like 
            // name = 'avishek'
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        } 


        // Creating a dummy order details that will be sent to the server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

    }

    // inputIdentifier will help us to know which object/key that we want to update
    inputChangedHandler = (event, inputIdentifier) => {
        

        // Creating the clone of formElements present in form using its key as inputIdentifier
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
           value:event.target.value,
           valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
           touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedFormElement
        })
        
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        // Finally setting up the updatedOrderForm data to orderForm
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        
        const formElementsArray = [];
        // converting the orderForm data into an array
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..." ></Input> */}
                {/* The use of config is because the location is as arrayname.config.elementname */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        label={formElement.config.label} 
                        isvalid={!formElement.config.valid}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={(event) => {this.inputChangedHandler(event, formElement.id)}}
                        ></Input>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        // Showing the spinner when the form data is sent to server
        if(this.props.loading === true){
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

const mapStateToProps = (state) => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));