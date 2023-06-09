import React, { useState } from 'react';
import './CheckOut.css';

function CheckoutPage({ movieName, ticketPrice, bookedSeat }) {
  const [numTickets, setNumTickets] = useState(1);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const convenienceFeeRate = 0.0175; // 1.75%
  const convenienceFee = bookedSeat * ticketPrice * convenienceFeeRate;
  const subtotal = bookedSeat * ticketPrice + convenienceFee;

  const handleNumTicketsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (Number.isNaN(value)) {
      setNumTickets(1);
    } else {
      setNumTickets(Math.max(value, 1));
    }
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setIsPaymentSubmitted(true);
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <section>
        <h2>Summary</h2>
        <p>Movie: {movieName}</p>
        <p>Price per ticket: ₹{ticketPrice.toFixed(2)}</p>
        <label>
          Number of tickets:
          <input type="number" value={numTickets} onChange={handleNumTicketsChange} min="1" />
        </label>
        <p>Convenience fee: ₹{convenienceFee.toFixed(2)}</p>
        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
      </section>

      <section>
        <h2>Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <label>
            First name:
            <input type="text" required />
          </label>
          <label>
            Last name:
            <input type="text" required />
          </label>
          <label>
            Email:
            <input type="email" required />
          </label>
          <label>
            Payment method:
            <select>
              <option value="credit">Credit card</option>
              <option value="debit">Debit card</option>
              <option value="upi">UPI</option>
            </select>
          </label>
          <button type="submit">Pay ₹{subtotal.toFixed(2)}</button>
        </form>
        
      </section>
      {isPaymentSubmitted && (
          <div className="popup">
            <p className="success-message">Thank you for purchasing {numTickets} ticket(s) of {movieName}!</p>
            
          </div>
        )}
    </div>
  );
}

export default CheckoutPage;
