import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {
  const location = useLocation();
  console.log(location);

  return(
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.wrapper}>
          <menu className={`${appHeaderStyles.navList} pt-4 pb-4`}>
            <li className={`${appHeaderStyles.navItem} pt-4 pr-5 pb-4 pl-5`}>
              <NavLink
                to='/'
                className={`${appHeaderStyles.link} text text_type_main-default`}
                activeClassName={`${appHeaderStyles.linkActive} text text_type_main-default`}
              >
                <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                <span className='ml-2'>Конструктор</span>
              </NavLink>
            </li>
            <li className={`${appHeaderStyles.navItem} pt-4 pr-5 pb-4 pl-5 ml-2`}>
              <NavLink
               to='/order-list'
                className={`${appHeaderStyles.link} text text_type_main-default`}
                activeClassName={`${appHeaderStyles.linkActive} text text_type_main-default`}
              >
                <ListIcon type={location.pathname === '/order-list' ? 'primary' : 'secondary'} />
                <span className='ml-2'>Лента заказов</span>
              </NavLink>
            </li>
          </menu>
          {
            location.pathname !== '/'
              ? <Link to="/" className={appHeaderStyles.logoLink}><Logo /></Link>
              : <Logo />
          }
        </div>
        <div className='pt-4 pr-5 pb-4 pl-5'>
          <NavLink
            to='/profile'
            className={`${appHeaderStyles.link} text text_type_main-default`}
            activeClassName={appHeaderStyles.linkActive}
            >
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <span className='ml-2'>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;