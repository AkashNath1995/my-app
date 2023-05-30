import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

const Login = ({ handleLogin, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the authentication here
    const isLoggedIn = handleLogin(email, password);

    // Reset form fields
    setEmail('');
    setPassword('');

    // Set wrongInput state based on authentication result
    setWrongInput(!isLoggedIn);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form">
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Login</button>
      )}

      {showForm && (
        <>
          <h2>Login</h2>
          {wrongInput && <p>Wrong email or password. Please try again.</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
