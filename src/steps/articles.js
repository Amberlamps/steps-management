import React, { Component } from 'react';
import { Row, Col, Input, Alert } from 'antd';
import { connect } from 'react-redux';
import includes from 'lodash/includes';

import { selectUsername, selectUsernameError } from '../steps-manager/selectors';
import { setUsername, setUsernameError, checkUsername } from '../steps-manager/actions';
import StepManager, { PreviousButton, NextButton } from '../steps-manager';

const validations = (dispatch, getState) => new Promise((resolve, reject) => {
  const state = getState();
  const username = selectUsername(state);

  if (!username) {
    dispatch(setUsernameError('No username selected'));

    return reject();
  }

  checkUsername(username)
  .then(() => {
    dispatch(setUsernameError(''));
    resolve();
  })
  .catch((err) => {
    dispatch(setUsernameError('Username already exists'));
    reject();
  });
});

const onError = (dispatch, getState) => (errors) => {
  if (includes(errors, 'USERNAME_ALREADY_EXISTS')) {
    dispatch(setUsernameError('Username already exists'));
  }
};

class Articles extends Component {
  constructor() {
    super();

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(event) {
    this.props.setUsername(event.target.value);
  }

  render() {
    const { username, error } = this.props;

    return (
      <StepManager onError={onError}>
        <Row>
          <Col>
            <h3>Articles</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input onChange={this.handleUsernameChange} value={username} addonBefore="Username:" />
            {error && <Alert type="error" showIcon message={error} style={{ marginTop: '10px' }} />}
          </Col>
        </Row>
        <Row>
          <Col>
            <PreviousButton />
            <NextButton validations={validations} />
          </Col>
        </Row>
      </StepManager>
    );
  };
}

const mapStateToProps = (state) => ({
  username: selectUsername(state),
  error: selectUsernameError(state)
});

const mapDispatchToProps = {
  setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
