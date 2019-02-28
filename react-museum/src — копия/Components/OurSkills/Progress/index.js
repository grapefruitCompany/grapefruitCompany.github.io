import React, {Component} from 'react';

class Progress extends Component {
  render() {
    return (
      <div className="our-skills__item">
        <div className="our-skills__item-title">
          <span className="our-skills__skill">{this.props.skill}</span>
          <span className="our-skills__value">{this.props.value}%</span>
        </div>
        <progress className="our-skills__progress-bar" max="100" value={this.props.value}/>
      </div>
    )
  }
}

export default Progress;