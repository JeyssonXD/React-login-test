import React from 'react';
import  {Route } from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HomePage from './components/pages/HomePage';
import ConfirmationToken from './components/pages/ConfirmationToken';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignUpPage from './components/pages/SignUpPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import My404Page from './components/pages/My404Page';
import NewBooks from './components/pages/NewBooks';

const App = ({location,isAuthenticated}) => <div>
      <div className='ui container'>
        {isAuthenticated && <TopNavigation />}
        <Route exact location={location} path='/' component={HomePage} ></Route>
        <Route exact location={location} path='/confirmation/:token' component={ConfirmationToken} ></Route>
        <GuestRoute exact location={location} path='/login' component={LoginPage} ></GuestRoute>
        <GuestRoute exact location={location} path='/signup' component={SignUpPage} ></GuestRoute>
        <GuestRoute exact location={location} path='/ForgotPassword' component={ForgotPasswordPage} ></GuestRoute>
        <GuestRoute exact location={location} path='/ResetPassword/:token' component={ResetPasswordPage} ></GuestRoute>
        <UserRoute exact location={location} path='/dashboard' component={DashboardPage} ></UserRoute>
        <UserRoute exact location={location} path='/books/new' component={NewBooks} ></UserRoute>
      </div>
  </div>;

App.propTypes = {
  location : PropTypes.shape({
    pathname : PropTypes.string.isRequired
  }),
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) =>{
  return {
    isAuthenticated:!!state.user.email
  }
}

export default connect(mapStateToProps)(App);
