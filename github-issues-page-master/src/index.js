import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';



import App from './components/App';
import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const container = document.getElementById('root');
const root = createRoot(container);
const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
// eslint-disable-next-line no-underscore-dangle
//const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware)),
);

// run the saga
sagaMiddleware.run(rootSaga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


