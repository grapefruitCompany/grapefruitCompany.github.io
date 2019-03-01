import React from 'react';
import './style.scss';
import '../../Styles/main.scss';

class Paginator extends React.Component {
  render() {
    let showPageNumbers = () => {
      let {pageNumber, objectsOnPage, getCollection, count} = this.props,
          totalPages = Math.ceil(count / objectsOnPage),
          result = [];

      if (pageNumber === 1) {
        result.push(
          <button className="paginator__item paginator__item--disabled" key={ 0 }>
            &#8592;
          </button>
        );
      } else {
        result.push(
          <button onClick={ () => getCollection(pageNumber - 1) } className="paginator__item" key={ 0 }>
            &#8592;
          </button>
        );
      }

      for (let i = 1; i <= totalPages; i++) {
        let markup = (
              <button onClick={ () => getCollection(i) } className="paginator__item" key={ i }>
                { i }
              </button>
            );
  
        switch(true) {
          case (i === pageNumber):
            markup = (
              <button className="paginator__item  paginator__item--current" key={ i }>
                { i }
              </button>
            );
            break;
          case (i === 1|| i === 2 || i === (totalPages - 1) || i === totalPages):
          case (Math.abs(pageNumber - i) === 2 && pageNumber === totalPages):
          case (Math.abs(pageNumber - i) === 2 && pageNumber === 1):
          case (Math.abs(pageNumber - i) === 1):
            break;
          case (Math.abs(pageNumber - i) === 2):
          case (pageNumber === 1 && Math.abs(pageNumber - i) === 3):
          case (pageNumber === totalPages && Math.abs(pageNumber - i) === 3):
            markup = (
              <button className='paginator__dots' key={ i }>
                ...
              </button>
              );
            break;
          default:
            markup = '';
            break;
        }
      result.push(markup);  
      }
  
      if (pageNumber === totalPages) {
        result.push(
          <button className="paginator__item paginator__item--disabled" key={ result.length + 1 }>
            &#8594;
          </button>
        );
      } else {
        result.push(
          <button onClick={ () => getCollection(pageNumber + 1) } className="paginator__item" key={ result.length + 1 }>
            &#8594;
          </button>
        );
      }

      return result;
    }

    return (
      <div className="paginator">
        { showPageNumbers() }
      </div>
    )
  }
}

export default Paginator;
