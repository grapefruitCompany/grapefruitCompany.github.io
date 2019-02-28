import React from 'react';
import './style.scss';

class Logo extends React.Component {
  render() {
    return (
      <span className="logo" style={{ fontSize: this.props.fontSize }}>
        <span style={{ color: this.props.color }}>Bhagas</span>
        <span className="logo__item logo__item--secondary">kara</span>
        <span style={{ color: this.props.color }}>.</span>
      </span>
    );
  }
}

export default Logo;