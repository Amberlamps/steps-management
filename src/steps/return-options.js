import React from 'react';
import { Row, Col } from 'antd';

import { StepManager, Next } from '../StepManager';

const ReturnOptions = () => (
  <StepManager>
    <Row>
      <Col>
        ReturnOptions
      </Col>
    </Row>
    <Row>
      <Col>
        <Next />
      </Col>
    </Row>
  </StepManager>
);

export default ReturnOptions;
