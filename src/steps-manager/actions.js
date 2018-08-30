import axios from 'axios';
import get from 'lodash/get';
import find from 'lodash/find';

import { matchErrorToStep, navigateToStep, getCurrentStep } from './utils';
import { selectErrorHandler } from './selectors';

export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username
});

export const SET_USERNAME_ERROR = 'SET_USERNAME_ERROR';

export const setUsernameError = (error) => ({
  type: SET_USERNAME_ERROR,
  payload: error
});

export const SET_AGE = 'SET_AGE';

export const setAge = (age) => ({
  type: SET_AGE,
  payload: age
});

export const SET_AGE_ERROR = 'SET_AGE_ERROR';

export const setAgeError = (error) => ({
  type: SET_AGE_ERROR,
  payload: error
});

export const SET_ZIP = 'SET_ZIP';

export const setZip = (zip) => ({
  type: SET_ZIP,
  payload: zip
});

export const SET_ZIP_ERROR = 'SET_ZIP_ERROR';

export const setZipError = (error) => ({
  type: SET_ZIP_ERROR,
  payload: error
});

export const GET_STEPS_REQUEST = 'GET_STEPS_REQUEST';
export const GET_STEPS_SUCCESS = 'GET_STEPS_SUCCESS';
export const GET_STEPS_ERROR = 'GET_STEPS_ERROR';

const getStepsRequest = () => ({
  type: GET_STEPS_REQUEST
});

const getStepsSuccess = (steps) => ({
  type: GET_STEPS_SUCCESS,
  payload: steps
});

const getStepsError =  (error) => ({
  type: GET_STEPS_ERROR,
  payload: error
});

export const loadSteps = (onError) => (dispatch, getState) => {
  dispatch(getStepsRequest());

  return axios.get('http://localhost:3002/api/steps', {
    headers: {
      'X-Sales-Channel': 'DE',
      'X-Zalando-Customer': 'PLUS'
    }
  })
  .then(({ data: steps }) => {
    const currentStep = getCurrentStep();
    const foundStep = find(steps, { pathname: currentStep.pathname });
    if (!foundStep && currentStep.pathname !== '/success') {
      return navigateToStep(steps[0]);
    }
    const state = getState();
    const errors = selectErrorHandler(state);
    const foundSteps = errors.map((error) => matchErrorToStep(error));
    const foundErrorStep = find(foundSteps, { pathname: currentStep.pathname });
    if (onError && foundErrorStep) {
      onError(dispatch, getState)(errors);
    }
    const validSteps = steps.filter((step) => !find(foundSteps, { pathname: step.pathname }));
    const errorSteps = steps.filter((step) => find(foundSteps, { pathname: step.pathname }));
    
    dispatch(getStepsSuccess([...validSteps, ...errorSteps]));
  })
  .catch((err) => {
    dispatch(getStepsError(err));
  });
};

export const SET_ERROR_HANDLER = 'SET_ERROR_HANDLER';

export const setErrorHandler = (payload) => ({
  type: SET_ERROR_HANDLER,
  payload
});

export const CREATE_USER = 'CREATE_USER';

export const createUser = (user) => (dispatch) => {
  dispatch(setErrorHandler());

  return axios.post('http://localhost:3002/api/users', user)
  .then(() => {
    dispatch(setNextButtonStatus('SUCCESS'));
    navigateToStep({ pathname: '/success' });
  })
  .catch((err = {}) => {
    const message = get(err, 'response.data.message');
    if (message) {
      const step = matchErrorToStep(message);
      if (step) {
        dispatch(setErrorHandler(message));
        return navigateToStep(step);
      }
      dispatch(setNextButtonStatus('ERROR'));
      return dispatch(setNextButtonError(message));
    }

    dispatch(setNextButtonStatus('ERROR'));
    dispatch(setNextButtonError('Oops something happened'));
  });
};

export const checkUsername = (username) => {
  return axios.get(`http://localhost:3002/api/usernames/${username}`);
};

export const SET_NEXT_BUTTON_STATUS = 'SET_NEXT_BUTTON_STATUS';

export const setNextButtonStatus = (payload) => ({
  type: SET_NEXT_BUTTON_STATUS,
  payload
});

export const SET_NEXT_BUTTON_ERROR = 'SET_NEXT_BUTTON_ERROR';

export const setNextButtonError = (payload) => ({
  type: SET_NEXT_BUTTON_ERROR,
  payload
});
