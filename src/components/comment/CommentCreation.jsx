import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
class CommentCreation extends Component {
    state = { 
        bookId: null,
        message: null
     }
    style = {
        margin: {
            'margin-top': '10px'
        },
        enable: {
            'background-color': 'green',
            'color': 'white',
            'height': '20px',
        }
    }
    
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
        this.setState({bookId:this.props.children})
    }
    
    handleSubmit = event => {
        event.preventDefault();  
        this.userAddCommentFetch(this.state);
    }
    
    userAddCommentFetch = comment => {
        fetch("https://hovananhkim-book.herokuapp.com/api/comments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message){
                    console.log(data);
                    this.props.dispatch({type:'ADD_COMMENT', comment:data})
                }
            });
    }

    render() { 
        return ( 
            <div style={this.style.margin}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group>
                        <Form.Control 
                            style={this.style.margin}
                            type="text" 
                            as="textarea"
                            name="message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            placeholder="Enter message..." />
                        </Form.Group>
                    <div style={{'text-align':'right','margin-top':'10px'}}><Button type='submit' style={this.style.enable}>Add</Button></div>
                </Form>
            </div>
         );
    }
}
 
export default connect()(CommentCreation);