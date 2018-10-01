const express = require('express');
const configMiddleware = require('./middleware-config');
const accessMiddleware = require('./middleware-access');

const app = express();

app.use(configMiddleware('./config-boomerang.json'));

const isOneOrderPaidWithCoD = (orderNumbers) => orderNumbers.includes('orderId2');

app.get('/refund-options', accessMiddleware, (req, res, next) => {
  const {
    sales_channel: salesChannel,
    customer,
    order_numbers: orderNumbers = []
  } = req.query;

  const refundOptions = req.configRepo('refundOptions', salesChannel, customer);

  if (!orderNumbers || orderNumbers.length === 0) {
    return res.json(refundOptions);
  }

  if (
    isOneOrderPaidWithCoD(orderNumbers) &&
    refundOptions.includes('INTERNATIONAL_BANK_ACCOUNT')
  ) {
    return res.json(refundOptions);
  }

  // At this point, bank account information is not needed.
  return res.json(['ORIGINAL']);
});

app.get('/return-options', accessMiddleware, (req, res, next) => {
  const {
    sales_channel: salesChannel,
    customer
  } = req.query;

  const returnOptions = req.configRepo('returnOptions', salesChannel, customer);

  return res.json(returnOptions);
});

app.listen(3001, () => console.log('boomerang has started'));
