import React, { useContext } from 'react';
import bemCssModule from 'bem-css-modules';

import { default as AsideMenuStyles } from './AsideMenu.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';

import { ADMIN_TYPE } from '../../consts/userTypes';

const style = bemCssModule(AsideMenuStyles);

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent = user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null; // zastosowanie optional chainingu

  return (
    <section className={style()}>
      <div className={style('nav-wrapper')}>
        <UserMenu isUserLogged={Boolean(user)} />
        {adminMenuComponent}
      </div>
    </section>
  );
}

export default AsideMenu;
