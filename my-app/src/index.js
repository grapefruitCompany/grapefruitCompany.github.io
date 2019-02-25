import React from 'react';
import ReactDOM from 'react-dom';
import Number from './number';
import './index.css';

class TableUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  callToServer() {
    //Это функция активируется по нажатию на кнопку
    //Кнопка меняет свой стиль и становится disabled: none;
    //Этот метод делает запрос на сервер и в стейт добавляет данные
    //Если данные добавлены, другие элементы, таблицу
  }

  render() {

    return (
      <div>
        <Number />
        <button>
          Show users
        </button>        
      </div>

    );
  }
}


// ========================

ReactDOM.render(
  <TableUsers />,
  document.getElementById('root')
);
