import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


import {
    userLoginReducer,
    userRegisterReducer,
    userSoloReducer,
    userListReducer,
    userEditReducer,

} from './reducers/userReducers';


import {
    blogListReducer,
    blogCreateReducer,
    blogDetailsReducer,
    createCommentReducer,
    blogDeleteReducer,
    blogUpdateReducer,
} from './reducers/blogReducer'


const reducer = combineReducers({

    //User stuff
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userSolo: userSoloReducer,
    userList:userListReducer,
    userEdit: userEditReducer,

    //Blog stuff

    blogList:blogListReducer,
    blogCreate:blogCreateReducer,
    soloBlog:blogDetailsReducer,
    commentBlog: createCommentReducer,
    blogDelete: blogDeleteReducer,
    blogUpdate: blogUpdateReducer,


})

const userInfoStorge  = localStorage.getItem('userInfo') ?
     JSON.parse(localStorage.getItem('userInfo')) : null


const initalState = {
    userLogin: {userInfo:userInfoStorge}
}

const middleware = [thunk]

const store = createStore(reducer,initalState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store