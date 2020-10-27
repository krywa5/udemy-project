import React from 'react';
import bemCssModule from 'bem-css-modules'

import { default as CourseStyles } from './Course.module.scss';

const style = bemCssModule(CourseStyles);

const Course = ({ authors, img, price, title }) => {
  const allAuthors = authors.join(", ");

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img src={img} alt="title" className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
      </article>
    </li>
  );
}

export default Course;