import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
  return (
       <Link to="/">
        <img src="https://static.vecteezy.com/system/resources/previews/006/230/795/original/film-logo-initial-letter-h-movie-logo-design-template-element-eps10-vector.jpg" alt="Logo" />
      </Link> 
  );
}

export default NavBar;
