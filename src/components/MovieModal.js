import React, { useEffect, useState } from 'react';
import './MovieModal.css';
import SeatSelection from './SeatSelection';

const MovieModal = ({ movie, handleClose }) => {
  const { title, overview, poster_path, seats } = movie;
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleBookNow = () => {
    setShowSeatSelection(true);
  };

  useEffect(() => {
    // Add the modal-open class to the body when the modal is open
    document.body.classList.add('modal-open');

    return () => {
      // Remove the modal-open class from the body when the modal is closed
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className='modal-overlay' onClick={handleClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`${title} Poster`}
        />
        <div className='modal-info'>
          <h2>{title}</h2>
          <p>{overview}</p>
          <button onClick={handleBookNow}>Book Now</button>
        </div>
        <button className='modal-close' onClick={handleClose}>
          X
        </button>
        {showSeatSelection && (
        <SeatSelection movie={movie} handleClose={() => setShowSeatSelection(false)} />
      )}
      </div>
      
    </div>
  );
};

export default MovieModal;
