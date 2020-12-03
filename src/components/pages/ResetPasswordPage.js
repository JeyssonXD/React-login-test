import React from 'react';
import PropTypes from 'prop-types';
import {Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { validateToken,resetNewPassword } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends React.Component{
    
    state = {
        loading: true,
        success: false
     };

     async componentDidMount(){
         try{
            await this.props.validateToken(this.props.match.params.token);
            this.setState({loading:false,success:true});
         }catch(e){
            this.setState({loading:false,success:false})
         }
     }

     submit = data => this.props.resetNewPassword(data).then(()=>{ this.props.history.push("/login"); });
     

    render(){

        const { loading,success } = this.state;
        const token = this.props.match.params.token;

        return (
            <div>
                { loading && <Message>Loading</Message> }
                { !loading && success && <ResetPasswordForm submit={this.submit} token={token} /> }
                { !loading && !success && <Message>Invalid Token</Message> }
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
    validateToken : PropTypes.func.isRequired,    
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    history: PropTypes.shape({
        push:PropTypes.func.isRequired
    })
}

export default connect(null,{validateToken,resetNewPassword})(ResetPasswordPage);