import React, { useContext } from 'react';
import bemCssModule from 'bem-css-modules'

import { default as CourseStyles } from './Course.module.scss';
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router-dom';

const style = bemCssModule(CourseStyles);

const Course = ({ authors, img, price, title, id, isUserContext = false }) => {
  const { user, setUser } = useContext(StoreContext);
  const history = useHistory();

  const allAuthors = authors.join(", ");
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id,
        }
      );

      if (status === 202) {
        setUser(data.user);
        // redirect to my courses
        history.push('/my-courses');
      }

    } catch (err) {
      console.warn(err);
    }
  };

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img src={img} alt="title" className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && <button onClick={handleOnClick}>Zakup ten kurs</button>}
      </article>
    </li>
  );
}

export default Course;