import React from 'react';
import ArtObjectItem from '../ArtObjectItem';
import Paginator from '../Paginator';
import OnPageButtons from '../OnPageButtons';
import ReactSelect from '../ReactSelect';
import './style.scss';
import '../../Styles/main.scss';

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
      principalMaker: [],
      type: [],
      datingPeriod: [],
      place: [],
      material: [],
      technique: [],
      normalized32Colors: []
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      switch (this.props.location.state.tag) {
        case ('color'):
          this.filterByColor(this.props.location.state.value);
          this.setState({
            filter: {
              tag: 'color',
              value: this.props.location.state.value
            }
          });
          break;
        default:
          console.log('Error!\n', this.props.location.state.tag, '\n No match!');
          this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
      }
    } else {
      this.getCollection(this.state.pageNumber, this.state.objectsOnPage);
    }
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
            principalMaker: data.facets[0].facets,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            place: data.facets[3].facets,
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
            principalMaker: data.facets[0].facets,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            place: data.facets[3].facets,
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

  filterByColor(query) {
    query = query.match(/\w*/g).join('');
    let currentUrl = this.state.baseUrl + '&f.normalized32Colors.hex=%23' + query;
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
            principalMaker: data.facets[0].facets,
            type: data.facets[1].facets,
            datingPeriod: data.facets[2].facets,
            place: data.facets[3].facets,
            material: data.facets[4].facets,
            technique: data.facets[5].facets,
            normalized32Colors: data.facets[6].facets
          });
        })
      })
  }

  render() {
    // console.log(this.state);
    let count = this.state.count > 10000 ? 10000 : this.state.count,
        numberArtObjectsFrom = this.state.objectsOnPage * this.state.pageNumber - this.state.objectsOnPage + 1,
        numberArtObjectsTo = (numberArtObjectsFrom + this.state.objectsOnPage) > count ? count : (this.state.objectsOnPage * this.state.pageNumber);
    return (
      <div className="main-page" >
        <form className="main-page__form">
          <ReactSelect
            filter={ this.state.filter }
            colors={ this.state.normalized32Colors }
            filterByColor={ this.filterByColor.bind(this) }
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