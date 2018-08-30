import React from 'react';
import { Row, Col } from 'antd';

import StepManager, { PreviousButton, NextButton } from '../steps-manager';

const Payments = () => (
  <StepManager>
    <Row>
      <Col>
        <h3>Payments</h3>
      </Col>
    </Row>
    <Row>
      <Col>
        <PreviousButton />
        <NextButton />
      </Col>
    </Row>
  </StepManager>
);

export default Payments;
