import React from 'react';
import { NavLink } from 'react-router-dom'
import Logo from '../Logo';
import './style.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="content">
        <span className="content__item logo">
          <Logo color="#676767" fontSize="30px"/>
        </span>
          <nav className="content__item menu">
            <ul className="menu__items">
              <li className="menu__item"><NavLink exact to="/" activeClassName="active">
                <div className="menu__anim">Home</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/about" activeClassName="active">
                <div className="menu__anim">About</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/team" activeClassName="active">
                <div className="menu__anim">Team</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/services" activeClassName="active">
                <div className="menu__anim">Services</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/portfolio" activeClassName="active">
                <div className="menu__anim">Portfolio</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/blog" activeClassName="active">
                <div className="menu__anim">Blog</div>
              </NavLink></li>
              <li className="menu__item"><NavLink to="/contact" activeClassName="active">
                <div className="menu__anim">Contact</div>
              </NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;