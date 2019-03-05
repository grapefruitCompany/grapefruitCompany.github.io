import React from 'react';
import GoodsGroups from 'GoodsGroups';
import './style.scss';
import '../../Styles/main.scss';

//Search by maker doesn't work at all: https://github.com/Rijksmuseum/api-issues/issues/11

class Main extends React.Component {
  state = {
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('https://tanuhaua.github.io/datas-file-json/store/goods.json')
      .then(responce => {
        responce.json().then(responce => {
          let {goods, goodsgroups} = responce;
          this.setState({
            goods: goods,
            goodsgroups: goodsgroups
          });
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.goodsgroups);
    return (
      <div>
      <h1>Hoy</h1>
      </div>
    )
  }
}

export default Main;