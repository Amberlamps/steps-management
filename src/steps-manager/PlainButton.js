import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'antd';

const PlainButton = ({ shouldHideButton, label, onButtonClick, type, loading, error }) => {
  if (shouldHideButton) {
    return null;
  }

  return (
    <div>
      <Button onClick={onButtonClick} type={type} loading={loading} style={{ marginTop: '20px' }}>{label}</Button>
      {error && <Alert type="error" showIcon message={error} style={{ marginTop: '10px' }} />}
    </div>
  );
};

PlainButton.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string
};

PlainButton.defaultProps = {
  type: 'default',
  loading: false,
  error: ''
};

export default PlainButton;
