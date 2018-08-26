import axios from 'axios';

export const SET_USERNAME = 'SET_USERNAME';

export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username
});

export const SET_AGE = 'SET_AGE';

export const setAge = (age) => ({
  type: SET_AGE,
  payload: age
});

export const SET_ZIP = 'SET_ZIP';

export const setZip = (zip) => ({
  type: SET_ZIP,
  payload: zip
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

export const loadSteps = () => (dispatch) => {
  dispatch(getStepsRequest());

  return axios.get('http://localhost:3002/api/steps', {
    header: {
      'X-Sales-Channel': 'DE',
      'X-Zalando-Customer': 'PLUS'
    }
  })
  .then(({ data: steps }) => {
    dispatch(getStepsSuccess(steps));
  })
  .catch((err) => {
    dispatch(getStepsError(err));
  });
}
