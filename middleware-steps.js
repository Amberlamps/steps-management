const _ = require('lodash');

const Step = require('./Step');

const { enhanceInitialState, getSalesChannel, getCustomer } = require('./utils');

const getRedirectFunc = (req, res) => {
  if (req.xhr) {
    return (url) => res.status(302).json({ url });
  }

  return (url) => res.redirect(url);
};

const stepsMiddleware = (req, res, next) => {
  const salesChannel = getSalesChannel(req);
  const customer = getCustomer(req);

  const configuredSteps = req.configRepo('steps', salesChannel, customer);

  const redirect = getRedirectFunc(req, res);

  if (!configuredSteps || configuredSteps.length === 0) {
    return redirect('/error-no-steps-configured');
  }

  const pathname = (req.xhr) ? req.referer : req.originalUrl;
  const uniqSteps = _.uniq([...configuredSteps, 'SUCCESS']);
  const steps = uniqSteps
    .map((step) => Step({
      currentPathname: pathname,
      step
    }));
  
  steps.forEach((step, index, allSteps) => {
    step.setPrevious(allSteps[index - 1]);
    step.setNext(allSteps[index + 1]);
  });

  if (pathname === '/') {
    const [firstStep] = steps;

    return redirect(firstStep.getPathname());
  }

  const [currentStep] = steps.filter((step) => step.isCurrentStep());

  if (!currentStep) {
    return redirect('/error-step-not-enabled-for-sales-channel-or-user');
  }

  if (!currentStep.getPathname()) {
    return redirect('/error-step-is-allowed-but-not-configured-in-bff');
  }

  req.currentStep = currentStep;

  return currentStep.next(req, res)
    .then((nextStep) => {
      res.locals = enhanceInitialState(res.locals, {
        nextStep: {
          step: nextStep.getStep()
        }
      });
    
      return next();
    })
    .catch(next);
};

module.exports = stepsMiddleware;
