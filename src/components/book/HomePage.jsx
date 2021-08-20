import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardImg, Col, Form, NavLink, Row } from 'react-bootstrap';
import { Card } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
class HomePage extends Component {
    style = {
        card: {
            'border-radius': '0px',
            'height': '250px'
        },
        children: {
            'margin':'15px'
        },
        navlink: {
            'margin-left': '-15px',
            'margin-right': '-15px'
        },
    }
    state = {
        keyword: null,
        activePage: 1,
        count:1
    }
    componentDidMount() {
        fetch("https://hovananhkim-book.herokuapp.com/api/books")
          .then(res => res.json())
          .then(data => {
              this.props.dispatch({type: 'GET_BOOKS', books:data})
              this.setState({
                count: Math.ceil(data.length/6)
            })
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
        this.userSearchBookFetch(this.state.keyword);
    }

    userSearchBookFetch = keyword => {
        fetch("https://hovananhkim-book.herokuapp.com/api/books/search?keyword="+keyword)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              this.props.dispatch({type: 'SEARCH_BOOKS', books:data})
          }
        )        
    }
    handlePageChange = (event, value) =>{
        this.setState({activePage: value});
    }
    render() { 
        var {books} = this.props;
        var listbooks = books.sort(function(a, b){
            return b.id - a.id;
        }).filter(book => book.enabled)
        var begin = (this.state.activePage-1)*6;
        var end = this.state.activePage*6 ;
        console.log(begin);
        console.log(end);
        console.log(books.slice(begin, end));
        listbooks = listbooks.slice(begin, end);
        return ( 
            <div>
                <Row>
                    <Col sm={4}>
                        <form onSubmit={this.handleSubmit} >
                        <Form.Control 
                            type="keyword" 
                            name="keyword"
                            onChange={this.handleChange}
                            placeholder="Enter author or title book" 
                           />
                        </form>
                    </Col>
                </Row>
                {this.state.count > 1 && <Pagination
                    page={this.state.activePage}
                    count={this.state.count}
                    onChange={this.handlePageChange}
                />}
                <Row xs={1} md={3}>              
                {listbooks.map(book => (       
                <Col >    
                    <NavLink href={'/books/'+book.id} style={this.style.navlink}>
                    <Card style={this.style.card}>
                        <Row md={12} style={this.style.children}>
                            <Col xs={4}><CardImg src={book.image}/>
                            </Col>
                            <Col xs={8}>
                                <h5>{book.title}</h5>
                                <div style={{'font-size':'11px'}}>{book.createdAt}</div>
                                <b>{book.author}</b>
                                {book.description && <div>{book.description.split('.')[0]}</div>}
                            </Col>
                        </Row>
                    </Card>      
                    </NavLink>
                </Col>          
                ))} 
            </Row>
            </div>
         );
    }
}
 
export default connect(function(state){
    return { books: state.books}
})(HomePage);