import React from 'react';
import PopUp from '../PopUp';
import './style.scss';
import '../../Styles/main.scss';

class ArtObjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpContent: {
        objectNumber: '',
        webImageUrl: '',
        longTitle: '',
        description: ''
      }
    }
  }

  handleClick(objectNumber, webImageUrl, longTitle) {
    let url = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=E7u3uumr&format=json`;
    fetch(url)
      .then(response => {
        response.json().then(data => {
          this.setState({
            popUpContent: {
              objectNumber: objectNumber,
              webImageUrl: webImageUrl,
              longTitle: longTitle,
              description: data.artObject.description
            }
          });
        })
      })
  }

  closeModalWindow() {
    this.setState({
            popUpContent: {
              objectNumber: '',
              webImageUrl: '',
              longTitle: '',
              description: ''
            }
          });
  }

  render() {
      let showArtObjects = () => {
        let list = this.props.artObjects,
            result =[];
        if (!list.length) return;
        for (let i = 0; i < list.length; i++) {
          let {objectNumber, webImage, longTitle, title} = list[i];
          if (!webImage) {
            webImage = {url: './img/No_Image_available.jpg'};
          }
          result.push(
              <div className="artObjects__item" onClick={ () => { this.handleClick(objectNumber, webImage.url, longTitle) } } key={ objectNumber }>
                <img className="artObjects__img" src={ webImage.url } alt={ longTitle }/>
                <p className="artObjects__title">{ title }</p>
              </div>
          );
        }
        return result;
      }
    return (
      <div className="artObjects">
        { showArtObjects() }
        <PopUp popUpContent={ this.state.popUpContent } closeModalWindow={ this.closeModalWindow.bind(this)} />
      </div>
    )
  }
}

export default ArtObjectItem;
