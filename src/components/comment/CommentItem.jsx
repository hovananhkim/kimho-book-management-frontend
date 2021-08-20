import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
class Comment extends Component {
    style = {
        'margin-top': '10px'
    }
    handelDeleteComment = event =>{
        event.preventDefault();
        this.userDeleteComment(this.props.index);
    }
    userDeleteComment = id => {
        fetch("https://hovananhkim-book.herokuapp.com/api/comments/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("ok");
                this.props.dispatch({type:'DELETE_COMMENT', id:id});
                console.log("ok2");
            })   
    }
    handelEditComment  () {
        this.props.history.push('/admin/books/add');
    }
    render() { 
        var comment = this.props.children;
        var userId = Number(localStorage.id);
        return ( 
            <div style={this.style}>
                <b>{comment.username}</b>
                <div style={{fontSize:'10px'}}>{comment.createdAt}</div>
                <div>{comment.message}</div>
                {(comment.userId===userId || localStorage.role==='ROLE_SUPER_ADMIN'||localStorage.role==='ROLE_ADMIN') && 
                <div> 
                   <Button size='small' onClick={this.handelDeleteComment}>Delete</Button>
                   <Button size='small' onClick={this.handelEditComment}>Edit</Button>
                </div>
                }
            </div>
         );
    }
}
 
export default connect()(Comment);