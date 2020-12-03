import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route } from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import './components/style/global.css';
import { userLoggedIn } from './actions/auth';
import jwtdecode from 'jwt-decode';
import setAuthorizationHeader from './utils/setAuthorizationHeader';


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

if(localStorage.bookWormJWT){
  const payload = jwtdecode(localStorage.bookWormJWT);
  const user = { token: localStorage.bookWormJWT, email: payload.email, emailConfirmed: payload.confirmed };
  setAuthorizationHeader(localStorage.bookWormJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App}/>
    </Provider>
  </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
