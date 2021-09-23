import React, {Component} from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// importing the instance of axios from axios-orders.js
import axios from '../../axios-orders';

// Declaring the prices of each ingredients
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false, 
            loading: false
        }
    }

    // Fetching data from the server
    componentDidMount() {
        axios.get('https://react-burger-builder-2437f-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        this.setState({purchasable: sum>0});
    }

    // Accepting the type of the ingredients that needs to be added
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You continue");

        this.setState({
            loading: true
        })

        // Creating a dummy order details that will be sent to the server
        const order = {
            ingredients: null,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false});
            })
            .catch(err => {
                // console.log(err);
                this.setState({loading: false, purchasing: false});
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Making a check if loading is false or not and if loading is false then we will show the orderSummary
        // else just show the loading spinner
        let orderSummary = null;
        

        // Showing the spinner until the ingredients are loaded from the server
        let burger = <Spinner></Spinner>
        
        if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}></Burger>    
                    <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            order={this.purchaseHandler}
                    ></BuildControls>
                </>
            );
            orderSummary = <OderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

                    {burger}
                
            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
