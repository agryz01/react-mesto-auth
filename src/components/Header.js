import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header(props) {
  let location = useLocation();
  const isPage = location.pathname === '/';
  const isLogin = location.pathname === '/sign-in';

  const linkСontainer = `header__link-container ${isPage && 'header__link-container_active'}`;
  const headerMenu = `header__menu ${!isPage && 'header__menu_active'}`;

  return (
    <header className="header">
      <Link to='/' className="header__logo" />
      <div className={linkСontainer}>
        <p className='header__email'>{props.email}</p>
        <p onClick={props.handleExit} className='header__exit'>Выйти</p>
      </div>
      <Link to={isLogin ? '/sign-up' : '/sign-in'} className={headerMenu}>{isLogin ? 'Регистрация' : 'Войти'}</Link>
    </header>
  );
}