import React from 'react';
import PropTypes from 'prop-types';
import { Form,Button,Message } from 'semantic-ui-react';
import validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component{
  
  /***state */
  state = {
    data: {
      email:'',
      password:''
    },
    loading:false,
    errors: {}
  }

  /**events */

  onChange = e => {
    this.setState({
      data:{...this.state.data,[e.target.name]:e.target.value}
    });
  }

  onSubmit = e => {
    
    const errors = this.validate(this.state.data);
    this.setState({errors});

    if(Object.keys(errors).length===0){
      this.setState({loading:true});
      this.props.submit(this.state.data).catch((err) =>{
        if(err.response.data.errors!==undefined){
          this.setState({errors: err.response.data.errors,loading:false});
        }else{
          var Temp = err.response.data;
          var TempGlobalError =  { global : Temp };
          this.setState({errors: TempGlobalError,loading:false});
        }
        }
        );
    }

  }

  /**functions */
  validate = (data) => {
    const errors = {};
    if(!validator.isEmail(data.email)) errors.email = "Not is Email";
    if(!data.password) errors.password = "can't be blanck password ";
    return errors;
  }

  /**render */
  render(){

    const { data,errors,loading  } = this.state;
    
    return (
      <Form onSubmit = {this.onSubmit} loading={loading}>
      {errors.global && (<Message negative><Message.Header>Something went wrong</Message.Header><p>{errors.global}</p></Message>)}
        <Form.Field>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@example.com'
            value={data.email}
            onChange= {this.onChange}
          />
          {errors.email && <InlineError text={errors.email}/>}
        </Form.Field>
        <Form.Field>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={data.password}
            onChange= {this.onChange}
          />
          {errors.password && <InlineError text={errors.password}/>}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;