import React, { Component } from 'react'
import {connect} from 'react-redux';

export class trial extends Component {
    render() {
        console.log(this.props.hello)
        return (
            <div>
                {this.props.hello}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.totalPrice)
    return {
        str: state.totalPrice,
        hello: 2
    }
}

export default connect(mapStateToProps)(trial);
