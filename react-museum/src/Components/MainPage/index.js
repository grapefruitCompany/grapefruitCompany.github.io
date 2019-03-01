import React from 'react';
import ArtObjectItem from '../ArtObjectItem';
import Paginator from '../Paginator';
import OnPageButtons from '../OnPageButtons';
import './style.scss';
import '../../Styles/main.scss';
// import { Link } from "react-router-dom";

class MainPage extends React.Component {
  state = {
    artObjects: [],
    count: null,
    pageNumber: 1,
    objectsOnPage: 5,
    baseUrl: 'https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json',
    lastUrl: 'https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json'
  }
  //E7u3uumr

  componentDidMount() {
    this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
  }

  getCollection(pageNumber, objectsOnPage = this.state.objectsOnPage) {
    fetch(`${this.state.lastUrl}&p=${pageNumber}&ps=${objectsOnPage}`)
      .then(response => {
        response.json().then(data => {
          this.setState({
            artObjects: data.artObjects,
            count: data.count,
            pageNumber: pageNumber,
            objectsOnPage:  objectsOnPage,
          });
        })
      })
      .catch(error => console.log(error)); 
  }

  getAllMatches(query) {
    let currentUrl = `${this.state.baseUrl}&q=${query}`;
    this.setState({
      lastUrl: currentUrl,
      pageNumber: 1
    });
    fetch(`${currentUrl}&p=${this.state.pageNumber}&ps=${this.state.objectsOnPage}`)
      .then(response => {
        response.json().then(data => {
          this.setState({
            artObjects: data.artObjects,
            count: data.count
          });
        })
      })
      .catch(error => console.log(error)); 
  }

  handleChange(e) {
    if (e.target.value && e.target.value.length > 1) {
      this.getAllMatches(e.target.value);
    }
  }

  reset() {
    this.setState({
      lastUrl: this.state.baseUrl
    });
    this.getAllMatches('');
  }

  render() {
    console.log(this.state.lastUrl);
    let count = this.state.count > 10000 ? 10000 : this.state.count,
        numberArtObjectsFrom = this.state.objectsOnPage * this.state.pageNumber - this.state.objectsOnPage + 1,
        numberArtObjectsTo = (numberArtObjectsFrom + this.state.objectsOnPage) > count ? count : (this.state.objectsOnPage * this.state.pageNumber);
    return (
      <div className="main-page" >
        <div className="top">
          <form>
            <div className="main-page__search">
              <input
                id="search"
                type="text"
                onChange={ this.handleChange.bind(this) }
                className="main-page__search-input"
                placeholder="e.g. Van Gogh"
              />
              <label htmlFor="search" className="main-page__search-label">Search for...</label>
              <span className="main-page__search-border"></span>
            </div>          
            <button onClick={() => this.reset()} type="reset" value="reset">Reset</button>
          </form>
        
        </div>
        <ArtObjectItem artObjects={ this.state.artObjects }/>
        <div className="main-page__bottom">
          <div className="main-page__info">
            <p className="main-page__text">
              Show { numberArtObjectsFrom } to { numberArtObjectsTo } from { count } Art Objects
            </p>
          </div>
          <div className="main-page__paginator">
            <Paginator
              pageNumber={ this.state.pageNumber }
              objectsOnPage={ this.state.objectsOnPage }
              count={ count }
              getCollection={ this.getCollection.bind(this) }
            />
          </div>
          <div className="main-page__on-page">
            <OnPageButtons
              objectsOnPage={ this.state.objectsOnPage }
              getCollection={ this.getCollection.bind(this) }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;