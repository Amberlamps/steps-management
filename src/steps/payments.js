import React from 'react';
import { Row, Col } from 'antd';

import { StepManager, Next } from '../StepManager';

const Payments = () => (
  <StepManager>
    <Row>
      <Col>
        Payments
      </Col>
    </Row>
    <Row>
      <Col>
        <Next />
      </Col>
    </Row>
  </StepManager>
);

export default Payments;
