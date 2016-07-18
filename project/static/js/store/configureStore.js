import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router'
import { apiMiddleware } from 'redux-api-middleware';

import * as reducers from '../reducers';

const baseHistory = browserHistory;
const routingMiddleware = routerMiddleware(baseHistory);

const reducer = combineReducers(Object.assign({}, reducers, {
  	routing: routerReducer
}));

const createStoreWithMiddleware = compose(
	applyMiddleware(
	    apiMiddleware,
	    routingMiddleware
    ),
	window.devToolsExtension ? window.devToolsExtension() : undefined
)(createStore);

// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
 
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}