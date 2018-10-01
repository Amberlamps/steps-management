const _ = require('lodash');

module.exports.enhanceInitialState = (locals, params) => {
  const { initialState = {} } = locals;
  const mergedInitialState = _.merge(initialState, params);
  console.log('====');
  console.log(params);
  console.log(initialState);
  console.log({ ...locals, initialState: mergedInitialState });

  return { ...locals, initialState: mergedInitialState };
};

module.exports.getSalesChannel = (req) => (
  req.get('X-Sales-Channel') || req.params.sales_channel || 'DE'
);

module.exports.getCustomer = (req) => (
  req.get('X-Zalando-Customer') || req.params.customer || 'PLUS'
);
