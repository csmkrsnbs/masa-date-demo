// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxCRDUbtpfcWGKo9x7vi8ppu5QbAGUKN4",
  authDomain: "dateapp-6f1ec.firebaseapp.com",
  projectId: "dateapp-6f1ec",
  storageBucket: "dateapp-6f1ec.firebasestorage.app",
  messagingSenderId: "466165355908",
  appId: "1:466165355908:web:51454fefe45fdeed9cf9d1",
  measurementId: "G-PQSNLY5EQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);