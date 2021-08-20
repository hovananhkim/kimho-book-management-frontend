var books = (state =[], action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return action.books;
        case "SEARCH_BOOKS":
            return action.books;
        case 'ENABLE_BOOK':
            return state.map((book) => {
                if (book.id === action.id){
                    return { ...book, enabled: !book.enabled};
                }
                return book;
            })
        case 'ADD_BOOK':
            return [...state, action.book]
        case 'DELETE_BOOK':
            return state.filter(e => e.id !== action.id)
        case 'SORT':
            return state.slice().sort(function(a, b){
                var A = a[action.name].toUpperCase();
                var B = b[action.name].toUpperCase();
                if (A < B) {
                    return -1;
                  }
                if (A > B) {
                    return 1;
                }
                return 0;
            });
        case 'LATEST':
            return state.slice().sort(function(a, b){
                return b.id - a.id;
            })
        default:
            return state;
    }
}

module.exports = books;