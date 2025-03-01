import React from 'react';
import PropTypes from 'prop-types';
import { Form,Button, Segment, Grid, Image } from 'semantic-ui-react';

class BookForm extends React.Component{
    
    state = {
        data:{
            goodreadsId: this.props.book.goodreadsId,
            title: this.props.book.title,
            authors: this.props.book.authors,
            cover: this.props.book.covers[0],
            pages: this.props.book.pages
        },
        covers: this.props.book.covers,
        index:0,
        loading: false,
        errors:{}
    };

    componentWillReceiveProps(props){
        this.setState({
            data: {
                goodreadsId: props.book.goodreadsId,
                title: props.book.title,
                authors: props.book.authors,
                cover: props.book.covers[0],
                pages: props.book.pages
            },
            covers: props.book.covers
        });
    }

    onChange = e =>
        this.setState({
            ...this.setState,
            data: { ...this.state.data, [e.target.name]: e.target.value},
        });

    onChangeNumber = e =>
    this.setState({
        ...this.setState,
        data: { ...this.state.data, [e.target.name]: e.target.value},
    });

    ChangeCover = () => {
        const { index, covers } = this.state;
        const newIndex = index + 1 >= covers.length ? 0 : index + 1;
        
        this.setState({ index: newIndex, data : { ...this.state.data, cover: covers[newIndex] }});
    }

    
    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
            .catch(err =>
                 this.setState({ errors: err.reponse.data.errors, loading: false })
                 );
        }
    };

    validate = data => {
        const errors = {};
        if(!data.title) errors.title = "Can't be blank";
        if(!data.authors) errors.authors = "Can't be blank";
        if(!data.pages) errors.pages = "Can't be blank";
        return errors;
    }

    render(){
        const { errors,data,loading } = this.state;
        return (
            <Segment>
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column>

                            <Form.Field error={!!errors.title}>
                                <label htmlFor="title">Book Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={data.title}
                                    onChange={this.onChange}
                                />
                            </Form.Field>

                            <Form.Field error={!!errors.authors}>
                                <label htmlFor="authors">authors</label>
                                <input
                                    type="text"
                                    id="authors"
                                    name="authors"
                                    placeholder="books authors"
                                    value={data.authors}
                                    onChange={this.onChange}
                                />
                            </Form.Field>

                            <Form.Field error={!!errors.pages}>
                                <label htmlFor="pages">pages</label>
                                <input
                                    type="text"
                                    id="pages"
                                    name="pages"
                                    placeholder="pages"
                                    value={data.pages}
                                    onChange={this.onChangeNumber}
                                />
                            </Form.Field>

                        </Grid.Column>

                        <Grid.Column>
                            <Image size="small" src={data.cover} />
                            {/* {this.state.covers.length>1 && (
                                <a role="button" onClick={this.ChangeCover}>Another cover</a>
                            )} */}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button primary>Save</Button>
                    </Grid.Row>
                </Grid>
            </Form>
            </Segment>
        )
    }
}

BookForm.propTypes = {
    submit: PropTypes.func.isRequired,
    book: PropTypes.shape({
        goodreadsId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        pages:  PropTypes.number.isRequired
    }).isRequired
}

export default BookForm;