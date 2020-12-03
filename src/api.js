import axios from 'axios';

export default{

  user:{
    login: (credentials) => axios.post('/api/account/auth',{credentials}).then(res=>res.data.user),
    signup: (data) => axios.post('/api/account/signup',{data}).then(res=>res.data.user),
    confirm: (token) => axios.post('/api/account/confirmation', {token}).then(res => res.data.user),
    resetPassword: (email) => axios.post('/api/account/resetPassword', {email}),
    validateTokenResetPassword: (token) =>axios.post("/api/account/validateResetPass",{token}),
    resetNewPassword: (data) =>  axios.post("/api/account/resetNewPassword",{data})
  }

}