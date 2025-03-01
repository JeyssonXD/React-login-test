import React from "react";
import { Message } from 'semantic-ui-react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { resetPasswordRequest } from "../../actions/auth";

class ForgotPasswordPage extends React.Component {

    state = {
        success: false
    }

    submit = data => this.props.resetPasswordRequest(data).then(()=>this.setState({success:true}));

    render(){
        const  { success }  = this.state;
        return(
            <div>
                {
                    success 
                    ? <Message>Email has been sent.</Message>:<ForgotPasswordForm submit={this.submit}/>
                }
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null,{resetPasswordRequest})(ForgotPasswordPage) ;