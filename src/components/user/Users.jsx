import { Button, IconButton } from '@material-ui/core';
import { AddCircle, Edit, Lock, LockOpen, RemoveCircle } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
class Users extends Component {
    style = {
        right: {
            'text-align': 'right'
        },
        add: {
            'background-color': 'green',
            'color': 'white',
            'margin-bottom': '15px',
        },
        enable: {
            'background-color': 'green',
            'color': 'white',
            'height': '20px',
        },
        edit: {
            'background-color': 'rgb(255, 217, 0)',
            'color': 'black',
            'height': '20px',
        },
        delete: {
            'background-color': 'rgb(240, 27, 12)',
            'color': 'black',
            'height': '20px',
        },
        center: {
            'padding': '20px 5px',
        }
    }
    state = {
        name: '',
        activePage: 1,
        count: 1
    }
    componentDidMount() {
        fetch("https://hovananhkim-book.herokuapp.com/api/users")
          .then(res => res.json())
          .then(data => {
              this.props.dispatch({type: 'GET_USERS', users:data})
          }
        )
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.adminSearchUsersFetch(this.state.name);
    }

    adminSearchUsersFetch = name => {
        fetch("https://hovananhkim-book.herokuapp.com/api/users/search?name="+name)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              this.props.dispatch({type: 'SEARCH_USERS', users:data})
          }
        )        
    }
    
    handleEnable = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/users/" + id + '/enable', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.email){
                    this.props.dispatch({type:'ENABLE_USER', id:id})
                }
            })
    }
    handleSetAdmin = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/users/" + id + '/set-admin', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.role==='ROLE_ADMIN'){
                    this.props.dispatch({type:'SET_ADMIN', id:id})
                }
            })
    }
    handleRemoveAdmin = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/users/" + id + '/remove-admin', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.role==='ROLE_USER'){
                    this.props.dispatch({type:'REMOVE_ADMIN', id:id})
                }
            })
    }
    handleEdit = id => {
        this.props.history.push('/admin/users/'+id+'/edit');
    }
    handlePageChange = (event, value) =>{
        this.setState({activePage: value});
    }
    render() { 
        var { users} = this.props;
        if (localStorage.role==='ROLE_USER') {
            users = [];
        }
        if (localStorage.role==='ROLE_ADMIN') {
            users = users.filter(user => user.role==='ROLE_USER').sort(function(a, b){
                return a.id - b.id;
            });
        }
        if (localStorage.role==='ROLE_SUPER_ADMIN') {
            users = users.sort(function(a, b){
                return a.id - b.id;
            });
        }
        var count = Math.ceil(users.length/5);
        var begin = (this.state.activePage-1)*5;
        var end = this.state.activePage*5 ;
        var listusers = users.slice(begin, end);
        return ( 
            <div>
                { (localStorage.role ==='ROLE_ADMIN' || localStorage.role ==='ROLE_SUPER_ADMIN') && <div>
                    <Row>
                        <Col sm={4}>
                        <form onSubmit={this.handleSubmit} >
                        <Form.Control 
                            type="name" 
                            name="name"
                            onChange={this.handleChange}
                            placeholder="Enter email or name" 
                           />
                        </form></Col>
                        <Col><div style={this.style.right}><Button style={this.style.add}>Add User</Button></div></Col>
                    </Row>
                    
                { users.length!==0 && 
                <div>
                { count > 1 && <Pagination
                page={this.state.activePage}
                count={count}
                onChange={this.handlePageChange}
                />}
                <Table striped bordered>
                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Email</th>
                        <th >First name</th>
                        <th >Last name</th>
                        <th >Books</th>
                        <th >Status</th>
                        <th >Role</th>
                        {localStorage.role==='ROLE_SUPER_ADMIN' && <th style= {{width:'0px'}}>Admin</th>}
                        <th style= {{width:'0px'}}>Enable</th>
                        <th style= {{width:'0px'}}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {listusers.map(user => (
                    <tr>
                        <td style={this.style.center}>{user.id}</td>
                        <td style={this.style.center}>{user.email}</td>
                        <td style={this.style.center}>{user.firstName}</td>
                        <td style={this.style.center}>{user.lastName}</td>   
                        <td style={this.style.center}>{user.books.length}</td>            
                        { user.enabled && <td style={this.style.center}><b style={{'color':'green'}}>Enable</b></td>}   
                        { !user.enabled && <td style={this.style.center}><b>Disable</b></td>}
                        <td style={this.style.center}>{user.role}</td>
                        
                        { user.role === 'ROLE_USER' && localStorage.role==='ROLE_SUPER_ADMIN' && <td><IconButton onClick={() => this.handleSetAdmin(user.id)}><AddCircle fontSize='small' style={{'color':'green'}}/></IconButton></td>}
                        { user.role === 'ROLE_ADMIN' && localStorage.role==='ROLE_SUPER_ADMIN' && <td><IconButton  onClick={() => this.handleRemoveAdmin(user.id)}><RemoveCircle fontSize='small' color='secondary'/></IconButton></td>}
                        { user.role === 'ROLE_SUPER_ADMIN' && <td></td>}
                        
                        { (user.enabled && user.role !== 'ROLE_SUPER_ADMIN') && <td><IconButton onClick={() => this.handleEnable(user.id)}><Lock fontSize='small'/></IconButton></td>}
                        { (!user.enabled && user.role !== 'ROLE_SUPER_ADMIN') && <td><IconButton onClick={() => this.handleEnable(user.id)}><LockOpen fontSize='small'/></IconButton></td>}
                        { user.role === 'ROLE_SUPER_ADMIN' && <td></td>}
                        
                        <td><IconButton onClick={() => this.handleEdit(user.id)}><Edit fontSize='small'/></IconButton></td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                </div>}
                </div>}
            </div>
        );
    }
}
 
export default connect(function(state){
    return { 
        users: state.users, 
        myuser: state.myuser }
})(Users);
