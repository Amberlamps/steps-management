const axios = require('axios');

const supportMiddleware = (req, res, next) => {
  const { salesChannel, customer } = res.locals;
  const supportedSteps = req.configRepo('supportedSteps', salesChannel, customer);
  const url = `http://localhost:3001/steps?sales_channel=${salesChannel}&customer=${customer}`;

  axios.get(url)
  .then(({ data }) => {
    for (let i = 0; i < data.length; i++) {
      if (!supportedSteps.includes(data[i])) {
        return next(new Error(`Required step [${data[i]} for sales channel [${salesChannel}] and customer [${customer}] is not supported`));
      }
    }

    return next();
  })
  .catch(next);
};

module.exports = supportMiddleware;
