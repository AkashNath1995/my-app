import { useState } from 'react';

function CheckoutPage({ movieName, ticketPrice }) {
  const [numTickets, setNumTickets] = useState(1);
  const convenienceFeeRate = 0.0175; // 1.75%
  const convenienceFee = numTickets * ticketPrice * convenienceFeeRate;
  const subtotal = numTickets * ticketPrice + convenienceFee;

  const handleNumTicketsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (Number.isNaN(value)) {
      setNumTickets(1);
    } else {
      setNumTickets(Math.max(value, 1));
    }
  };

  return (
    <div>
      <section>
        <h2>Summary</h2>
        <p>Movie: {movieName}</p>
        <p>Price per ticket: ${ticketPrice.toFixed(2)}</p>
        <label>
          Number of tickets:
          <input type="number" value={numTickets} onChange={handleNumTicketsChange} min="1" />
        </label>
        <p>Convenience fee: ${convenienceFee.toFixed(2)}</p>
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      </section>

      <section>
        <h2>Payment</h2>
        <form>
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
              <option value="paypal">PayPal</option>
            </select>
          </label>
          <button type="submit">Pay ${subtotal.toFixed(2)}</button>
        </form>
      </section>
    </div>
  );
}

export default CheckoutPage;
