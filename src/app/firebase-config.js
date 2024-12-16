// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBCGRPJO_Mk6xbXQpjo2yP1l61dHTIak3w",
  authDomain: "eventrise-56a5f.firebaseapp.com",
  projectId: "eventrise-56a5f",
  storageBucket: "eventrise-56a5f.firebasestorage.app",
  messagingSenderId: "324771359592",
  appId: "1:324771359592:web:f3d56ae548bd42ee2144dd",
  measurementId: "G-QGZSM7JS3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}