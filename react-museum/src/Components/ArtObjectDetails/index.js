import React from 'react';
import './style.scss';
import '../../Styles/main.scss';
import chroma from 'chroma-js';
import { Link } from "react-router-dom";

class ArtObjectDetails extends React.Component {
  state = {
    objectNumber: null,
    longTitle: null,
    plaqueDescriptionDutch: null,
    plaqueDescriptionEnglish: null,
    webImageUrl: null,
    //further is tags wich we using for filter
    type: null,
    datingPeriod: null,
    technique: null,
    normalized32Colors: null,
    material: null,
  }

  componentDidMount() {
    const { objectnumber } = this.props.match.params;
    let url = `https://www.rijksmuseum.nl/api/nl/collection/${objectnumber}?key=E7u3uumr&format=json`;
    fetch(url)
      .then(response => {
        response.json().then(data => {
          let {
              objectNumber,
              normalized32Colors,
              longTitle,
              plaqueDescriptionDutch,
              plaqueDescriptionEnglish,
              dating, 
              materials,
              webImage,
              techniques,
              objectTypes
            } = data.artObject;
          if (!webImage) webImage = {url: './img/No_Image_available.jpg'};
          this.setState({
            objectNumber: objectNumber,
            longTitle: longTitle,
            plaqueDescriptionDutch: plaqueDescriptionDutch,
            plaqueDescriptionEnglish: plaqueDescriptionEnglish,
            webImageUrl: webImage.url,
            //further is tags wich we using for filter
            material: materials,
            type: objectTypes,
            technique: techniques,
            datingPeriod: dating.period,
            normalized32Colors: normalized32Colors,
          });
        })
      })
  }

  render() {
    const image = {
      backgroundImage: 'url(' + this.state.webImageUrl + ')',
    };

    let showDecription = (lang, desc) => {
      let result;
      if (desc && lang === 'en') {
        result = (
          <div>
            <h3 className='art-page__title art-page__title--sub'>Description in English</h3>
            <p>{ desc }</p>
          </div>
        );
      } else if (desc && lang === 'nl') {
        result = (
          <div>
            <h3 className='art-page__title art-page__title--sub'>Description in Dutch</h3>
            <p>{ desc }</p>
          </div>
        );
      }
      return result;
    }

    let showPeriod = (data) => {
      let result;
        if (data) {
          result = (
            <li className="art-page__item">
              Period: 
              <Link
                className="art-page__link"
                to={{
                  pathname: '/',
                  state: {
                    tag: 'datingPeriod',
                    value: data
                  }
                }}
              >
                { data }
              </Link>
            </li>
          );
        }
      return result;
    }
    
    let showArray = (tagName, data) => {
      let links = [];
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            let tagLowerCase = tagName.toLowerCase(); 
            links.push(
              <Link
                key={ i }
                className="art-page__link"
                to={{
                  pathname: '/',
                  state: {
                    tag: tagLowerCase,
                    value: data[i]
                  }
                }}
              >
                { data[i] }
              </Link>
            );
          }
        return (
          <li className="art-page__item">
            { tagName }: 
            { links }
          </li>
        );
        }
    }

    let showColor = (data) => {
      let links = [];
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            let styling = { 'backgroundColor': chroma(data[i].match(/\#\w*/g).join('')) };
            links.push(
              <Link
                key={ i }
                className="art-page__link"
                style={ styling }
                to={{
                  pathname: '/',
                  state: {
                    tag: 'normalized32Colors',
                    value: data[i].match(/\#\w*/g).join('')
                  }
                }}
              >
                { data[i] }
              </Link>
            );
          }
        return (
          <li className="art-page__item">
            Normalized colors: 
            { links }
          </li>
          );
        }
    }

    return (
      <div className="art-page">
        <div className="art-page__container" style={image} >
        </div>
        <div className="art-page__content">
          <div>
            <h1 className="art-page__title">{ this.state.longTitle }</h1>
            <ul className="art-page__list">
              { showArray('Type', this.state.type) }
              { showPeriod(this.state.datingPeriod) }
              { showArray('Technique', this.state.technique) }
              { showArray('Material', this.state.material) }
              { showColor(this.state.normalized32Colors) }
            </ul>
            { showDecription('nl', this.state.plaqueDescriptionDutch) }
            { showDecription('en', this.state.plaqueDescriptionEnglish) }
          </div>
          <Link
            className="art-page__link art-page__link--main"
            to={{
              pathname: '/',
            }}
          >
            Go To Main Page
          </Link>
        </div>
      </div>
    );
  }
}

export default ArtObjectDetails;

