import React from 'react';
import ArtObjectItem from '../ArtObjectItem';
import Paginator from '../Paginator';
import OnPageButtons from '../OnPageButtons';
import SelectFilter from '../SelectFilter';
import './style.scss';
import '../../Styles/main.scss';

//Search by maker doesn't work at all: https://github.com/Rijksmuseum/api-issues/issues/11

//Todo List for release version
// SelectFilter:
// - Убрать повторения в массиве цветов

// MainPage:
// - Добавить чекбокс, отображать или не отоюражать объекты без картинок

// Везде: 
// - добавить комментарии
// - добавить везде адаптацию под планшет и мобайл
// - проверить везде стили и код

// =>> deploy on github pages

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        tag: '',
        value: ''
      },
      artObjects: [],
      count: null,
      pageNumber: 1,
      objectsOnPage: 5,
      baseUrl: 'https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json',
      lastUrl: 'https://www.rijksmuseum.nl/api/nl/collection?key=E7u3uumr&format=json',
      type: [],
      datingPeriod: [],
      material: [],
      technique: [],
      normalized32Colors: []
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.matchingUrlAndFilter(this.props.location.state.tag, this.props.location.state.value);
    } else {
      this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
    }
  }

  matchingUrlAndFilter(tag, value) {
    let currentUrl;
    switch (tag) {
      case ('normalized32Colors'):
        value = value.match(/\w*/g).join('');
        currentUrl = this.state.baseUrl + '&f.normalized32Colors.hex=%23' + value;
        this.setState({
          filter: {
            tag: 'normalized32Colors',
            value: value
          }
        });
        this.getFilter(currentUrl);
        break;
      case ('type'):
        currentUrl = this.state.baseUrl + '&type=' + value;
        this.setState({
          filter: {
            tag: 'type',
            value: value
          }
        });
        this.getFilter(currentUrl);
        break;
      case ('datingPeriod'):
        currentUrl = this.state.baseUrl + '&f.dating.period=' + value;
        this.setState({
          filter: {
            tag: 'datingPeriod',
            value: value
          }
        });
        this.getFilter(currentUrl);
        break;
      case ('material'):
        currentUrl = this.state.baseUrl + '&material=' + value;
        this.setState({
          filter: {
            tag: 'material',
            value: value
          }
        });
        this.getFilter(currentUrl);
        break;
      case ('technique'):
        currentUrl = this.state.baseUrl + '&technique=' + value;
        this.setState({
          filter: {
            tag: 'technique',
            value: value
          }
        });
        this.getFilter(currentUrl);
        break;
      default:
        console.log('Error!\n', this.props.location.state.tag, '\n No match!');
        this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
    }
  }

  getFilter(currentUrl) {
    this.setState({
      lastUrl: currentUrl,
      pageNumber: 1
    });
    fetch(`${currentUrl}&p=${this.state.pageNumber}&ps=${this.state.objectsOnPage}`)
      .then(response => {
        response.json()
        .then(data => {
          this.setState({
            artObjects: data.artObjects,
            count: data.count,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            material: data.facets[4].facets,
            technique: data.facets[5].facets,
            normalized32Colors: data.facets[6].facets
          });
        })
      })
  }

  getCollection(pageNumber, objectsOnPage = this.state.objectsOnPage) {
    let currentUrl = this.state.lastUrl;
    fetch(`${currentUrl}&p=${pageNumber}&ps=${objectsOnPage}`)
      .then(response => {
        response.json().then(data => {
          this.setState({
            artObjects: data.artObjects,
            count: data.count,
            pageNumber: pageNumber,
            objectsOnPage:  objectsOnPage,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            material: data.facets[4].facets,
            technique: data.facets[5].facets,
            normalized32Colors: data.facets[6].facets
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
            count: data.count,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            material: data.facets[4].facets,
            technique: data.facets[5].facets,
            normalized32Colors: data.facets[6].facets
          });
        })
      })
      .catch(error => console.log(error)); 
  }

  handleChange(e) {
    if (e.target.value && e.target.value.length > 1) {
      this.getAllMatches(e.target.value);
    } else if (e.target.value.length === 0) {
    this.getAllMatches('');
    }
  }

  reset() {
    this.getAllMatches('');
  }

  render() {
    let count = this.state.count > 10000 ? 10000 : this.state.count,
        numberArtObjectsFrom = this.state.objectsOnPage * this.state.pageNumber - this.state.objectsOnPage + 1,
        numberArtObjectsTo = (numberArtObjectsFrom + this.state.objectsOnPage) > count ? count : (this.state.objectsOnPage * this.state.pageNumber);
    return (
      <div className="main-page" >
        <form className="main-page__form">
          <SelectFilter
            filter={ this.state.filter }
            data={ this.state }
            matchingUrlAndFilter={ this.matchingUrlAndFilter.bind(this) }
          />
          <div className="main-page__search">
            <input
              id="search"
              type="text"
              onChange={ this.handleChange.bind(this) }
              className="main-page__search-input"
              placeholder="Search for..."
            />
            <span className="main-page__search-border"></span>
          </div>
          <button className="main-page__reset" type="reset" value="reset" onClick={ this.reset.bind(this) }>Reset</button>
        </form>
        
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