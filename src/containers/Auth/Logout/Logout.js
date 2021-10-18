import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions  from '../../../store/actions/index';

// It will dispatch a logout action and will clear the token
class Logout extends Component {

    // immediately logging out the user as soon as the user reaches this page
    componentDidMount(){
        this.props.onLogout();
    }

    render() {
        return (
            <div>
                <Redirect to='/' ></Redirect>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
