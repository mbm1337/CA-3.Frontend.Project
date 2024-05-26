import React from 'react';
import { Link } from 'react-router-dom';
import "../style/NavigationBar.css";
import  logo from "../assets/logo.png"
import { useRef } from 'react';
function NavigationBar() {

  const contactRef = useRef(null);

  const handleContactClick = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header" id='header'>
    <div className="header-content">
      <div className='left-nav'>
        <div className="logo">
          <Link to="/"> <img src={logo} alt="Logo" /> </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/food-recipe">FOOD RECIPES</Link></li>
            <li><span onClick={handleContactClick}>CONTACT US</span></li>

          </ul>
        </nav>
      </div>
      <div className="auth-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup"><button>Signup</button></Link>

      </div>
     
    </div>
  </header>
  );
}

export default NavigationBar;
