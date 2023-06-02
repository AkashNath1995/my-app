import React, { useState } from 'react';
import './GenreList.css';

const GenreList = ({ genres, handleGenreSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleButtonClick = (genre) => {
    handleGenreSelect(genre);
    setSelectedGenre(genre.id);
  };

  return (
    <div className='genre-list'>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleButtonClick(genre)}
          className={`genre ${selectedGenre === genre.id ? 'selected' : ''}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
