import { combineReducers } from 'redux';

import {
  SET_USERNAME,
  SET_AGE,
  SET_ZIP,
  GET_STEPS_ERROR,
  GET_STEPS_SUCCESS,
  GET_STEPS_REQUEST
} from './actions';

const username = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_USERNAME: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const articles = combineReducers({
  username
});

const age = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_AGE: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const payments = combineReducers({
  age
});

const zip = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_ZIP: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const returnOptions = combineReducers({
  zip
});

export default combineReducers({
  articles,
  payments,
  returnOptions,
  steps: combineReducers({
    items: (state = [], { type, payload }) => {
      switch (type) {
        case GET_STEPS_SUCCESS: {
          return payload;
        }

        default: {
          return state
        }
      }
    },
    loadingStatus: (state = 'INITIAL', { type, payload }) => {
      switch (type) {
        case GET_STEPS_REQUEST: {
          return 'PENDING';
        }

        case GET_STEPS_SUCCESS: {
          return 'SUCCESS';
        }

        case GET_STEPS_ERROR: {
          return 'ERROR';
        }

        default: {
          return state
        }
      }
    }
  })
});
