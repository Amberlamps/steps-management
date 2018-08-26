import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import { connect } from 'react-redux';

import { selectUsername } from '../selectors';
import { setUsername } from '../actions';
import { StepManager, Previous, Next } from '../StepManager';

class Articles extends Component {
  constructor() {
    super();

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(event) {
    this.props.setUsername(event.target.value);
  }

  render() {
    const { username } = this.props;

    return (
      <StepManager>
        <Row>
          <Col>
            <Input onChange={this.handleUsernameChange} value={username} addonBefore="Username:" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Previous />
            <Next />
          </Col>
        </Row>
      </StepManager>
    );
  };
}

const mapStateToProps = (state) => ({
  username: selectUsername(state)
});

const mapDispatchToProps = {
  setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
