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
  

 
 
}

// CREATE SAGAS




 

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
