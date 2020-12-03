import React from 'react';
import PropTypes from 'prop-types';



export default class InlineError extends React.Component{
  
  render(){
    InlineError.propTypes  = {
      text: PropTypes.string
    };
    const ToStringPropText = () =>{
      return this.props.text;
    }
    return(<span  style={{color:"#ae5856"}}>{ToStringPropText()}</span>);
  }

}
