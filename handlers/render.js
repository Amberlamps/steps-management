const _ = require('lodash');

const stringifyData = (data = {}) => (
  _.toPairs(data).map(([key, value]) => (
    `data-${key}="${escape(JSON.stringify(value))}"`
  )).join(' ')
);

const renderHandler = (req, res) => {

  const dataString = stringifyData(res.locals);

  res.set('Content-Type', 'text/html');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Returns flow</title>
      </head>
      <body>
        <div id="root" ${dataString}></div>
        <script src="http://localhost:3000/static/js/bundle.js"></script>
      </body>
    </html>
  `)
};

module.exports = renderHandler;
