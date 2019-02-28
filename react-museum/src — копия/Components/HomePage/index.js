import React from 'react';
import './style.scss';
import '../../Styles/main.scss';
import Logo from '../Logo';
import settings from './img/settings.png';
import bubble from './img/bubble.png';
import paperplane from './img/paperplane.png';
import pen from './img/pen.png';
import photo from './img/photo.png';
import user from './img/user.png';
import { Link } from "react-router-dom";
import Features from "../Features";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="home">
          <div className="home__content">
            <div className="home__logo">
              <Logo color='#fff' fontSize='6rem'/>
            </div>
            <h1 className="home__title home__title--main">Fusce rutrum pretium lorem sempter nulla</h1>
            <p className="home__title home__title--sub"> lorem ipsum furcum pretium lorem septer nulla gu op dunap
              sulem
              lorem do burta</p>
            <div className="home__icon-box">
              <Link to="/about" className="home__icon">
                <img className="icon__item" src={settings} alt="icon"/>
                <p className="home__icon-text">About</p>
              </Link>
              <Link to="/team" className="home__icon">
                <img className="icon__item" src={user} alt="icon"/>
                <p className="home__icon-text">Team</p>
              </Link>
              <Link to="/services" className="home__icon">
                <img className="icon__item" src={bubble} alt="icon"/>
                <p className="home__icon-text">Services</p>
              </Link>
              <Link to="/portfolio" className="home__icon">
                <img className="icon__item" src={photo} alt="icon"/>
                <p className="home__icon-text">Portfolio</p>
              </Link>
              <Link to="/blog" className="home__icon">
                <img className="icon__item" src={pen} alt="icon"/>
                <p className="home__icon-text">Blog</p>
              </Link>
              <Link to="/contact" className="home__icon">
                <img className="icon__item" src={paperplane} alt="icon"/>
                <p className="home__icon-text">Contact</p>
              </Link>
            </div>
          </div>
        </div>
        <Features/>
      </div>
    )
  }
}

export default HomePage;
