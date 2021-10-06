import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (
        class extends Component {

            state = {
                error: null
            }

            componentDidMount(){
                // Creating properties of interceptors
                this.reqInterceptors = axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                });

                // first argument in .use() in axios returns the value that it receives from axios
                // second argument in .use() gives an error message if error is triggered
                this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                    console.log(error);
                    this.setState({error: error});
                })
            }

            

            componentWillUnmount(){
                console.log("[withErrorHandler] componentWillUnmount ", this.reqInterceptors, this.resInterceptors);
                axios.interceptors.request.eject(this.reqInterceptors);
                axios.interceptors.response.eject(this.resInterceptors);
            }

            errorConfirmedHandler = () => {
                this.setState({error: null})
            }

            render(){
                return(
                    <>
                        <Modal 
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props}></WrappedComponent>
                    </>
                )
            }
        }
    )
}

export default withErrorHandler;