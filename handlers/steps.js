const stepsHandler = (req, res, next) => {
  console.log(req.currentStep);
  console.log(req.currentStep.getStep());
  res.send('OK');
};

module.exports = stepsHandler;
