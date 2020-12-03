import {connect} from 'react-redux';
import React  from 'react';
import {NavLink} from "react-router-dom";
import {Message,Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {confirm} from '../../actions/auth';


class ConfirmationToken extends React.Component{
    
    constructor(){
        super();
        this.state = {
            loading: true,
            success: false,
        };
    }


    async componentDidMount(){
        try{
            await this.props.confirm(this.props.match.params.token);
            this.setState({loading: false, success:true});
        }catch(e){
            this.setState({loading: false, success:false});
        }
    }
    
    render()
    {
        const {loading,success} = this.state;

        return (
            <div>
                {loading && 
                    <Message icon> 
                        <Icon name="circle notched" loading/>
                        <Message.Header>Validating your email</Message.Header>
                    </Message>}

                {!loading && success && 
                      <Message positive  icon>
                      <Icon name='check' />
                      <Message.Header>Operation success!!</Message.Header>
                      <Message.Content>
                        <p>
                            Great!! you <b>account</b> its confirmed.
                        </p>
                        <NavLink to='/Dashboard'>Go to Dashboard</NavLink>
                      </Message.Content>
                    </Message>
                }

                {!success && !loading &&
                <Message icon>
                    <Message.Content>
                        <Icon name="bug"/>
                        <Message.Header>
                            Sorry, error not identified
                        </Message.Header>
                    </Message.Content>
                </Message>
                }
            </div>
        );
    }
}

ConfirmationToken.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null,{confirm})(ConfirmationToken);