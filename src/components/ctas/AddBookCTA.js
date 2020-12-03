import React from 'react';
import { Card,Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AddBookCTA = (props) =>(
    <Card centered>
        <Card.Content textAlign="center">
            <Card.Header>Add new book</Card.Header>
            <NavLink to="books/new"><Icon name="plus circle" size="massive"/></NavLink> 
        </Card.Content>
    </Card>
);

export default AddBookCTA;