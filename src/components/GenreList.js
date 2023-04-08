import React from 'react';
import './GenreList.css';

const GenreList = ({ genres, handleGenreSelect }) => {
  return (
    <div className='genre-list'>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreSelect(genre)}
          className='genre'
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
