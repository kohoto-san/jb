import css from '../stylus/style.styl'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';

// import reducers from './reducers'
// import * as reducers from './reducers'

import { App } from './components/components.js'
import { Home } from './components/jobs.js'
import VisibleJobs from './containers/jobs.js'
import { VisiblePipeline } from './containers/pipeline.js'
import JobDetails from './components/jobDetails.js'

import { init, addJob, addLane, attachToLane, getUser, getLanes } from './actions/index.js'


// Create an enhanced history that syncs navigation events with the store
const token = localStorage.getItem('sagfi_token') || null;
import configureStore from './store/configureStore'

let parsedData = undefined;
if( ! token ){
    let data_local = localStorage.getItem('sagfi_data');
    if( JSON.parse(data_local) ){
        parsedData = JSON.parse(data_local);
    }
    console.log(parsedData);
}


const store = configureStore(parsedData);
// const store = configureStore(undefined);
const history = syncHistoryWithStore(browserHistory, store)


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

/*
store.dispatch( addLane('Like') )
store.dispatch( addLane('Interview') )
store.dispatch( addLane('Offer') )

store.dispatch( addJob({ name: 'Fuck fuck 111', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
store.dispatch( addJob({ name: 'Fuck fuck 222', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
store.dispatch( addJob({ name: 'Fuck fuck 333', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))
store.dispatch( addJob({ name: 'Fuck fuck 444', company: 'Google', salary: '100k', exp: 'Middle', skills: ['css', 'html'], keywords: 'verbal communication skills, help life-saving products, existing technology stack, client facing interfaces, focused accelerator program'}))

const laneId = 0

store.dispatch( attachToLane(laneId, 11) )
store.dispatch( attachToLane(laneId, 12) )
store.dispatch( attachToLane(laneId, 13) )
store.dispatch( attachToLane(laneId, 13) )

store.dispatch( attachToLane(1, 14) )
*/

// console.log(store.getState())

const userAuth = (nextState, replace, callback) => {

    if(token){
        store.dispatch( getUser() );
        store.dispatch( getLanes() );
    }

    callback();
}


ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>

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
