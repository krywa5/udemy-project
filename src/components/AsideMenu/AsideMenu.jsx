import React, { useContext } from 'react';
import bemCssModule from 'bem-css-modules';

import { default as AsideMenuStyles } from './AsideMenu.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';

const style = bemCssModule(AsideMenuStyles);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent = user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null; // zastosowanie optional chainingu

  return (
    <section className={style()}>
      <UserMenu isUserLogged={Boolean(user)} />
      {adminMenuComponent}
    </section>
  );
}

export default AsideMenu;
