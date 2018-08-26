const express = require('express');
const configMiddleware = require('./middleware-config');
const zalandoMiddleware = require('./middleware-zalando');
const accessMiddleware = require('./middleware-access');

const app = express();

app.use(configMiddleware('./config-boomerang.json'));
app.use(zalandoMiddleware);

app.get('/steps', accessMiddleware, (req, res, next) => {
  const {
    sales_channel: salesChannel,
    customer
  } = req.query;
  const requiredSteps = req.configRepo('requiredSteps', salesChannel, customer);

  return res.json(requiredSteps);
});

app.listen(3001, () => console.log('boomerang has started'));
