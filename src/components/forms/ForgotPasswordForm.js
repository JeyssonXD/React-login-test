import React from 'react';
import PropTypes from 'prop-types';
import { Form,Button,Message } from 'semantic-ui-react';
import validator from 'validator';
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
    
    //state
    state = {
        data: {
            email:''
        },
        loading: false,
        errors:{}
    }

    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data,[e.target.name]:e.target.value}
        });
    
    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({loading:true});
            this.props.submit(this.state.data).catch((err) =>{
                if(err.response.data.errors!==undefined){
                  this.setState({errors: err.response.data.errors,loading:false});
                }else{
                  var Temp = err.response.data;
                  var TempGlobalError =  { global : Temp };
                  this.setState({errors: TempGlobalError,loading:false});
                }
            });
        }
    }

    /**functions */
    validate = (data) => {
        const errors = {};
        if(!validator.isEmail(data.email)) errors.email = "Not is Email";
        return errors;
    }

    render(){

        const  { email,loading,errors }  = this.state;

        return(
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global &&  (<Message negative><p>{errors.global}</p></Message>)}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange= {this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>   
                <Button primary>Send</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;