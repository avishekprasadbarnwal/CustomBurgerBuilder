// import AppCss from './App.module.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {

  return (

    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />


        {/* <BurgerBuilder></BurgerBuilder>
        <Checkout></Checkout> */}
      </Layout>
    </BrowserRouter>

    // <div className={AppCss.App}>
    //   <h1>hello world</h1>
    // </div>
  );
}

export default App;
