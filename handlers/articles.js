const _ = require('lodash');
const { getArticles } = require('../services/get-articles');
const { getCustomer, getSalesChannel, enhanceInitialState} = require('../utils');

const ARTICLES_PATH = '/articles';

const articlesHandler = (req, res, next) => {
  if (req.originalUrl !== ARTICLES_PATH) {
    return next();
  }

  const salesChannel = getSalesChannel(req);
  const customer = getCustomer(req);

  const articles = getArticles({
    salesChannel,
    customer
  });

  res.locals = enhanceInitialState(res.locals, { articles });

  return next();
};

module.exports = articlesHandler;
