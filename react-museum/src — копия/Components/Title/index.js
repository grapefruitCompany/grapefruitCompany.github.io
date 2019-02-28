import React, {Component} from 'react';
import "./style.scss";

class Title extends Component {
  render() {
    return (
      <h2 className="title">{this.props.title} <span className="title--purple">{this.props.titlePurple}</span></h2>
    )
  }
}

export default Title;