import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { SiLinkedin } from 'react-icons/si';
import './registration.css';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [specialCharacterError, setSpecialCharacterError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [emailInUseError, setEmailInUseError] = useState(false);
  const history = useHistory();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError(null);

    // Reset error states
    setEmptyEmailError(false);
    setEmptyPasswordError(false);
    setPasswordLengthError(false);
    setSpecialCharacterError(false);
    setInvalidEmailError(false);
    setEmailInUseError(false);

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

    // Check password length
    if (password.length < 6) {
      setPasswordLengthError(true);
      return;
    }

    // Check for special characters in the password
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacters.test(password)) {
      setSpecialCharacterError(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Registration successful
      console.log(userCredential.user);
      history.push('/'); // Redirect to App.js
    } catch (error) {
      // Registration failed
      switch (error.code) {
        case 'auth/invalid-email':
          setInvalidEmailError(true);
          break;
        case 'auth/email-already-in-use':
          setEmailInUseError(true);
          break;
        default:
          setError(error.message);
          break;
      }
    }
  };

  const handleCancel = () => {
    history.push('/'); // Redirect to App.js
  };

  return (
    <div>
      <Link to="/" className="logo">
          Happy Hour Movie App
        </Link>
      <h2 className="reg-header">Registration</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label className="reg-label">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emptyEmailError && <p className="error-message">Email should not be empty.</p>}
          {invalidEmailError && <p className="error-message">Invalid email address.</p>}
          {emailInUseError && <p className="error-message">Email is already in use.</p>}
        </div>
        <div>
          <label className="reg-label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {emptyPasswordError && <p className="error-message">Password should not be empty.</p>}
          {passwordLengthError && (
            <p className="error-message">Password should be at least 6 characters long.</p>
          )}
          {specialCharacterError && (
            <p className="error-message">Password should include at least one special character.</p>
          )}
          {password && password.length >= 6 && (
            <p className="password-strength">
              Password strength: {password.length >= 10 ? 'Strong' : 'Moderate'}
            </p>
          )}
        </div>
        <div className='reg-container'>
          <button className="reg" type="submit">
            Register
          </button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}

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

export default RegistrationPage;

