import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, handleMovieClick}) => {

  const handleClick = () => {
    handleMovieClick(movie);
  };

  return (
    <div className='movie-card' onClick={handleClick}>

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={`${movie.title} Poster`}
      />
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}/10</span>
        <p>Original Language: {movie.original_language}</p>
        <p>Released: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
