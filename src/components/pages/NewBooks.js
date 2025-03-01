import React from 'react';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';

class NewBooks extends React.Component{

    state = {
      book: null
    }

    onBookSelect = book => this.setState({ book });

    addBook = () => console.log('hi');

    render(){
        return (
          <div>
            <Segment>
              <h1>Add new book to your collection</h1>
              <SearchBookForm onBookSelect={this.onBookSelect} />

              {this.state.book && (<BookForm submit={this.addBook} book={this.state.book}/>)}
            </Segment>
          </div>  
        );
    }
}

export default NewBooks;