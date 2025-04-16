// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD2eKYg2XPmRrYFL778pG9k1yje_iAx4g",
  authDomain: "web-assignment-semester-3-1.firebaseapp.com",
  projectId: "web-assignment-semester-3-1",
  storageBucket: "web-assignment-semester-3-1.firebasestorage.app",
  messagingSenderId: "241352888950",
  appId: "1:241352888950:web:7f41d97953813a232c8557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);