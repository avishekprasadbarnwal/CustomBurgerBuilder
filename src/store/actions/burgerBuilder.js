// Contains the actions for building a burger
import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

// Adding sync action creators

export const addIngredients = (nam) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: nam
    }
}

export const addIngredient = (name) => {
    return addIngredients(name);
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// fetching the ingredients from database
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientfailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// Adding async action creators

// fetching the ingredients present in the database
export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-burger-builder-2437f-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                // dispatching an action when fetching of ingredients data is successful
                dispatch(setIngredients(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchIngredientfailed())
            })
    }
}



