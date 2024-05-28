import React from 'react';
import { Link } from 'react-router-dom';
import "../style/NavigationBar.css";
import logo from "../assets/logo.png";
import { useRef } from 'react';

function NavigationBar({isAuthenticated}) {
  const contactRef = useRef(null);

  const handleContactClick = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });

  };
  const username = localStorage.getItem('username');


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
              {isAuthenticated && <li><Link to="/my-recipes">My profile</Link></li>}
              {isAuthenticated && <li><Link to="/add-recipe">add recipe</Link></li>}
              {isAuthenticated && <li><Link to="/edit-recipe/:id">edit recipe</Link></li>}

              
              {isAuthenticated && <li>{username}</li>}




            </ul>
          </nav>
        </div>
        <div className="auth-buttons">
        {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/signup"><button>Signup</button></Link>}
        </div>
        <nav>
        
        </nav>
      </div>
   
    </header>
  );
}

export default NavigationBar;
