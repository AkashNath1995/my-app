import React, { useState } from 'react';
import './CheckOut.css';

function CheckoutPage({ movieName, ticketPrice, bookedSeat }) {
  const [numTickets, setNumTickets] = useState(bookedSeat);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit'); // Default to credit card
  const convenienceFeeRate = 0.0175; // 1.75%
  const convenienceFee = bookedSeat * ticketPrice * convenienceFeeRate;
  const subtotal = bookedSeat * ticketPrice + convenienceFee;

  // State for credit/debit card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // State for UPI ID
  const [upiId, setUpiId] = useState('');
  const [isUpiValid, setIsUpiValid] = useState(true); // UPI ID validation flag

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

    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (cardNumber.length < 16) {
        alert('Card number must be at least 16 characters.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.includes('@')) {
        setIsUpiValid(false);
        return;
      }
    }

    setIsPaymentSubmitted(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      return (
        <div>
          <label>
            {paymentMethod === 'credit' ? 'Credit' : 'Debit'} Card Number:
            <input
              type="text"
              required
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label>
            Expiration Date:
            <input
              type="date"
              required
              value={cardExpiration}
              onChange={(e) => setCardExpiration(e.target.value)}
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              required
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
            />
          </label>
        </div>
      );
    } else if (paymentMethod === 'upi') {
      return (
        <div>
          <label>
            UPI ID:
            <input
              type="text"
              required
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setIsUpiValid(e.target.value.includes('@'));
              }}
              style={{
                borderColor: isUpiValid ? 'initial' : 'red',
              }}
            />
          </label>
          {!isUpiValid && (
            <p className="error-message">UPI ID must contain '@' symbol.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <section>
        <h2>Summary</h2>
        <p>Movie: {movieName}</p>
        <p>Price per ticket: ₹{ticketPrice.toFixed(2)}</p>
        <label>
          Number of tickets:
          <input
            type="number"
            value={numTickets}
            onChange={handleNumTicketsChange}
            min="1"
          />
        </label>
        <p>Convenience fee: ₹{convenienceFee.toFixed(2)}</p>
        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
      </section>

      <section>
        <h2>Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <label>
            Payment method:
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="credit">Credit card</option>
              <option value="debit">Debit card</option>
              <option value="upi">UPI</option>
            </select>
          </label>

          {renderPaymentForm()} {/* Render the appropriate payment form */}
          
          <button type="submit">Pay ₹{subtotal.toFixed(2)}</button>
        </form>
      </section>

      {isPaymentSubmitted && (
        <div className="popup">
          <p className="success-message">
            Thank you for purchasing {numTickets} ticket(s) of {movieName}!
          </p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
