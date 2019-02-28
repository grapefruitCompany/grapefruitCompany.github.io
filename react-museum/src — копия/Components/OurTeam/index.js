import React, { Component } from 'react';
import SliderInner from './SliderInner';
import Title from '../Title'
import './style.scss';

export class OurTeam extends Component {
  state = {
    teamList: [],
    countClicks: 0
  }  

  componentDidMount() {
    fetch('https://tanuhaua.github.io/datas-file-json/bhagaskara/team.json')
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            teamList: data
          });
          const arr = JSON.parse(JSON.stringify(this.state.teamList));
          for (let i = 0; i < arr.length; i++) {
            let url = 'https://api.github.com/users/' + arr[i].githubName;
            fetch(url)
              .then((response) => {
                response.json().then((data) => {
                  arr[i].avatar_url = data.avatar_url;
                  this.setState({
                    teamList: arr
                  });
                });
              });
          }
        });
      });
  }

  handleClick(i) {
    let {countClicks} = this.state;
    this.setState({
      countClicks: countClicks + i
    })
  }

  setClick() {
    this.setState({
      countClicks: 0
    })
  }

  render() {
    return (
      <section id="OurTeam">
        <div className="wrap">

        <Title title="Our" titlePurple="team" />

          <div className="slider">
            <div className="slider__controls">
              <img
                onClick={ () => {this.handleClick(1)} }
                className="slider__control"
                src="/img/arrow.png"
                alt="arrow to switch slider of team mates"
              />
              <img
                onClick={ () => {this.handleClick(-1)} }
                className="slider__control slider__control--reverse"
                src="/img/arrow_reverse.png"
                alt="arrow to switch slider of team mates"
              />
            </div>
            <SliderInner setClick={ this.setClick.bind(this) } countClicks={ this.state.countClicks } teamList={ this.state.teamList } />
          </div>
        </div>
      </section>
    );
  }
}



export default OurTeam