import css from '../stylus/style.styl'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';
import { Schema, arrayOf, valuesOf, normalize } from 'normalizr';

// import reducers from './reducers'
// import * as reducers from './reducers'

import { App } from './components/components.js'
import { Home } from './components/jobs.js'
import VisibleJobs from './containers/jobs.js'
import { VisiblePipeline } from './containers/pipeline.js'
import JobDetails from './components/jobDetails.js'

import { init, addJob, addLane, attachToLane, getUser, getLanes } from './actions/index.js'

const token = localStorage.getItem('sagfi_token') || null;

import merge from 'lodash/merge'


/*

let parsedData = undefined;
if( ! token ){
    let data_local = localStorage.getItem('sagfi_data');
    if( JSON.parse(data_local) ){
        parsedData = JSON.parse(data_local);
    }
}
*/
// Create an enhanced history that syncs navigation events with the store
import configureStore from './store/configureStore'
// const store = configureStore(parsedData);
// const store = configureStore(undefined);

const laneSchema = new Schema('lanes', { idAttribute: 'id' }),
      jobSchema = new Schema('jobs', { idAttribute: 'id' });

laneSchema.define({
    jobs: valuesOf(jobSchema),
});

const rawInitData = window.initialState;
let initData = normalize(rawInitData, { lanes: arrayOf(laneSchema) })
let entitiesState = { lanes: [], jobs: [], totalLikes: 0 };
let newEntitiesState = {
    lanes: initData.entities.lanes,
    jobs: initData.entities.jobs,
    totalLikes: rawInitData.totalLikes
}

let normalInitData = merge({}, entitiesState, newEntitiesState);

const store = configureStore({entities: normalInitData});
const history = syncHistoryWithStore(browserHistory, store)

/*
function handleChange() {
    
    if( ! token){    
        let entities = store.getState()['entities'];
        let data = { entities }
        let stringData = JSON.stringify(data);

        localStorage.setItem('sagfi_data', stringData);
        // console.log('handleChange')
        // console.log(stringData)
    }


    // let previousValue = currentValue
    // currentValue = select(store.getState())

    // if (previousValue !== currentValue) {
    //     console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
    // }
}

let unsubscribe = store.subscribe(handleChange)
*/

const userAuth = (nextState, replace, callback) => {


    if(token){
        store.dispatch( getUser() );
        // store.dispatch( getLanes() );
    }

    callback();
}


ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)} >

            <Route path="/" component={App} onEnter={userAuth}>
                <IndexRoute component={VisibleJobs} />
                <Route path="my-jobs" component={VisiblePipeline} />
                <Route path="job/:slug" component={JobDetails} />
                {/*
                <Route path="/job" component={VisiblePipeline} />
                <Route path="/my-jobs" component={Pipeline} />
                */}
            </Route>

        </Router>
    </Provider>,
  document.getElementById('app')
)
