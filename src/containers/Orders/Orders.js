// Displaying the list of orders to the user
import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    // State that will contain all the fetched data from the server
    state = {
        orders: [],
        loading: true
    }

    // Fetching the orders from database
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {

                // Converting the orders that we received in the form of object into an array
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        return(
            <div>

                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}    
                    ></Order>
                ))}

            </div>
            
        )
    }
}

export default withErrorHandler(Orders, axios);
