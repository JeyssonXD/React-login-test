import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import  * as actions from "../../actions/auth";

const HomePage = ({isAuthenticated,logout}) =>(
 <div>
   <h1>Home page</h1>
   {!isAuthenticated?<div><NavLink to='/login'>Login</NavLink> or <NavLink to='/SignUp'>SingUp</NavLink></div>:''}
  </div> 
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProptypes(state){
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProptypes,{logout:actions.logout})(HomePage);