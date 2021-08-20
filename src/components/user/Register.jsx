import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from '@material-ui/core';
class Register extends Component {
    style = {
        feature: {
            'text-align': 'center'
        },
        card: {
            'width': '300px',
            'display': 'block',
            'margin-left': 'auto',
            'margin-right': 'auto'
        },
        form: {
            'margin-left': '20px',
            'margin-right': '20px'
        },
        lable: {
            'margin-top': '15px'
        },
        button: {
            'background-color': 'green',
            'color': 'white',
            'width': '100%',
            'margin-top': '20px',
            'margin-bottom': '20px'
        }

    }
    state = {
        email: null,
        firstName: null,
        lastName: null,
        avatar: null,
        password: null,
        status: null
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        this.userRegisterFetch(this.state)  ;
    }
    userRegisterFetch = user => {
        fetch("https://hovananhkim-book.herokuapp.com/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(user)
        })
            .then(respone => respone.json())
            .then(data => {
                if (data.email) {                                       
                    this.props.history.push('/login');
                }      
            })
    }
    render() { 
        return (
            <div>
                <h4 style={this.style.feature}>Register</h4>
                <Card style={this.style.card}>
                <Form style={this.style.form} onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Email address *</Form.Label>
                        <Form.Control type="email" size="sm" placeholder="Enter email" 
                            name='email'
                            value={this.state.email}   
                            onChange={this.handleChange} 
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>First name</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter first name" 
                            name='firstName'
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Last name</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter last name" 
                            name='lastName'
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Avatar</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Enter url avatar" 
                            value={this.state.avatar}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Password *</Form.Label>
                        <Form.Control type="password" size="sm" placeholder="Password" 
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button 
                        style= {this.style.button}
                        type='submit' 
                        variant="contained" 
                        size="small">
                        Register
                    </Button>
                </Form>
                </Card>
            </div>
        );
    }
}
 
export default Register;