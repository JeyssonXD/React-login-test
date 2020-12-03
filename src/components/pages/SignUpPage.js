import React from 'react';
import {connect} from 'react-redux';
import {SignUp} from '../../actions/auth';
import SignUpForm from '../forms/SignUpForm';
import PropTypes from 'prop-types';

class SignUpPage extends React.Component{

  submit = data =>this.props.SignUp(data).then(()=>this.props.history.push("/dashboard"));

  render(){
    return(
      <div>
        <h1>SignUpPage</h1>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }

}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  SignUp: PropTypes.func.isRequired
};


export default connect(null,{SignUp})(SignUpPage);