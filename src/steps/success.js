import React from 'react';
import { Row, Col } from 'antd';

import StepManager from '../steps-manager';

const Success = () => (
  <StepManager>
    <Row>
      <Col>
        <h3>Success</h3>
      </Col>
    </Row>
    <Row>
      <Col>
        User was created
      </Col>
    </Row>
  </StepManager>
);

export default Success;
