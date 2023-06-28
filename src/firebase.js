// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
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

const auth=getAuth();

export { app, auth };