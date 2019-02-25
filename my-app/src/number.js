import React from 'react';
import ReactDOM from 'react-dom';

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      figure: 1,
    };
  }

  handleClick(i) {
    let value = this.state.figure;
    value += i;
    this.setState({
      figure: value,
    });
  }

  render() {
    let className = 'number__item ';
    if (this.state.figure < 0) className += 'number__item--red';
    if (this.state.figure > 0) className += 'number__item--green'; 
    return (
      <div className="number">
        <button className="number__item number__item--btn"
          onClick={() => this.handleClick(-1)}
        >
          -
        </button>
        <p className={className}>
          {this.state.figure}
        </p>
        <button className="number__item number__item--btn"
          onClick={() => this.handleClick(1)}
        >
          +
        </button>
      </div>

    );
  }
}

export default Number;