import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import { default as ContentStyles } from './Content.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import Courses from '../Courses/Courses';
import UserCourses from '../UserCourses/UserCourses';

import { ADMIN_TYPE } from '../../consts/userTypes';

const style = bemCssModules(ContentStyles);

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;


  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Courses />} />
        {isUserLogged && <Route exact path="/my-courses" render={() => <UserCourses />} />}
        {isAdmin && <Route exact path="/manage-courses" render={() => <p>MZarządzanie kursami</p>} />}
        <Redirect to="/" />
      </Switch>
    </main>
  );
}

export default Content;