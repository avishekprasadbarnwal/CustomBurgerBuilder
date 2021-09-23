import React, {Component} from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextprops, nextstate){
        if(nextprops.show !== this.props.show || nextprops.children !== this.props.children){
            return true;
        }
        return false;
    };

    componentDidUpdate(){
        console.log("[Modal.js] componentDidUpdate is called");
    };
    
    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}    
                >
                        {this.props.children}
                </div>
            </Auxiliary>
        )
    }
};

export default Modal;
