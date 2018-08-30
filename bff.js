const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const bodyParser = require('body-parser');

const configMiddleware = require('./middleware-config');
const zalandoMiddleware = require('./middleware-zalando');
const supportMiddleware = require('./middleware-support');
const app = express();

const delayMiddleware = (milliseconds) => (req, res, next) => {
  setTimeout(next, milliseconds);
};

app.use(configMiddleware('./config-bff.json'));
app.use(zalandoMiddleware);
app.use(supportMiddleware);

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.set('Access-Control-Allow-Headers', 'X-Sales-Channel, X-Zalando-Customer, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
});

const stepsMapping = {
  ARTICLES: {
    pathname: '/articles'
  },
  RETURN_OPTIONS: {
    pathname: '/return-options'
  },
  PAYMENTS: {
    pathname: '/payments'
  }
};

const mapSteps = (steps) => steps.filter((step) => stepsMapping[step]).map((step) => stepsMapping[step]);

let usernames = [];

app.get('/api/usernames/:username', delayMiddleware(1000), (req, res, next) => {
  if (_.includes(usernames, req.params.username)) {
    return res.status(400).json({ message: 'USERNAME_ALREADY_EXISTS' });
  }
  return res.json('ok');
});

app.post('/api/users', bodyParser.json(), delayMiddleware(1000), (req, res) => {
  const user = req.body;

  if (_.includes(usernames, user.username)) {
    return res.status(400).json({ message: 'USERNAME_ALREADY_EXISTS' });
  }

  usernames.push(user.username);

  return res.json('ok');
});

app.get('/api/steps', delayMiddleware(1000), async (req, res, next) => {
  try {
    const { salesChannel, customer } = res.locals;
    const orderedSteps = req.configRepo('orderedSteps', salesChannel, customer);
    const { data: requiredSteps } = await axios.get(`http://localhost:3001/steps?sales_channel=${salesChannel}&customer=${customer}`);

    const filteredSteps = orderedSteps.filter((step) => _.includes(requiredSteps, step));

    if (filteredSteps.length !== orderedSteps.length) {
      const missingeOrderSteps = _.difference(orderedSteps, filteredSteps);
      console.warn(`Order steps [${missingeOrderSteps}] in sales channel [${salesChannel}] for customer [${customer}] are not required for the returns flow.`);
    }

    if (filteredSteps.length === requiredSteps.length) {
      return res.json(mapSteps(filteredSteps));
    }

    const missingRequiredSteps = requiredSteps.filter((step) => !_.includes(filteredSteps, step));

    return res.json(mapSteps([...filteredSteps, ...missingRequiredSteps]));
  } catch (err) {
    next (err);
  }
});

app.listen(3002, () => console.log('bff has started'));
