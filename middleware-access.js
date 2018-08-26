const accessMiddleware = (req, res, next) => {
  const { salesChannel, customer } = res.locals;

  if (!req.configRepo('isReturnsEnabled', salesChannel, customer)) {
    return next(new Error(`Returns flow not enabled for sales channel [${salesChannel}] and customer [${customer}].`));
  }

  return next();
};

module.exports = accessMiddleware;
