import React, { useEffect, useState } from 'react';
import './MovieModal.css';
import SeatSelection from './SeatSelection';

const MovieModal = ({ movie, handleCloseModal }) => {
  const { title, overview, poster_path } = movie;
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleBookNow = () => {
    setShowSeatSelection(true);
  };

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`${title} Poster`}
        />
        <div className="modal-info">
          <h2>{title}</h2>
          <p>{overview}</p>
          <button onClick={handleBookNow}>Book Now</button>
        </div>
        {showSeatSelection && (
          <SeatSelection movie={movie} handleClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default MovieModal;
