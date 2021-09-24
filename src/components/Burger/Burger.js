// This file will contain all jsx for the Burger
import React from 'react';
// import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {

    // console.log(props)

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        },[]);

    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please start inserting ingredient</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default Burger;
