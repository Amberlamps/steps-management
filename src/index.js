import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './reducers';

import './index.css';
import App from './App';
import Articles from './steps/articles';
import Payments from './steps/payments';
import ReturnOptions from './steps/return-options';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/articles" component={Articles} />
        <Route path="/payments" component={Payments} />
        <Route path="/returns-options" component={ReturnOptions} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
