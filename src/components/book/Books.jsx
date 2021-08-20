import { Button, FormControl, IconButton, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Delete, Edit, Lock, LockOpen } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
class Books extends Component {
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
            'padding': '20px 5px'
        }
    }
    state = {
        keyword: '',
        activePage:1,
        count: 1
    }
    componentDidMount() {
        fetch("https://hovananhkim-book.herokuapp.com/api/books")
          .then(res => res.json())
          .then(data => {
              this.props.dispatch({type: 'GET_BOOKS', books:data})
              this.setState({count: Math.ceil(data.length/5)})
          }
        )
        fetch("https://hovananhkim-book.herokuapp.com/api/users")
          .then(res => res.json())
          .then(data => {
              this.props.dispatch({type: 'GET_USERS', users:data})
          }
        )
    }
    handleEnable = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/books/" + id + '/enable', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.title){
                    this.props.dispatch({type:'ENABLE_BOOK', id:id})
                }
            })
    }
    handleDelete = id => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this book?',
            buttons: [
              {
                label: 'No'
              },
              {
                label: 'Yes',
                onClick: () => this.adminDeleteBookFetch(id)
              }
            ]
          });
    }

    adminDeleteBookFetch = id => {
        
        fetch("https://hovananhkim-book.herokuapp.com/api/books/" + id , {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.props.dispatch({type:'DELETE_BOOK', id:id})
            })    
    }
    handleAddBook  = () => {
        this.props.history.push('/admin/books/add');
    }
    handleEdit = id => {
        this.props.history.push('/admin/books/'+id+'/edit');
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.adminSearchBooksFetch(this.state.keyword);
    }

    adminSearchBooksFetch = keyword => {
        fetch("https://hovananhkim-book.herokuapp.com/api/books/search?keyword="+keyword)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              this.props.dispatch({type: 'SEARCH_BOOKS', books:data})
          }
        )        
    }
    handleChangeSelect = event => {
        switch (event.target.value) {
            case 1:
                this.props.dispatch({type: 'LATEST'})
                break;
            case 2:
                this.props.dispatch({type: 'SORT', name: 'title'})
                break;
            case 3:
                this.props.dispatch({type: 'SORT', name: 'author'})
                break;
            case 4:
                this.props.dispatch({type: 'SORT', name: 'username'})
                break;
            default:
                break;
        }
    }
    handlePageChange = (event, value) =>{
        this.setState({activePage: value});
    }
    render() { 
        var { books } = this.props;
        if (localStorage.role==='ROLE_USER'){
            books =[];
        }
        var listbooks = books;
        var begin = (this.state.activePage-1)*5;
        var end = this.state.activePage*5 ;
        listbooks = listbooks.slice(begin, end);
        return ( 
            <div>
                { (localStorage.role==="ROLE_ADMIN" || localStorage.role==="ROLE_SUPER_ADMIN")&&
                    <div>
                        <Row>
                        <Col sm={4}>
                        <form onSubmit={this.handleSubmit} >
                        <Form.Control 
                            type="keyword" 
                            name="keyword"
                            onChange={this.handleChange}
                            placeholder="Enter title or author" 
                           />
                        </form>
                        </Col>
                        <Col><div style={this.style.right}><Button onClick={this.handleAddBook} style={this.style.add}>Add Book</Button></div></Col>
                        </Row>
                        <FormControl style={{minWidth:'120px', marginBottom:'10px'}}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.handleChangeSelect}
                            >
                            <MenuItem value={1}>Latest</MenuItem>
                            <MenuItem value={2}>Title</MenuItem>
                            <MenuItem value={3}>Author</MenuItem>
                            <MenuItem value={4}>User</MenuItem>
                            </Select>
                        </FormControl>
                    { books.length!==0 && 
                    <div>
                        <Pagination
                        page={this.state.activePage}
                        count={this.state.count}
                        onChange={this.handlePageChange}
                        />
                    <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th >Author</th>
                            <th >User</th>
                            <th >Status</th>
                            <th style= {{width:'0px'}}>Enable</th>
                            <th style= {{width:'0px'}}>Edit</th>
                            <th style= {{width:'0px'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listbooks.map(book => (
                        <tr>
                            <td style={this.style.center}>{book.id}</td>
                            <td style={this.style.center}>{book.title}</td>
                            <td style={this.style.center}>{book.author}</td>
                            <td style={this.style.center}>{book.username}</td>
                            { book.enabled && <td style={this.style.center}><b style={{'color':'green'}}>Enable</b></td>}
                            { book.enabled && <td><IconButton   onClick={() => this.handleEnable(book.id)}><Lock fontSize='small'/></IconButton></td>}
                            { !book.enabled && <td style={this.style.center}><b>Disable</b></td>}
                            { !book.enabled && <td><IconButton onClick={() => this.handleEnable(book.id)}><LockOpen fontSize='small'/></IconButton></td>}
                            <td><IconButton onClick={() => this.handleEdit(book.id)}><Edit fontSize='small'/></IconButton></td>
                            <td><IconButton title="Delete" onClick={() => this.handleDelete(book.id)}><Delete fontSize='small' color='secondary'/></IconButton></td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                    </div>}
                </div>
                }
            </div>
        );
    }
}
 
export default connect(function(state){
    return { 
        books: state.books,
        myuser: state.myuser,
        users: state.users
    }
})(Books);
