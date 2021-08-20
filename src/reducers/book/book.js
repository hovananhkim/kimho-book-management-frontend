const initialState = {
    book: {},
    comments: []
}
var book = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOK_DETAIL':
            return {...state, book:action.book, comments:action.book.comments};
        case 'ADD_COMMENT':
            return {...state, comments: [...state.comments, action.comment]};
        case 'DELETE_COMMENT':
            return { ...state, comments: state.comments.filter(c => c.id!==action.id)};
        default:
            return state;
    }
}
module.exports = book;