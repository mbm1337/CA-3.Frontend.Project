import React from 'react';
import { Link } from 'react-router-dom';
import "../style/NavigationBar.css";
import logo from "../assets/logo.png";
import { useRef } from 'react';
import Logout from '../auth/Logout';

function NavigationBar({ isAuthenticated }) {
  const contactRef = useRef(null);

  const handleContactClick = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const username = localStorage.getItem('username');
  const roles = JSON.parse(localStorage.getItem('roles')) || [];

  return (
    <header className="header" id="header">
      <div className="header-content">
        <div className="left-nav">
          <div className="logo">
            <Link to="/"> <img src={logo} alt="Logo" /> </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/food-recipe">FOOD RECIPES</Link></li>
              <li><span onClick={handleContactClick}>CONTACT US</span></li>
              {isAuthenticated && <li><Link to="/my-recipes">My Profile</Link></li>}
              {isAuthenticated && <li><Link to="/add-recipe">Add Recipe</Link></li>}
              {isAuthenticated && roles.includes('admin') && <li><Link to="/admin">Admin</Link></li>}
            </ul>
          </nav>
        </div>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <div className="user-info">
              <span>{username}</span>
              <Link to="/logout">logout</Link>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup"><button>Signup</button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
