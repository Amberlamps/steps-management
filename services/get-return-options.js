const axios = require('axios');

const getReturnOptions = ({
  salesChannel,
  customer
}) => axios.get(`http://localhost:3001/return-options?sales_channel=${salesChannel}&customer=${customer}`).then(({ data }) => data);

module.exports.getReturnOptions = getReturnOptions;
