import React, { Component } from "react";
import StatisticInformation from "./StatisticInformation";

class Percentage extends Component {
  render() {
    return <div className='blogPage__percentage'>{ StatisticList(this.props.statistic) }</div>;
    
  }
}

export default Percentage;

function StatisticList(statistic) {
  let arr = [];

  for (let key of Object.keys(statistic)) {
    arr.push(
      <StatisticInformation key={key} title={key} percent={statistic[key]} />
    );
  }

  return arr;
}
