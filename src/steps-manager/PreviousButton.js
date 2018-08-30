import { connect } from 'react-redux';
import { noop } from 'lodash/noop';

import PlainButton from './PlainButton';

import { selectStepsItems } from './selectors';
import { getCurrentStep, getStepPosition, navigateToStep, getPrevLabel } from './utils';

const mapStateToProps = (state, ownProps) => {
  const steps = selectStepsItems(state);
  const currentStep = getCurrentStep();
  const stepPosition = getStepPosition(steps, currentStep);
  const isFirstStep = stepPosition === 0;
  const onButtonClick = isFirstStep ? noop : () => navigateToStep(steps[stepPosition - 1]);
  const updateLabel = (isFirstStep) ? '' : (ownProps.label || getPrevLabel(steps[stepPosition - 1]));

  return {
    shouldHideButton: isFirstStep,
    onButtonClick,
    label: updateLabel
  };
};

export default connect(mapStateToProps)(PlainButton);
