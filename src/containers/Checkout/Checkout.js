import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as actions from "../../store/actions/index";

// Used to display the checkout page
class Checkout extends Component {

  componentWillMount() {
    // This will call onInitPurchase() and update the status of user purchasing item is done or not
    // console.log("[containers/Checkout/Checkout.js] is throughing warning");
    // this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
        // Redirecting of user based upon the purchased data that we get from store i.e purchased 
        const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null;
      summary = (
        <div>
            {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ings}
          ></CheckoutSummary>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     };
// };

export default connect(mapStateToProps)(withRouter(Checkout));
