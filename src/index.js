import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App/App';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  // yield takeEvery('ACTION_TYPE', functionToCall);
  yield takeEvery('FETCH_ITEMS', fetchAllItems);
  yield takeEvery('FETCH_BOXES', fetchAllBoxes);
  yield takeEvery('FETCH_EVENTS', fetchAllEvents);
  yield takeEvery('FETCH_EVENT_ACCOUNTS', fetchAllEventAccounts);
}

// CREATE SAGAS
  function* fetchAllItems() {
    // get all movies from the DB
    try {
          const items = yield axios.get('/api/item');
          console.log('get all:', items.data);
          yield put({ type: 'SET_ITEMS', payload: items.data });
          } 
          catch {
          console.log('fetchAllItems error');
          }     
    };

  function* fetchAllBoxes() {
    // get all movies from the DB
    try {
          const boxes = yield axios.get('/api/box');
          console.log('get all:', boxes.data);
          yield put({ type: 'SET_BOXES', payload: boxes.data });
          } 
          catch {
          console.log('fetchAllBoxes error');
          }     
    };

  function* fetchAllEvents() {
    // get all movies from the DB
    try {
          const events = yield axios.get('/api/event');
          console.log('get all:', events.data);
          yield put({ type: 'SET_EVENTS', payload: events.data });
          } 
          catch {
          console.log('fetchAllEvents error');
          }     
    };

  function* fetchAllEventAccounts() {
    // get all movies from the DB
    try {
          const eventAccount = yield axios.get('/api/event_account');
          console.log('get all:', eventAccount.data);
          yield put({ type: 'SET_EVENT_ACCOUNTS', payload: eventAccount.data });
          } 
          catch {
          console.log('fetchAllEventAccounts error');
          }     
    };

// Create sagaMiddleware
  const sagaMiddleware = createSagaMiddleware();

// CREATE REDUCERS
  const items = (state = [], action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return action.payload;
        default:
            return state;
    }
  }

  const boxes = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOXES':
            return action.payload;
        default:
            return state;
    }
  }

  const events = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
  }

  const eventAccounts = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_ACCOUNTS':
            return action.payload;
        default:
            return state;
    }
  } 

// Create one store that all components can use
  const storeInstance = createStore(
    combineReducers({
        items,
        boxes,
        events,
        eventAccounts
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
  );

// Pass rootSaga into our sagaMiddleware
  sagaMiddleware.run(rootSaga);


// RENDER APP ON DOM
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-root'),
  );
