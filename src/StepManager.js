import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';

import { loadSteps } from './actions';
import { selectStepsLoadingStatus } from './selectors';

class StepManager extends Component {
  componentDidMount() {
    this.props.loadSteps();
  }

  render() {
    if (this.props.loadingStatus === 'PENDING' || this.props.loadingStatus === 'INITIAL') {
      return <Spin />;
    }

    return (
      <Row>
        <Col>
          {this.props.children}      
        </Col>
      </Row>
    );
  }
}

StepManager.propTypes = {
  shouldRenderStep: PropTypes.func
};

StepManager.defaultProps = {
  shouldRenderStep: () => Promise.resolve(true)
};

const Next = () => (
  <Button type="primary">Next step</Button>
);

const Previous = () => (
  <Button>Previous step</Button>
);

// validate
const mapStateToProps = (state) => ({
  loadingStatus: selectStepsLoadingStatus(state)
});

const mapDispatchToProps = {
  loadSteps
};

const StepManagerConnected = connect(mapStateToProps, mapDispatchToProps)(StepManager);

export {
  StepManagerConnected  as StepManager,
  Next,
  Previous
};
