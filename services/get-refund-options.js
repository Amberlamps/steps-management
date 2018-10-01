const axios = require('axios');

const getRefundOptions = ({
  salesChannel,
  customer,
  orderNumbers = []
}) => axios.get(`http://localhost:3001/refund-options?sales_channel=${salesChannel}&customer=${customer}&order_numbers=${orderNumbers.toString()}`).then(({ data }) => data);

module.exports.getRefundOptions = getRefundOptions;
