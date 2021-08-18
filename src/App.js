// import AppCss from './App.module.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (

    <Layout>
      <BurgerBuilder></BurgerBuilder>
    </Layout>

    // <div className={AppCss.App}>
    //   <h1>hello world</h1>
    // </div>
  );
}

export default App;
