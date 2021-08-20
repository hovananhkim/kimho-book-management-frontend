import { Button, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { connect } from 'react-redux';
class MyBooks extends Component {
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
        center: {
            'padding': '20px 5px'
        }
    }
    handleAddBook  = () => {
        this.props.history.push('/user/books/add');
    }
    handleEdit  = id => {
        this.props.history.push('/user/books/'+id+'/edit');
    }
    handleDelete = id => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this book?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.userDeleteBookFetch(id)
              },
              {
                label: 'No'
              }
            ]
          });
    }
    state = {
        activePage: 1
    }
    handlePageChange = (event, value) =>{
        this.setState({activePage: value});
      }
    userDeleteBookFetch = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/books/" + id , {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(
                
            );
        this.props.dispatch({type:'DELETE_BOOK_MYUSER', id:id});
    }
    render() { 
        var { books } = this.props.myuser;
        var count = Math.ceil(books.length/5);
        var begin = (this.state.activePage-1)*5;
        var end = this.state.activePage*5 ;
        var listbooks = books.slice(begin, end);
       
        return ( 
            <div>
                <div style={this.style.right}><Button style={this.style.add} onClick={this.handleAddBook}>Add Book</Button></div>
                { books.length===0 && <div style={{'text-align': 'center'}}><b>Your books list is empty, you can add new book</b></div>}
                { books.length!==0 && 
                <div> 
                    { count > 1 && <Pagination
                        page={this.state.activePage}
                        count={count}
                        onChange={this.handlePageChange}
                    />}
                    <Table striped bordered>
                    <thead>
                    <tr>
                        <th style= {{width:'50px'}}>Id</th>
                        <th>Title</th>
                        <th style= {{width:'200px'}}>Author</th>
                        <th style= {{width:'200px'}}>User</th>
                        <th style= {{width:'70px'}}>Status</th>
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
                            { !book.enabled && <td style={this.style.center}><b>Disable</b></td>}
                            <td><IconButton onClick={() => this.handleEdit(book.id)}><Edit fontSize='small'/></IconButton></td>
                            <td><IconButton onClick={() => this.handleDelete(book.id)}><Delete fontSize='small' color='secondary'/></IconButton></td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                </div> }
            </div>
        );
    }
}

export default connect(function(state){
    return { myuser: state.myuser }
})(MyBooks);
