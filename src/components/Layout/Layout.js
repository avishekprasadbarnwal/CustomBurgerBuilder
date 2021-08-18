import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const layout = (props) => {
    return(
        <Auxiliary>
            <div>
                <p>Toolbar, sidedrawer, backdrop</p>
            </div>
            <main className={classes.Content}>{props.children}</main>
        </Auxiliary>
    )
}

export default layout;