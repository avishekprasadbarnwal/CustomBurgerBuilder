import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <div>
            <li className={classes.NavigationItem}>
                {/* activeClassName property will allow us to set a class name to the link */}
                <NavLink 
                    to={props.link}
                    exact={props.exact}
                    activeClassName={classes.active}>{props.children}</NavLink>
            </li>
        </div>
    )
}

export default NavigationItem;
