import React from 'react';
import LoginForm from "../forms/LoginForm";
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import PropTypes from "prop-types";
import {NavLink} from 'react-router-dom'

 class LoginPage extends React.Component{
  
  submit = data=> this.props.login(data).then(()=>this.props.history.push("/dashboard"));

  render(){
    return(  
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.submit} />
        <NavLink to="/ForgotPassword">Forgot Password?</NavLink>
      </div>
    );
  }
}


LoginPage.propTypes = {
  
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null,{login}) (LoginPage);
