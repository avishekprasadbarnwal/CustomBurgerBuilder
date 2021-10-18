import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

// import {withRouter} from 'react-router-dom';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions/index';
// import  from '../../store/actions/burgerBuilder';


// importing the instance of axios from axios-orders.js
// import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    constructor(props){
        super(props);
        this.state = {
            purchasing: false
        };
        this.props.onInitIngredients(); 
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

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    // Fetching ingredients data from the server
    // static getDerivedStateFromProps(props, state){
    //     // props.onInitIngredients();
    // }
    // componentWillMount() {
    //     this.props.onInitIngredients(); 
    // }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        // console.log(this.props.ings)

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Making a check if loading is false or not and if loading is false then we will show the orderSummary
        // else just show the loading spinner
        let orderSummary = null;
        

        // Showing the spinner until the ingredients are loaded from the server
        // let burger = <Spinner></Spinner>

        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner></Spinner>
        
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
                            isAuth={this.props.isAuthenticated}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onTryAutoSignup: () => dispatch(actionTypes.authCheckData()),
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
