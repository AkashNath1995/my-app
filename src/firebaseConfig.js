// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcR6ERZ9JfFCKVpql5Q5iG_lNCGw9v15c",
  authDomain: "happy-hour-movie-booking.firebaseapp.com",
  projectId: "happy-hour-movie-booking",
  storageBucket: "happy-hour-movie-booking.appspot.com",
  messagingSenderId: "431283345802",
  appId: "1:431283345802:web:f896933329bfc4ffa39073",
  measurementId: "G-PGZK6NCY6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);