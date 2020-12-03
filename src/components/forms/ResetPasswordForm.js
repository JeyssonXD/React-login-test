import React from "react";
import PropTypes from 'prop-types';
import {Form,Button,Container,Divider,Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';


class ResetPasswordForm extends React.Component{

    constructor(props){

        super(props);
        const propsToken =  this.props.token;

        this.state={
            data:{
                token:  propsToken,
                password:'',
                repeatPassword:''
            },
            loading:false,
            errors:{}
        }
    }

    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        

        if(Object.keys(errors).length===0){
            this.setState({loading:true});
            this.props.submit(this.state.data).catch((err)=>{
                if(err.response.data.errors!==undefined){
                    this.setState({errors: err.response.data.errors,loading:false});
                  }else{
                    var Temp = err.response.data;
                    var TempGlobalError =  { global : Temp };
                    this.setState({errors: TempGlobalError,loading:false});
                  }
            })
        }
    }

    onChange = e => {
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
          });
    }

    validate = (data) => {
        const errors = {};
        if(!data.password) errors.password="can't be blank password";
        if(!data.repeatPassword && data.password) errors.repeatPassword="write password again";
        if(!data.repeatPassword && !data.password) errors.repeatPassword="write password and rewrite password again please";
        if(data.repeatPassword && data.password && data.repeatPassword!==data.password) errors.repeatPassword="password they are not the same"
        return errors;
    }

    render(){
        const {loading,data,errors} = this.state;
        return(
            <Container>
            <h1>Create new password</h1>
            <Divider />
            <Form  onSubmit={this.onSubmit} loading={loading}>
            {errors.global && <Message negative attached header='Error in server'content={errors.global} />}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Write new Password</label>
                    <input 
                        value={data.password}
                        type="password"
                        name="password"
                        id="passoword"
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>

                <Form.Field error={!!errors.repeatPassword}>
                    <label htmlFor="repeatPassword">Rewrite new Password</label>
                    <input 
                        value={data.repeatPassword}
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        onChange={this.onChange}
                    />
                    {errors.repeatPassword && <InlineError text={errors.repeatPassword}/>}
                </Form.Field>
                <Button primary>Confirm</Button>
            </Form>
            </Container>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit : PropTypes.func.isRequired,
    token : PropTypes.string.isRequired
}

export default ResetPasswordForm;