const { getCustomer, getSalesChannel } = require('./utils');

const accessMiddleware = (req, res, next) => {
  const salesChannel = getSalesChannel(req);
  const customer = getCustomer(req);

  if (!req.configRepo('isOnlineReturnsEnabled', salesChannel, customer)) {
    return next(new Error(`Returns flow not enabled for sales channel [${salesChannel}] and customer [${customer}].`));
  }

  return next();
};

module.exports = accessMiddleware;
