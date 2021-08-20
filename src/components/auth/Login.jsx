import React, { Component } from 'react';
import { Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from '@material-ui/core';
class Login extends Component {
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
        password: null
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        this.userLoginFetch(this.state)  ;
    }
    userLoginFetch = user => {
        fetch("https://hovananhkim-book.herokuapp.com/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(user)
        })
            .then(respone => respone.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);                    
                    const base64Url = data.token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const userFromToken =  JSON.parse(window.atob(base64));
                    localStorage.setItem('role',userFromToken.scopes);
                    this.props.history.push('/');
                    window.location.reload();
                }      
            })
    }
      
    render() { 
        return (
            <div>
                <h4 style={this.style.feature}>Login</h4>
                <Card style={this.style.card}>
                <Form style={this.style.form} onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Email address *</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            size="sm" 
                            placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={this.style.lable}>Password *</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} 
                            size="sm"
                            placeholder="Password" />
                    </Form.Group>
                    <Button 
                        style= {this.style.button}
                        type='submit' 
                        variant="contained" 
                        size="small">
                        Login
                    </Button>
                </Form>
                </Card>
            </div>
        );
    }
}
 
export default Login;