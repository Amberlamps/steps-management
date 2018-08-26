const express = require('express');
const axios = require('axios');
const _ = require('lodash');

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

  next();
});

app.get('/api/steps', delayMiddleware(2000), async (req, res, next) => {
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
      return res.json(filteredSteps);
    }

    const missingRequiredSteps = requiredSteps.filter((step) => !_.includes(filteredSteps, step));

    return res.json([...filteredSteps, ...missingRequiredSteps]);
  } catch (err) {
    next (err);
  }
});

app.listen(3002, () => console.log('bff has started'));
