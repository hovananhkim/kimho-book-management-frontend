import { Button, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
class UserEdition extends Component {
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
        firstName: '',
        lastName: '',
        avatar: '',
    }
    componentDidMount () {
        const id = this.props.match.params.id;
        fetch("https://hovananhkim-book.herokuapp.com/api/users/"+id)
          .then(res => res.json())
          .then(data => {
                if (data.firstName){
                    this.setState({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        avatar: data.avatar
                    })
                }
            }) 
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        this.userEditionUserFetch(this.state);
    }

    userEditionUserFetch = user => {
        const id = this.props.match.params.id;
        fetch("https://hovananhkim-book.herokuapp.com/api/users/"+id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.firstName){
                    console.log(data);
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
                        label="First Name" 
                        onChange={this.handleChange}
                        name='firstName'
                        value={this.state.firstName}
                        />
                    <TextField 
                        style={this.style.input}
                        label="Last Name" 
                        onChange={this.handleChange}
                        name='lastName'
                        value={this.state.lastName}
                        />
                    <TextField 
                        style={this.style.input}
                        label="Avatar" 
                        onChange={this.handleChange}
                        name='avatar'
                        value={this.state.avatar}
                        />
                    <div style={{'text-align':'right'}}><Button type='submit' style = {this.style.enable} >Update</Button></div>
                    </Form>
                }
            </div>
         );
    }
}
 
export default UserEdition;