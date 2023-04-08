import React from 'react';
import './SeatMap.css';


const SeatMap = ({ seats, selectedSeats, handleSeatSelect,bookedSeat,setBookedSeat }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (seats[rowIndex][seatIndex] === 1) {
      handleSeatSelect(rowIndex, seatIndex);
    }
  };
  return (
    <div className="seat-map">
      {seats.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          <div className="seat-row-label">{alphabet[rowIndex]}</div>
          {row.map((seat, seatIndex) => (
            <button
              className={`seat ${seat === 1 ? 'available' : 'unavailable'} ${
                selectedSeats.some(
                  selectedSeat =>
                    selectedSeat.rowIndex === rowIndex &&
                    selectedSeat.seatIndex === seatIndex
                ) && 'selected'
              }`}
              key={seatIndex}
              onClick={(e) => {handleSeatClick(rowIndex, seatIndex)
                if(!e.target.className.includes("selected")){
                  setBookedSeat(bookedSeat+1)
                }else{
                  setBookedSeat(bookedSeat-1)
                }
              }}
            >
              {alphabet[rowIndex]}
              {seatIndex + 1}
            </button>
          ))}
        </div>
      ))}
      <div className="screen">
      <p>Screen</p>
    </div>
    </div>
    
  );
};

export default SeatMap;


