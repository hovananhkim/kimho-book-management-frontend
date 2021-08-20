const initialState = {
    isLogin: false,
    id : null,
    email: null,
    role: null,
    enabled: false,
    books: []
}
var myuser = (state = initialState, action) => {
    switch (action.type) {
        case 'MY_USER':
            return { ...state, isLogin: true, id: action.user.id, email: action.user.email, role:action.user.role, enabled:action.user.enabled, books: action.user.books}
        case 'DELETE_BOOK_MYUSER':
            return { ...state, books: state.books.filter(book => book.id!==action.id)};
        default:
            return state;
    }
}
module.exports = myuser;