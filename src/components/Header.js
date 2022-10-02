import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <Link to='/' className="header__logo" />
      <div className='header__link-container'>
        <p className='header__email'>{props.email}</p>
        <Link to={props.link} className='header__menu'>{props.menu}</Link>
      </div>
    </header>
  );
}