import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PlainButton from './PlainButton';

import { createUser, setNextButtonStatus, setNextButtonError } from './actions';
import { selectStepsItems, selectNextButtonStatus, selectNextButtonError, selectUser } from './selectors';
import { getCurrentStep, getStepPosition, getNextLabel, navigateToStep } from './utils';

const mapStateToProps = (state, ownProps) => {
  const steps = selectStepsItems(state);
  const currentStep = getCurrentStep();
  const stepPosition = getStepPosition(steps, currentStep);
  const isLastStep = stepPosition === (steps.length - 1);
  const updatedLabel = isLastStep ? 'Create User' : (ownProps.label || getNextLabel(steps[stepPosition + 1]));
  const error = selectNextButtonError(state);

  return {
    shouldHideButton: false,
    label: updatedLabel,
    type: 'primary',
    loading: selectNextButtonStatus(state) === 'PENDING',
    error
  };
};

const navigateToStepWrapper = ({ validations }) => (dispatch, getState) => {
  dispatch(setNextButtonStatus('PENDING'));
  dispatch(setNextButtonError(''));
  validations(dispatch, getState).then(() => {
    const state = getState();
    const steps = selectStepsItems(state);
    const currentStep = getCurrentStep();
    const stepPosition = getStepPosition(steps, currentStep);
    const isLastStep = stepPosition === (steps.length - 1);
  
    if (isLastStep) {
      return dispatch(createUser(selectUser(state)));
    }
  
    dispatch(setNextButtonStatus('SUCCESS'));
    navigateToStep(steps[stepPosition + 1]);
  })
  .catch((err) => {
    const message = err && err.message || err || '';
    dispatch(setNextButtonStatus('ERROR'));
    dispatch(setNextButtonError(message));
  });
};

const mapDispatchToProps = (dispatch, { validations }) => ({
  onButtonClick: () => dispatch(navigateToStepWrapper({ validations }))
});

const NextButton = connect(mapStateToProps, mapDispatchToProps)(PlainButton);

NextButton.propTypes = {
  validations: PropTypes.func
};

NextButton.defaultProps = {
  validations: () => Promise.resolve()
};

export default NextButton;
