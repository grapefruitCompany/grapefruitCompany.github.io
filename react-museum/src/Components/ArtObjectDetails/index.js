import React from 'react';
import './style.scss';
import '../../Styles/main.scss';
import chroma from 'chroma-js';
import { Link } from "react-router-dom";

class ArtObjectDetails extends React.Component {
  state = {
    objectTypes: null,
    objectNumber: null,
    physicalMedium: null,
    colorsWithNormalization: null,
    longTitle: null,
    principalMaker: null,
    plaqueDescriptionDutch: null,
    plaqueDescriptionEnglish: null,
    datingPeriod: null,
    materialsPresentingDate: null,
    webImageUrl: null
  }
  //E7u3uumr

  componentDidMount() {
    const { objectnumber } = this.props.match.params;
    let url = `https://www.rijksmuseum.nl/api/nl/collection/${objectnumber}?key=E7u3uumr&format=json`;
    fetch(url)
      .then(response => {
        response.json().then(data => {
          let {objectTypes, objectNumber, physicalMedium, colorsWithNormalization, longTitle, principalMaker, plaqueDescriptionDutch, plaqueDescriptionEnglish, dating, materials, webImage} = data.artObject;
          if (!webImage) webImage = {url: './img/No_Image_available.jpg'};
          this.setState({
            objectTypes: objectTypes,
            objectNumber: objectNumber,
            physicalMedium: physicalMedium,
            colorsWithNormalization: colorsWithNormalization,
            longTitle: longTitle,
            principalMaker: principalMaker,
            plaqueDescriptionDutch: plaqueDescriptionDutch,
            plaqueDescriptionEnglish: plaqueDescriptionEnglish,
            datingPeriod: dating.period,
            materialsPresentingDate: materials,
            webImageUrl: webImage.url
          });
        })
      })
  }

  render() {
    const image = {
      backgroundImage: 'url(' + this.state.webImageUrl + ')',
    };

    function showColors(colors) {
      let colorsHex = [],
          result = [];
      if (colors) {
        for (let i = 0; i < colors.length; i++) {
          let duplicate = false;
          for (let j = 0; j < i; j++) {
            if (colors[j].normalizedHex === colors[i].normalizedHex) {
              duplicate = true;
            }
          }

          if (!duplicate) {
            colorsHex.push(colors[i].normalizedHex)
          }
        }
      }
      for(let i = 0; i < colorsHex.length; i++) {
        let styling = {
          color: chroma(colorsHex[i])
        }
        result.push(
          <li className="art-page__link" key={ i }>
            <Link
              style={ styling }
              to={{
                pathname: '/',
                state: {
                  tag: 'color',
                  value: colorsHex[i]
                }
            }}>{ colorsHex[i] }</Link>
          </li>
        );
      }

      return result;
    }

    return (
      <div className="art-page">
        <div className="art-page__container" style={image} >
        </div>
        <div className="art-page__content">
          <h1 className="art-page__title">{ this.state.longTitle }</h1>
          <ul className="art-page__list">
            <li>Author: { this.state.principalMaker }</li>
            <li>Dating period: { this.state.datingPeriod }</li>
            <li>Type: { this.state.objectTypes }</li>
            <li>Physical medium: { this.state.physicalMedium }</li>
            <li>Materials: { this.state.materialsPresentingDate }</li>
          </ul>
          <h3 className="art-page__title art-page__title--sub">
            Normalized Hex Colors
          </h3>
          <ul className="art-page__list">
            { showColors(this.state.colorsWithNormalization) }
          </ul>
          <h3 className="art-page__title art-page__title--sub">Description Dutch</h3>
          <p className="art-page__paragraph">{ this.state.plaqueDescriptionDutch }</p>
          <h3 className="art-page__title art-page__title--sub">Description English</h3>
          <p className="art-page__paragraph">{ this.state.plaqueDescriptionEnglish }</p>
        </div>
      </div>
    )
  }
}

export default ArtObjectDetails;

// добавить список для отображения цветов
// это будет функциоональный компонент

//для описания тоже сделать функциональный компонент
//если длина ровна нулю, то описание не отображается

// добавить кнопку Линк, чтобы вернутся на главную страницу

// сделать каждый лист айтем Линком. При нажатии не него
// переходим на главную страницу и его значение попадает в пропсы
//главной страницы

// <li>Colors with normalization: { this.state.colorsWithNormalization }</li>
//<img className="art-page__img" src={ this.state.webImageUrl } alt=""/>
