import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import your Firebase authentication instance

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Logout successful
      console.log('User logged out');
    } catch (error) {
      // Logout failed
      console.error(error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
