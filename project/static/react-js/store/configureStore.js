import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router'
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';


import authMiddleware from '../middleware/api.js';
import * as reducers from '../reducers';

const baseHistory = browserHistory;
const routingMiddleware = routerMiddleware(baseHistory);

const reducer = combineReducers(Object.assign({}, reducers, {
  	routing: routerReducer
}));

const createStoreWithMiddleware = compose(
	applyMiddleware(
	    authMiddleware,
	    apiMiddleware,
	    routingMiddleware,
	    thunk
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
 
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}