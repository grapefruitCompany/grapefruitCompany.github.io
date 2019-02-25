import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>React router</h1>
      <nav>
        <ul style={list}>
          <li><NavLink exact to="/" activeStyle={selected} >Home</NavLink> </li>
          <li><NavLink activeStyle={selected} to="/contacts">Contacts</NavLink> </li>
          <li><NavLink activeStyle={selected} to="/users">Users List</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const list = {
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'space-around'
}

const selected = {
  color: 'white',
  textDecoration: 'underline',
  fontWeight: 'bold'
}

export default Header;