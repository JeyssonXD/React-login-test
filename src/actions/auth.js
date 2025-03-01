import { USER_LOGGED_IN,USER_LOGGED_OUT } from '../types';
import api from '../api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

 export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = user => ({
  type: USER_LOGGED_OUT
});

export const login = credentials =>  dispatch =>
                     api.user.login(credentials).then(user => {
                        localStorage.bookWormJWT = user.token;
                        setAuthorizationHeader(user.token);
                        dispatch(userLoggedIn(user))
                      });


export const logout = () =>  dispatch =>
                      {
                        localStorage.removeItem('bookWormJWT');
                        setAuthorizationHeader();
                        dispatch(userLoggedOut())
                      };

export const SignUp = (data) => (dispatch) =>
                      api.user.signup(data).then(user=>{
                        localStorage.bookWormJWT = user.token;
                        dispatch(userLoggedIn(user));
                      }
                      );

export const confirm = (token) => (dispatch) =>
                      api.user.confirm(token).then(user=>{
                        localStorage.bookWormJWT = user.token;
                        dispatch(userLoggedIn(user));
                      });

export const resetPasswordRequest = ({email}) => () =>
                      api.user.resetPassword(email);

export const validateToken = (token)  => ()=>
                      api.user.validateTokenResetPassword(token);

export const resetNewPassword = (data) => () =>
                      api.user.resetNewPassword(data);
                      