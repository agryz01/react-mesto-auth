import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header(props) {
  let location = useLocation();
  const isPage = location.pathname === '/';
  const headerMenu = `${isPage ? 'header__exit' : 'header__menu'}`;

  return (
    <header className="header">
      <Link to='/' className="header__logo" />
      <div className='header__link-container'>
        <p className='header__email'>{props.email}</p>
        <Link to={props.link} onClick={props?.handleExit} className={headerMenu}>{props.menu}</Link>
      </div>
    </header>
  );
}