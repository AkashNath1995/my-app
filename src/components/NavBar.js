import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
  return (
       <Link to="/">
        <img src="https://thumbs.dreamstime.com/b/movie-icon-film-flap-sticker-dark-background-movie-icon-film-flap-sticker-dark-background-simple-vector-icon-117431578.jpg" alt="Logo" />
      </Link> 
  );
}

export default NavBar;
