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
    objectsOnPage: 5
  }
  //E7u3uumr

  componentDidMount() {
    this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
  }

  getCollection(pageNumber, objectsOnPage = this.state.objectsOnPage) {
    fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json&p=${pageNumber}&ps=${objectsOnPage}`)
      .then(response => {
        response.json().then(data => {
          console.log('getCollection \n', data);
          this.setState({
            artObjects: data.artObjects,
            count: data.count,
            pageNumber: pageNumber,
            objectsOnPage:  objectsOnPage
          });
        })
      })
      .catch(error => console.log(error)); 
  }

  getAllMatches(query) {
    fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json&p=1&ps=${this.state.objectsOnPage}&q=${query}`)
      .then(response => {
        response.json().then(data => {
          console.log('getAllMatches \n', data);
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

  render() {
    let numberArtObjectsFrom = this.state.objectsOnPage * this.state.pageNumber - this.state.objectsOnPage + 1,
        numberArtObjectsTo = this.state.objectsOnPage * this.state.pageNumber,
        count = this.state.count > 10000 ? 10000 : this.state.count;
    return (
      <div className="main-page" >
        <div className="top">
          <input type="text" plaseholder="Search for..." onChange={ this.handleChange.bind(this) } className="top__search"/>
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
              count={ this.state.count }
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

            // <button onClick={ () => this.getCollection(1, 10) } className="main-page__btn">10</button>
            // <button onClick={ () => this.getCollection(1, 20) } className="main-page__btn">20</button>
            // <button onClick={ () => this.getCollection(1, 50) } className="main-page__btn">50</button>
            // <button onClick={ () => this.getCollection(1, 100) } className="main-page__btn">100</button>
