import css from '../stylus/style.styl'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { apiMiddleware } from 'redux-api-middleware';

// import reducers from './reducers'
// import * as reducers from './reducers'

import { App } from './components/components.js'
import { Home } from './components/jobs.js'
import VisibleJobs from './containers/jobs.js'
import { VisiblePipeline } from './containers/pipeline.js'

import { addJob, addLane, attachToLane } from './actions/actions.js'


// Create an enhanced history that syncs navigation events with the store
import configureStore from './store/configureStore'
const store = configureStore(undefined);
const history = syncHistoryWithStore(browserHistory, store)


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

// console.log(store.getState())


ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>

            <Route path="/" component={App}>
                <IndexRoute component={VisibleJobs} />
                <Route path="my-jobs" component={VisiblePipeline} />
                {/*
                <Route path="/my-jobs" component={Pipeline} />
                */}
            </Route>

        </Router>
    </Provider>,
  document.getElementById('app')
)
