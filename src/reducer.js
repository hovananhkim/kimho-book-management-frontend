var redux = require('redux');
var myuser = require('./reducers/user/myuser');
var books = require('./reducers/book/books')
var users = require('./reducers/user/users')
var book = require('./reducers/book/book')

var reducer = redux.combineReducers({
    books,
    myuser,
    users,
    book
});

module.exports = reducer;