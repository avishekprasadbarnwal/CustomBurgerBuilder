import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    };

    // Handler to handle whether the Backdrop will be shown or not 
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    // Toggling the state change 
    sideDrawerToggleHandler = () => {
        // let showSideDrawerToggler = !this.state.showSideDrawer;
        this.setState((prevState) => {
            return{
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    };

    render() {
        // console.log(this.state.showSideDrawer);
        return(
            <Auxiliary>
                <div>
                    <Toolbar 
                        isAuth={this.props.isAuthenticated}
                        drawerToggleClick={this.sideDrawerToggleHandler}></Toolbar>
                    <SideDrawer 
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerClosedHandler}
                    ></SideDrawer>
                </div>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {

//     };
// };

export default connect(mapStateToProps)(Layout);