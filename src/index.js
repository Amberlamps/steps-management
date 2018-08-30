import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './steps-manager/reducers';

import './index.css';
import App from './App';
import Articles from './steps/articles';
import Payments from './steps/payments';
import ReturnOptions from './steps/return-options';
import Success from './steps/success';
import registerServiceWorker from './registerServiceWorker';

const persistConfig = {
  key: 'user-persist',
  storage,
  whitelist: ['user', 'errorHandler'],
  version: 0
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="/articles" component={Articles} />
          <Route path="/payments" component={Payments} />
          <Route path="/return-options" component={ReturnOptions} />
          <Route path="/success" component={Success} />
        </Route>
      </Router>
    </PersistGate>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
