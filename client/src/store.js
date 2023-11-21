import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './redux/reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
const middleWares = [thunk, logger];



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));


export default store;