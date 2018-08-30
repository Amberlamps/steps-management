import React from 'react';
import { Row, Col } from 'antd';

const App = ({ children }) => (
  <Row>
    <Col style={{ margin: '40px' }}>
      {children}
    </Col>
  </Row>
);

export default App;
