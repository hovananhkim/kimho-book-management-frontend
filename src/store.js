var redux = require('redux');
var reducer = require("./reducer");
var store = redux.createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;