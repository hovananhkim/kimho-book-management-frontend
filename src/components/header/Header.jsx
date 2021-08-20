import React, { Component } from 'react';
import { Card, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import './header.css'
import { connect } from 'react-redux';
class HeaderLayout extends Component {
    style = {   
        navlink: {
            'font-size':'16px'
        }
    }
    componentDidMount() {
        const token = localStorage.token;
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const userFromToken =  JSON.parse(window.atob(base64));
            fetch("https://hovananhkim-book.herokuapp.com/api/users/find?email=" + userFromToken.sub,
            {headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }})
                .then(res => res.json())
                .then(data => {
                    this.props.dispatch({type: 'MY_USER',user:data});
                    localStorage.setItem('id',data.id);
        }) 
            
        }
    }
    render() {    
        return (  
            <div>
                <Card className='background'>
                <Navbar  collapseOnSelect expand="lg" >
                <Container>
                <Navbar.Brand href="/">KimHo-Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={this.style.navlink}>
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {localStorage.role==="ROLE_USER" && <Nav.Link href="/mybooks">My Books</Nav.Link>}
                    {(localStorage.role==="ROLE_ADMIN" || localStorage.role==="ROLE_SUPER_ADMIN") && <Nav.Link href="/admin/books">Books</Nav.Link>}
                    {(localStorage.role==="ROLE_ADMIN" || localStorage.role==="ROLE_SUPER_ADMIN") && <Nav.Link href="/admin/users">Users</Nav.Link>}
                    </Nav>
                    <Nav>
                    { !localStorage.token && <Nav.Link href="/login">Login</Nav.Link> }
                    { !localStorage.token && <Nav.Link href="/register">Register</Nav.Link> }
                    { localStorage.token && <Nav.Link href="/logout">Logout</Nav.Link> }
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
                </Card>
            </div>
        );
    }
}
 
export default connect()(HeaderLayout);
