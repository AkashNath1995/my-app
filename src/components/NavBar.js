import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
  return (
       <Link to="/">
        <img src="/logo.png" alt="Logo" />
      </Link> 
  );
}

export default NavBar;
