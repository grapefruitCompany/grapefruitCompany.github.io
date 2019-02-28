import React from 'react';
import { Link } from 'react-router-dom'
import './style.scss';
import '../../Styles/main.scss';

class PopUp extends React.Component {

  render() {
    let popUpClass = ['pop-up '],
        urlArtObjectDetail = '/';
    if (this.props.popUpContent.objectNumber.length) {
      popUpClass.push('pop-up--show');
      urlArtObjectDetail = urlArtObjectDetail + this.props.popUpContent.objectNumber;
    } 

    return (
      <div className={ popUpClass.join(' ') }>
        <div className="pop-up__inner">
          <img className="pop-up__img" src={ this.props.popUpContent.webImageUrl } alt="masterpiece"/>
            <div className="pop-up__content">
              <div className="pop-up__text">
                <h2 className="pop-up__title">{ this.props.popUpContent.longTitle }</h2>
                <p className="pop-up__desc">{ this.props.popUpContent.description }</p>
              </div>
              <Link to={ urlArtObjectDetail } className="pop-up__btn">View more details</Link>
            </div>
          <button onClick={ () => this.props.closeModalWindow() } className="pop-up__close">&#10006;</button>
        </div>        
    </div>
    )
  }
}

export default PopUp;

// <button className="pop-up__btn">View more details</button>