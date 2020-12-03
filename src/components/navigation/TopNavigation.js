import React from 'react';
import {Menu,Dropdown,Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

class TopNavegation extends React.Component {

    state = {
        activeItem: 'Dashboard'
    };

    render(){

        const {activeItem} = this.state;
        const {user,logout} = this.props;

        return(
            <Menu>

            <Menu.Item name='Dashboard' active={activeItem === ''}  as={NavLink} to='/' />
        
            <Menu.Menu position='right'>
                <Dropdown item trigger={<Image avatar src={gravatarUrl(user.email)}/>}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
          </Menu>
        );
    }

};

TopNavegation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,{logout:actions.logout})(TopNavegation);