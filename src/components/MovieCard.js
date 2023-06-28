import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, handleMovieClick, handleAddToFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent container
    setIsFavorite(!isFavorite);
    handleAddToFavorites(movie);
  };

  return (
    <div className='movie-card' onClick={() => handleMovieClick(movie)}>
      {isFavorite ? (
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <i className="fas fa-heart"></i>
        </div>
      ) : (
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <i className="far fa-heart"></i>
        </div>
      )}
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
