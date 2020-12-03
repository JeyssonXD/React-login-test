import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from "react-router-dom";

const UserRoute = ({isAuthenticated,component:Component,...rest}) => (
    <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect  to="/" />} />
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProptypes(state){
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProptypes)(UserRoute);