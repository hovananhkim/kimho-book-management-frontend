import React, { Component } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import CommentCreation from '../comment/CommentCreation';
import Comment from '../comment/CommentItem';
import { connect } from 'react-redux';
class BookDetail extends Component {
    state = {
        book: {}
    }
    style = {
        center: {
            'display':'block',
            'margin-left':'auto',
            'margin-right':'auto'
        },
        image: {
            'width':'100%'
        },
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("https://hovananhkim-book.herokuapp.com/api/books/"+id)
          .then(res => res.json())
          .then(data => {
                if (data.title){
                    this.setState({
                        book: data
                    })
                    this.props.dispatch({type: 'BOOK_DETAIL', book: data})
                }
            }) 
    }
    render() { 
        var {book, comments} = this.props.book;
        comments = comments.sort(function (a, b) {
            return b.id - a.id;
        });
        return ( 
            <Row >
                <Col style={this.style.center} sm={8}>
                    <Row md={12} >
                        <Col xs={4}><Image src={book.image} style={this.style.image}></Image></Col>
                        <Col xs={8}>
                            <h4>{book.title}</h4>
                            <b>{book.author}</b>
                            <div>{book.createdAt}</div>
                            <p>{book.description}</p>
                            <div style={{textAlign:'right'}}><b >Create by: {book.username}</b></div>
                        </Col>
                    </Row>
                    <b >Comments ({comments.length})</b>
                    {localStorage.token && <CommentCreation>{book.id}</CommentCreation>}
                    {comments.map(comment => (
                        <Comment index={comment.id}>{comment}</Comment>
                    ))}
                </Col>
            </Row>
         );
    }
}
 
export default connect(function(state){
    return { book: state.book, comments: state.comments}
})(BookDetail);