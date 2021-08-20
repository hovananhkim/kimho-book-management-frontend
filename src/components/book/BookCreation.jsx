import { Button, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { connect } from 'react-redux';
class FormBook extends Component {
    style = {
        display : {
            'width': '500px',
            'display': 'block',
            'margin-left': 'auto',
            'margin-right': 'auto'
        },
        input : {
            'width': '100%',
            'margin-bottom': '15px'
        },
        enable: {
            'background-color': 'green',
            'color': 'white',
        },
    }
    state = {
        title: null,
        author: null,
        description: null,
        image: null
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log(this.props.children);
        this.userAddBookFetch(this.state);
    }
    userAddBookFetch = book => {
        console.log(book);
        fetch("https://hovananhkim-book.herokuapp.com/api/books", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.title){
                    console.log(data);
                    this.props.dispatch({type:'ADD_BOOK', book:book})
                }
            });
    }
    render() { 
        return ( 
            <div>
                { localStorage.token && 
                    <Form style={this.style.display} onSubmit={this.handleSubmit}>
                    <TextField 
                        style={this.style.input}
                        required  label="Title" 
                        onChange={this.handleChange}
                        name='title'
                        value={this.state.title}
                        />
                    <TextField 
                        style={this.style.input}
                        required  label="Author" 
                        onChange={this.handleChange}
                        name='author'
                        value={this.state.author}
                        />
                    <TextField 
                        style={this.style.input}
                        label="Description" 
                        onChange={this.handleChange}
                        name='description'
                        value={this.state.description}
                        multiline
                        
                        />
                    <TextField 
                        style={this.style.input}
                        label="Image"
                        onChange={this.handleChange}
                        name='image'
                        value={this.state.image}
                        type='url'
                        />
                    <div style={{'text-align':'right'}}><Button type='submit' style = {this.style.enable} >Add</Button></div>
                    </Form>
                }
            </div>
         );
    }
}
 
export default connect()(FormBook);