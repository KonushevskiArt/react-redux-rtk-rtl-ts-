import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.module.scss';

const Header = () => {
  return (
    <nav className={style.navigation} data-testid="header">
      <NavLink data-testid="to-home" className={style.link} to="/home">
        Home
      </NavLink>
      <NavLink data-testid="to-about" className={style.link} to="about">
        About
      </NavLink>
      <NavLink data-testid="to-form" className={style.link} to="form">
        Form
      </NavLink>
    </nav>
  );
};

export default Header;
