const axios = require('axios');
const _ = require('lodash');

const supportMiddleware = (req, res, next) => {
  const { salesChannel, customer } = res.locals;
  const supportedSteps = req.configRepo('supportedSteps', salesChannel, customer);
  const url = `http://localhost:3001/steps?sales_channel=${salesChannel}&customer=${customer}`;

  axios.get(url)
  .then(({ data: requiredSteps }) => {
    const missingSteps = _.difference(requiredSteps, supportedSteps);
    if (missingSteps.length !== 0) {
      return next(new Error(`Required steps [${missingSteps}] for sales channel [${salesChannel}] and customer [${customer}] is not supported`));
    }

    return next();
  })
  .catch(next);
};

module.exports = supportMiddleware;
