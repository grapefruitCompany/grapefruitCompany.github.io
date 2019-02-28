import * as React from 'react';
import './style.scss';
import Title from '../Title';

const Page404 = () => (
  <section className="error-container">
    <div className="error-container__title">
      <Title title="Page is not found!"/>
    </div>
    <span>4</span>
    <span><span className="screen-reader-text">0</span></span>
    <span>4</span>
  </section>
);

export default Page404;