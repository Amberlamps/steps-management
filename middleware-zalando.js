const zalandoMiddleware = (req, res, next) => {
  const salesChannel = req.get('X-Sales-Channel');
  const customer = req.get('X-Zalando-Customer');

  res.locals.salesChannel = salesChannel;
  res.locals.customer = customer;

  return next();
}

module.exports = zalandoMiddleware;
