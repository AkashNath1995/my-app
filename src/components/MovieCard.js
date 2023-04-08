import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, handleMovieClick }) => {
  return (
    <div className='movie-card' onClick={() => handleMovieClick(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={`${movie.title} Poster`}
      />
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}</span>
      </div>
    </div>
  );
};

export default MovieCard;