import React from 'react';
import './style.scss';

class PPImagesItem extends React.Component {
  render() {
      return (
        <div className="portfolio-page__images-item">
          <div className="portfolio-page__image-wrapper">
            <img className="portfolio-page__image" src={this.props.src} alt={this.props.title} />
          </div>
          <p className="portfolio-page__images-title">{this.props.title}</p>
          <p className="portfolio-page__images-keywords">{this.props.keywords}</p>
        </div>
      )
    }
}

export default PPImagesItem;