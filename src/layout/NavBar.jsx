import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className='nav'>
      <ul className='nav-list'>
        <li>
          <NavLink to="/food-recipe">Food Recipe</NavLink>
        </li>
        <li className='auth-links'>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li className='auth-links'>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className='auth-links'>
          <NavLink to="/addrecipe">add</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
