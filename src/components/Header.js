import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <Link to='/' className="header__logo"></Link>
      <Link to={props.link} className='header__menu'>{props.menu}</Link>
    </header>
  );
}