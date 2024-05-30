import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.clear();

    onLogout();

    navigate('/');
  }, [onLogout, navigate]);

  return null; 
};

export default Logout;