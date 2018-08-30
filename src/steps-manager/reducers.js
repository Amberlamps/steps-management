import { combineReducers } from 'redux';
import concat from 'lodash/concat';
import compact from 'lodash/compact';

import {
  SET_USERNAME,
  SET_AGE,
  SET_ZIP,
  SET_USERNAME_ERROR,
  SET_AGE_ERROR,
  SET_ZIP_ERROR,
  GET_STEPS_ERROR,
  GET_STEPS_SUCCESS,
  GET_STEPS_REQUEST,
  SET_NEXT_BUTTON_STATUS,
  SET_NEXT_BUTTON_ERROR,
  SET_ERROR_HANDLER
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

const usernameError = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_USERNAME_ERROR: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const articles = combineReducers({
  usernameError
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

const ageError = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_AGE_ERROR: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const payments = combineReducers({
  ageError
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

const zipError = (state = '', { type, payload } = {}) => {
  switch (type) {
    case SET_ZIP_ERROR: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

const returnOptions = combineReducers({
  zipError
});

const user = combineReducers({
  username,
  age,
  zip
});

const next = combineReducers({
  loadingStatus:  (state = 'INITIAL', { type, payload } = {}) => {
    switch (type) {
      case SET_NEXT_BUTTON_STATUS: {
        return payload;
      }
  
      default: {
        return state;
      }
    }
  },
  error:  (state = '', { type, payload } = {}) => {
    switch (type) {
      case SET_NEXT_BUTTON_ERROR: {
        return payload;
      }
  
      default: {
        return state;
      }
    }
  }
});

const stepsManager = combineReducers({
  next
});

const errorHandler = (state = [], { type, payload } = {}) => {
  switch (type) {
    case SET_ERROR_HANDLER: {
      return compact(concat(payload));
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  user,
  articles,
  payments,
  returnOptions,
  stepsManager,
  errorHandler,
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
