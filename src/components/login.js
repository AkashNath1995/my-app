import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { SiLinkedin } from 'react-icons/si';
import './login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // Reset error states
    setEmptyEmailError(false);
    setEmptyPasswordError(false);

    // Check for empty email and password
    if (!email && !password) {
      setEmptyEmailError(true);
      setEmptyPasswordError(true);
      return;
    } else if (!email) {
      setEmptyEmailError(true);
      return;
    } else if (!password) {
      setEmptyPasswordError(true);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      console.log(userCredential.user);
      history.push('');
    } catch (error) {
      // Login failed
      if (error.code === 'auth/user-not-found') {
        setError('Email does not exist.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Wrong password.');
      } else {
        setError('Wrong user input');
      }
    }
  };

  const handleCancel = () => {
    history.push(''); // Redirect to app.js without login
  };

  return (
    <div>
      <Link to="/" className="logo">
          Happy Hour Movie App
        </Link>
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className="login-label">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emptyEmailError && <p className="error-message">Email should not be empty.</p>}
        </div>
        <div>
          <label className="login-label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {emptyPasswordError && <p className="error-message">Password should not be empty.</p>}
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='login-container'>
        <button className="login" type="submit">
          Login
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
        </div>
      </form>
      <p className="login-para">
        Don't have an account?{' '}
        <Link className="reg-link" to="/registration">
          <span className="registration-link">Register here</span>
        </Link>
      </p>

      <div className="footer">
      <footer>
        <div className="footer-icons">
          <FaFacebookF className="icon" />
          <AiOutlineInstagram className="icon" />
          <AiFillTwitterCircle className="icon" />
          <SiLinkedin className="icon" />
        </div>
        <p className='footer-para'>&copy; 2023 Movie App. All rights reserved.</p>
      </footer>
      </div>
    </div>

    
  );
}

export default LoginPage;
