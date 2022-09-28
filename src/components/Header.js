import React from 'react';

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" />
      <a href={props.link} className='header__menu'>{props.menu}</a>
    </header>
  );
}