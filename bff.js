const express = require('express');
const configMiddleware = require('./middleware-config');
const zalandoMiddleware = require('./middleware-zalando');
const supportMiddleware = require('./middleware-support');
const app = express();

app.use(configMiddleware('./config-bff.json'));
app.use(zalandoMiddleware);
app.use(supportMiddleware);

app.get('/steps', (req, res, next) => {
  const { salesChannel, customer } = res.locals;
  const orderedSteps = req.configRepo('orderedSteps', salesChannel, customer);

  return res.json(orderedSteps);
});

app.listen(3002, () => console.log('bff has started'));
