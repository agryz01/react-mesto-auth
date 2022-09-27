import React from 'react';

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" />
      <a href='/sign-up' className='header__menu'>{props.link}</a>
    </header>
  );
}