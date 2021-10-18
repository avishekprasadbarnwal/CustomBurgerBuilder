// Contains information about the signIn and signOut page
import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

// importing custom UI elements
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        label: "Name: ",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        label: "Password: ",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
    isSignup: true,
  };

  componentDidMount(){
    // console.log("[Auth.js] executed")
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath('/');
    };
  };

  

  //Method for handling the changes to input boxes
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    // prevents default reloading on form submission
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.name.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const formElementsArray = [];
    // converting the orderForm data into an array
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        label={formElement.config.label}
        isvalid={!formElement.config.valid}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        touched={formElement.config.touched}
        changed={(event) => {
          this.inputChangedHandler(event, formElement.id);
        }}
      ></Input>
    ));

    if (this.props.loading) {
      form = <Spinner></Spinner>
    }

    let errorMessage = null;
    if (this.props.error) {
      // Declaring a custom error message
      errorMessage = (
        <p>{this.props.error}</p>
      )
    }

    // making a check whether a user is authenticated or not and if the user is 
    // authenticated then user will be redirected to home i.e "/" route or else to '/checkout'
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>
    }

    return (
      <div className={[classes.AuthData].join(" ")}>
        {authRedirect}
        {errorMessage}
        <form
          onSubmit={this.submitHandler}
        >
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
