import React from "react";

export class Home extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      age: props.initialAge,
      homeLink: props.initialLinkName
    }
    console.log('Constructor')
  }

  componentWilMount() {
    console.log('component Wil Mount');
  }

  componentDidMount() {
    console.log('component Did Mount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldcomponent Update', nextProps, nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('component Will Update', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component Did Update', prevProps, prevState);
  }

  componentWillUnmount() {
    console.log('component Will Unmount');
  }

  onMakeOlder() {
    this.setState({
      age: this.state.age + 3
    });
  }

  onChangeLink() {
    this.props.changeLink(this.state.homeLink);
  }

  onHandleChange(e) {
    this.setState({
      homeLink: e.target.value
    });
  }

  render() {
    return (
      <div>
        <p>In a new Component!</p>
        <p>Your name is { this.props.name }, your age is { this.state.age }</p>
        <hr/>
        <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary" >Make me older</button>
        <hr/>
        <button onClick={this.props.greet} className="btn btn-primary" >Greet</button>
        <hr/>
        <input
          type="text"
          value={this.state.homeLink}
          onChange={(e) => this.onHandleChange(e)}
        />
        <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary" >Change Header Link</button>
      </div>
    );
  }
}