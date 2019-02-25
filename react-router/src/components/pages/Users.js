import React, { Component } from 'react';

class Users extends Component {
  state = {
    users: []
  }

  //во время componentDidMount мы получаем
  //количество юзеров, дальше отображаем
  //соответствующее количесттво options

  //как только происходит выбор юзера мы делаем
  //новый запрос но уже с айди https://swapi.co/api/people/1/
  // то что запросили выводим под селект.
  //Если выбрано ничего, то отображаем все по умолчанию.

  componentDidMount() {
    fetch('https://swapi.co/api/people/')
      .then((response) => {
        response.json().then((data) => {
          console.log(data.results.length);
          this.setState({
            users: [...data.results]
          });
          console.log(this.state.users[0].url);
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Users List</h1>
        <ul>
          <li>User #1</li>
          <li>User #2</li>
          <li>User #3</li>
          <li>User #4</li>
          <li>User #5</li>
        </ul>
      </React.Fragment>
    );
  }  
}

export default Users;