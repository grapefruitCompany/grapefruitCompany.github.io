import React, { Component } from 'react';
import Percentage from './Percentage';
import Posts from './Posts';
import './blogPage.scss'

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {curent: 0};
    this.changeState = changeState.bind(this);    
  }
  componentDidMount() {    
    fetch('https://tanuhaua.github.io/datas-file-json/bhagaskara/blog.json')
    .then( response => {    
      if (response.status === 200) {
        return response.json();
        
      }
    })
    .then( obj => {
      this.setState(obj);        
    })    
  }
  render() {
    const {statistic = {}, posts = []} = this.state;
    
    return (
      <div className={'blogPage'}>
        <Percentage statistic={statistic}/>
        <Posts posts={posts} curentPost={posts[this.state.curent]} changeState={this.changeState}/>
      </div>
    );
  }
}

export default BlogPage;

function changeState(value) {
  this.setState(value);    
}