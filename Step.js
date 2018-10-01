const _ = require('lodash');

const { getReturnOptions } = require('./services/get-return-options');
const { getRefundOptions } = require('./services/get-refund-options');

const { getCustomer, getSalesChannel, enhanceInitialState } = require('./utils');

const stepsMapping = {
  'SUCCESS': {
    pathname: '/success',
    isRequired: () => Promise.resolve(true)
  },
  'ARTICLES': {
    pathname: '/articles',
    isRequired: () => Promise.resolve(true)
  },
  'RETURN_OPTIONS': {
    pathname: '/return-options',
    isRequired: (req, res) => {
      const salesChannel = getSalesChannel(req);
      const customer = getCustomer(req);
      
      return getReturnOptions({ salesChannel, customer })
      .then((returnOptions) => {
        const [returnOption] = returnOptions;

        const onlyOneOption = (returnOption === 'DROP_OFF' && returnOptions.length === 1);

        if (onlyOneOption) {
          res.locals = enhanceInitialState(res.locals, { returnOptions: { returnOptionType: 'DROP_OFF' }});
        }
        
        return !onlyOneOption;
      });
    }
  },
  'REFUND_OPTIONS': {
    pathname: '/refund-options',
    isRequired: (req, res) => {
      const salesChannel = getSalesChannel(req);
      const customer = getCustomer(req);
      
      return getRefundOptions({ salesChannel, customer })
      .then((refundOptions) => {
        const [refundOption] = refundOptions;

        const onlyOneOption = (refundOption === 'ORIGINAL' && refundOptions.length === 1);

        if (onlyOneOption) {
          res.locals = enhanceInitialState(res.locals, { refundOptions: { refundOptionsType: 'ORIGINAL' }});
        }

        return !onlyOneOption;
      })
    }
  }
};

const Step = ({ currentPathname, step }) => {
  let previousStep = null;
  let nextStep = null;
  let mapping = stepsMapping[step];
  let pathname = mapping && mapping.pathname;
  let isRequired = mapping && mapping.isRequired || (() => Promise.resolve(true));

  const setNext = (step) => {
    if (step) {
      nextStep = step;
    }
  };

  const setPrevious = (step) => {
    if (step) {
      previousStep = step;
    }
  };

  const next = (req, res) => {
    if (!nextStep) {
      return Promise.resolve(false);
    }

    return nextStep.isRequired(req, res)
      .then((value) => {
        const currentStep = nextStep.getStep();

        if (!value || currentStep === 'REFUND_OPTIONS') {
          return nextStep.next(req, res);
        }

        return nextStep;
      });
  };

  const previous = () => Promise.resolve(previousStep);

  return {
    getStep: () => step,
    getPathname: () => pathname,
    isCurrentStep: () => pathname === currentPathname,
    next,
    setNext,
    hasNext: () => nextStep !== null,
    previous,
    setPrevious,
    hasPrevious: () => previousStep !== null,
    isRequired
  };
}

module.exports = Step;
