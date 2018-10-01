const express = require('express');
const bodyParser = require('body-parser');

const renderHandler = require('./handlers/render');
const articlesHandler = require('./handlers/articles');
const stepsHandler = require('./handlers/steps');
const configMiddleware = require('./middleware-config');
const accessMiddleware = require('./middleware-access');
const stepsMiddleware = require('./middleware-steps');
const app = express();

const delayMiddleware = (milliseconds) => (req, res, next) => {
  setTimeout(next, milliseconds);
};

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.set('Access-Control-Allow-Headers', 'X-Sales-Channel, X-Zalando-Customer, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
});

app.use(configMiddleware('./config-bff.json'));
app.use(accessMiddleware);
app.use(stepsMiddleware);

app.post('/api/announced-returns', bodyParser.json(), stepsHandler);
// app.use(articlesHandler);
app.use('*', renderHandler);

app.listen(3002, () => console.log('bff has started'));
