import React from 'react';
import { Row, Col } from 'antd';

const App = ({ children }) => (
  <Row>
    <Col>
      {children}
    </Col>
  </Row>
);

export default App;
