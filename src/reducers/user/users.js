var users = (state = [], action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.users;
            case 'SEARCH_USERS':
                return action.users;
        case 'ENABLE_USER':
            return state.map( user => {
                if (user.id===action.id){
                    return {...user, enabled: !user.enabled};
                }
                return user;
            })
        case 'SET_ADMIN':
            return state.map( user => {
                if (user.id===action.id){
                    return {...user, role: 'ROLE_ADMIN'};
                }
                return user;
            })
        case 'REMOVE_ADMIN':
            return state.map( user => {
                if (user.id===action.id){
                    return {...user, role: 'ROLE_USER'};
                }
                return user;
            })    
        default:
            return state;
    }
}
module.exports = users;