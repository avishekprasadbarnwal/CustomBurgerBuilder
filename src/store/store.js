import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './reducers/burgerBuilder';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

