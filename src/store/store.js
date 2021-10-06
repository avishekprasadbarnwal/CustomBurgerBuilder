import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './reducers/burgerBuilder';
import orderReducer from './reducers/orderReducer';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

