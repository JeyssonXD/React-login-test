import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import AddBookCTA from '../ctas/AddBookCTA';

const DashboardPage = ({isConfirmed,books}) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage/>}
    {books.length===0 && <AddBookCTA  />}
  </div>
);

DashboardPage.propTypes = {
   isConfirmed: PropTypes.bool.isRequired,
   books: PropTypes.arrayOf(PropTypes.shape({
     title: PropTypes.string.isRequired
   }).isRequired).isRequired
};

function mapStateToProps(state){
  return {
    isConfirmed: !!state.user.emailConfirmed,
    books: allBooksSelector(state)
  }
}

export default connect(mapStateToProps)(DashboardPage);