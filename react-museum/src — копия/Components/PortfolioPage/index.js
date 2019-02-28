import React from 'react';
import './style.scss';
import PPImagesItem from '../PPImagesItem';
import Title from '../Title';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      currentAmountOnPage: 6,
      filteredData: [],
      pressedTab: 'ALL',
    }
  }

  componentDidMount() {
    fetch('https://tanuhaua.github.io/datas-file-json/bhagaskara/portfolio.json')
      .then(response => response.json().then(response => this.setState({
          data: response,
          filteredData: response,
          isLoading: false,
        })
      ))
  }

  handleClick() {
    const {currentAmountOnPage} = this.state;
    if (currentAmountOnPage + 6 > this.state.filteredData.length) {
      this.setState({currentAmountOnPage: currentAmountOnPage + (this.state.filteredData.length - currentAmountOnPage)});
    } else {
      this.setState({currentAmountOnPage: currentAmountOnPage + 6});
    }
  }

  handleClickByFilter(type, event) {

    if (this.state.filteredData.length >= 6) {
      this.setState({currentAmountOnPage: 6});
    } else {
      this.setState({currentAmountOnPage: this.state.filteredData.length});
    }

    let filteredArray = [];
    this.state.data.map((item) => {
      if (item.type === type) {
        filteredArray.push(item);
      } else if (type === 'ALL') {
        filteredArray = this.state.data;
      }
      return filteredArray;
    });
    this.setState({filteredData: filteredArray, pressedTab: type});
  }



  render() {
    const tabsNameArray = [];
    const {data: dataArray, currentAmountOnPage} = this.state;
    dataArray.forEach((dataArrayItem) => {
      if (tabsNameArray.indexOf(dataArrayItem.type) === -1) {
        tabsNameArray.push(dataArrayItem.type);
      }
    });

    const addSixItems = () => {
      const sixItems = [];
      if (dataArray.length && currentAmountOnPage <= dataArray.length) {
        for (let i = 0; i < currentAmountOnPage; i++) {
          sixItems.push(<PPImagesItem key={i} title={dataArray[i].title} keywords={dataArray[i].keywords}
                                      alt={dataArray[i].title} src={dataArray[i].image}/>);
        }
      }
      return sixItems;
    };

    return (
      <section className="portfolio-page">
        <div className="portfolio-page__wrapper">
          <Title title="Our" titlePurple="portfolio"/>
          <ul className="portfolio-page__tabs">
            <li className={'portfolio-page__tabs-item ' + (this.state.pressedTab === 'ALL' ? 'portfolio-page__tabs-item--active' : '')} onClick={(event) => this.handleClickByFilter('ALL', event)}>All</li>
            {tabsNameArray.map((tabsNameArrayItem, i) => {
              return <li key={i} className={'portfolio-page__tabs-item ' + (this.state.pressedTab === tabsNameArrayItem ? 'portfolio-page__tabs-item--active' : '')}
              onClick={(event) => this.handleClickByFilter(tabsNameArrayItem, event)}>
                {tabsNameArrayItem}</li>
            })}
          </ul>

          <div className="portfolio-page__images">
            {addSixItems()}
          </div>
          {this.state.currentAmountOnPage !== this.state.filteredData.length ? <button className="portfolio-page__button" type="button" onClick={this.handleClick.bind(this)}>Watch more
          </button> : null}
        </div>
      </section>
    )
  }
}

export default PortfolioPage;