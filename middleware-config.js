const fs = require('fs');

const lookUpValueFor = (localConfig) => (...keys) => {
  const [keyName, ...restKeys] = keys;
  const keyConfiguration = localConfig[keyName];

  if (keyConfiguration) {
    return lookUpValueFor(keyConfiguration)(...restKeys);
  }
  if (localConfig.hasOwnProperty('defaultValue')) {
    return localConfig.defaultValue;
  }

  throw new Error(`Cannot find confiugrations for ${keyName}`);
};

const configMiddleware = (filename) => {
  const config = JSON.parse(fs.readFileSync(filename).toString());
  const lookUpWrapper = lookUpValueFor(config);

  return (req, res, next) => {
    req.configRepo = lookUpWrapper;

    next();
  };
};

module.exports = configMiddleware;
