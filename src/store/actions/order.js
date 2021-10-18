// contains all the actions that will perform the orders action

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// action that will be performed when the order was placed successfully
export const puchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

// Making loading state to true/or showing spinner while data gets loaded
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        // Sending data to our database
        axios.post('/orders.json?auth=' + token , orderData)
            .then(response => {
                dispatch(puchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

// actions for fetching orders details
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return (dispatch) => {

        // Showing spinner while loading
        dispatch(fetchOrdersStart());

        const queryParams= '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/orders.json' + queryParams)
            .then(response => {
                // Converting the orders that we received in the form of object into an array
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                // console.log(fetchedOrders)

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}




