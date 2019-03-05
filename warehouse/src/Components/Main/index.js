import React from 'react';
import './style.scss';
import '../../Styles/main.scss';

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

  showGoods() {
    console.log(this.state.goods);
  }

  render() {
    
    const showGoodsGroups = (list) => {
      const result = [];
      if (list) {
        for (let i = 0; i < list.length; i++) {
          let styling = { 'marginLeft':  list[i].level * 10 + 'px'};
          if (list[i].children) {
            result.push(
              <li
                className="main__item"
                style={ styling }
                key={ i }
              >
                <input
                  type="checkbox" 
                  id={ list[i].guid } 
                  className="main__cbx"
                />
                <label htmlFor={ list[i].guid } onClick={ this.showGoods.bind(this) }>{ list[i].name }</label>
                { showGoodsGroups(list[i].children) }
              </li>
            );
          } else {
            result.push(
              <li
                className="main__item"
                style={ styling }
                key={ i }
                onClick={ this.showGoods.bind(this) }
              >
                { list[i].name }
              </li>
            );
          }
        }
      return (<ul className="main__list">{ result }</ul>);
      }
    };

    return (
      <div className="main">
        { showGoodsGroups(this.state.goodsgroups) }
      </div>
    )
  }
}

export default Main;