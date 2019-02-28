import React, { Component } from 'react';

class StatisticInformation extends Component {
  
  render() {
    return (      
      <div className='blogPage__percentage-item'>        
        <h2 className='blogPage__percentage-title'>{this.props.percent}</h2>
        <h2 className='blogPage__percentage-text'>{this.props.title}</h2>
      </div>
    )    
  }
}

export default StatisticInformation;

