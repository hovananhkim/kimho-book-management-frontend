import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Books from './book/Books';
import FormBook from './book/BookCreation';
import HomePage from './book/HomePage';
import MyBooks from './book/MyBooks';
import Register from './user/Register';
import Users from './user/Users';
import BookDetail from './book/BookDetails';
import BookEdition from './book/BookEdition';
import UserEdition from './user/UserEdition';
import CommentEdition from './comment/CommentEdition';
class Content extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Route path='/' exact component={HomePage}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/logout' component={Logout}/>

                <Route path='/books/:id' exact component={BookDetail}/>                

                <Route path='/mybooks' component={MyBooks}/>
                <Route path='/user/books/add' component={FormBook}/>
                <Route path='/user/books/:id/edit' component={BookEdition}/>

                <Route path='/users/:id/edit' component={UserEdition}/>
                
                <Route path='/admin/books' exact component={Books}/>
                <Route path='/admin/users' exact component={Users}/>
                <Route path='/admin/books/add' component={FormBook}/>
                <Route path='/admin/books/:id/edit' component={BookEdition}/>
                <Route path='/admin/users/:id/edit' component={UserEdition}/>

                <Route path='/comments/:id/edit' component={CommentEdition}/>
            </BrowserRouter>
        );
    }
}
 
export default Content;