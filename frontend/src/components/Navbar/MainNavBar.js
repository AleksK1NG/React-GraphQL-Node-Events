import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import './MainNavBar.css';

const MainNavBar = (props) => {
  const { token, userId, login, logOut } = useContext(AuthContext);
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {token && (
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavBar;
