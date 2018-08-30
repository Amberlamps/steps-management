import findIndex from 'lodash/findIndex';
import includes from 'lodash/includes';
import head from 'lodash/head';
import get from 'lodash/get';

export const getCurrentStep = () => ({
  pathname: get(window, 'location.pathname', '')
});
export const getStepPosition = (steps, step) => findIndex(steps, { pathname: step.pathname });

// eslint-disable-next-line
export const navigateToStep = (step) => location.href = step.pathname;

export const stepMappings = {
  '/articles': {
    prev: 'Back to articles selection',
    next: 'Next: Select articles'
  },
  '/return-options': {
    prev: 'Back to return options',
    next: 'Next: Select return options'
  },
  '/payments': {
    prev: 'Back to payment details',
    next: 'Next: Enter payment details'
  }
};

const steps = [{
  pathname: '/articles',
  errors: ['USERNAME_ALREADY_EXISTS']
}, {
  pathname: '/return-options'
}, {
  pathname: '/payments'
}];

export const matchErrorToStep = (error) => head(steps.filter(({ errors = [] }) => includes(errors, error)));
export const getNextLabel = ({ pathname } = {}) => get(stepMappings, `${pathname}.next`);
export const getPrevLabel = ({ pathname } = {}) => get(stepMappings, `${pathname}.prev`);
