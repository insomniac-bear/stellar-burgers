import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {
  return(
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.wrapper}>
          <menu className={`${appHeaderStyles.navList} pt-4 pb-4`}>
            <li className={`${appHeaderStyles.navItem} pt-4 pr-5 pb-4 pl-5`}>
              <a href='/#' className={`${appHeaderStyles.linkActive} text text_type_main-default`}>
                <BurgerIcon type='primary' />
                <span className='ml-2'>Конструктор</span>
              </a>
            </li>
            <li className={`${appHeaderStyles.navItem} pt-4 pr-5 pb-4 pl-5 ml-2`}>
              <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
                <ListIcon type='secondary' />
                <span className='ml-2'>Лента заказов</span>
              </a>
            </li>
          </menu>
          <Logo />
        </div>
        <div className='pt-4 pr-5 pb-4 pl-5'>
          <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
            <ProfileIcon type='secondary'/>
            <span className='ml-2'>Личный кабинет</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;