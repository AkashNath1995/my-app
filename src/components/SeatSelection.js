import React, { useState } from 'react';
import SeatMap from './SeatMap';
import CheckoutPage from '../CheckOut';
import './SeatSelection.css';

const SeatSelection = ({ movie, handleClose }) => {
  const { title, seats, ticketPrice } = movie;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleSeatSelect = (rowIndex, seatIndex) => {
    const seat = { rowIndex, seatIndex };
    setSelectedSeats(prevSelectedSeats => {
      const seatExists = prevSelectedSeats.some(
        prevSeat => prevSeat.rowIndex === rowIndex && prevSeat.seatIndex === seatIndex
      );
      if (seatExists) {
        return prevSelectedSeats.filter(
          prevSeat => prevSeat.rowIndex !== rowIndex || prevSeat.seatIndex !== seatIndex
        );
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handleBookNow = () => {
    setShowCheckout(true);
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
  };

  return (
    <div className="seat-selection">
      <h2>{title} - Select Seats</h2>
      <SeatMap seats={seats} selectedSeats={selectedSeats} handleSeatSelect={handleSeatSelect} />
      <div className="button-container">
        <button onClick={handleClose}>Cancel</button>
        <button disabled={selectedSeats.length === 0} onClick={handleBookNow}>Pay Now</button>
      </div>
      {showCheckout && <CheckoutPage movieName={title} ticketPrice={ticketPrice} onCancel={handleCheckoutCancel} />}
    </div>
  );
};

export default SeatSelection;
