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

    // Method for checking validity of the input data that is sent by the user in form
    checkValidity(value, validation) {
        let isValid = true;
        
        // Checking if the value received is empty or not i.e has some data or not
        // if there is some data then it will set isValid to true
        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }

        if(validation.maxLength){
            isValid = value.length <= validation.maxLength && isValid;
        }

        // console.log(validation)

        // if(validation.maxLength){
        //     isValid = value.length <= validation.maxLength;
        // }

        return isValid;
    }

    // While placing the order we need to pass all the order details as well as the contact details 
    // to the server
    orderHandler = (event) => {

        // preventDefault will prevent default setting to not to execute
        event.preventDefault();

        // this.setState({
        //     loading: true
        // });

        // we need to pass only the key and its value element to the server like 
        // name and the data present in the value key inside it
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
            orderData: formData
        }

        this.props.onOrderBurger(order);

        // // Sending data to our database
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         // console.log(err);
        //         this.setState({loading: false});
        //     });
        //     console.log(order);
    }

    // inputIdentifier will help us to know which object/key that we want to update
    inputChangedHandler = (event, inputIdentifier) => {
        // In this case we cannot directly update the state because we have to update
        // the state immutably i.e not changing the data individually and so we need
        //  to clone the orderForm data deeply
        
        // Creating clone of orderForm state
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        // Creating the clone of formElements present in form using its key as inputIdentifier
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        // console.log(updatedFormElement.valid);

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);

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
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));