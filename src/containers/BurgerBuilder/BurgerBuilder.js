import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


// importing the instance of axios from axios-orders.js
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    constructor(props){
        super(props);
        this.state = {
            purchasing: false, 
            loading: false
        }
    }

    // Fetching ingredients data from the server
    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://react-burger-builder-2437f-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        return sum>0;
    }

    // Accepting the type of the ingredients that needs to be added
    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount; 
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount; 
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        // // Adding parameters to the search query passed in the url
        // const queryParams = [];
        // // Passing property_name = property_value and storing them in queryParams[]
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }

        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // once the user pressed continue present in burger summary i.e the user reached this handler
        // then the user will be automatically pushed/redirected to /checkout page 
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        console.log(this.props.ings)

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Making a check if loading is false or not and if loading is false then we will show the orderSummary
        // else just show the loading spinner
        let orderSummary = null;
        

        // Showing the spinner until the ingredients are loaded from the server
        let burger = <Spinner></Spinner>
        
        // let burger = null;
        

        if(this.props.ings){
            burger = (
                <>
                    <Burger ingredients={this.props.ings}></Burger>    
                    <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            order={this.purchaseHandler}
                    ></BuildControls>
                </>
            );
            orderSummary = <OderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                ></OderSummary>
        }

        if(this.state.loading === true){
            orderSummary = <Spinner></Spinner>
        }

        return(
            <Auxiliary>

                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {/* <h1>hello</h1> */}
                    {burger}
                
            </Auxiliary>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        ings: state.ingredients,
        price: state.totalPrice

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
