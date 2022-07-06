// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDEVcd8EYRQnlBp0vfm1qwFxbWlDUbJ9s",
  authDomain: "hall-of-death-805df.firebaseapp.com",
  projectId: "hall-of-death-805df",
  storageBucket: "hall-of-death-805df.appspot.com",
  messagingSenderId: "338799898331",
  appId: "1:338799898331:web:26b0cdd4107f652d3126fe",
  measurementId: "G-C1KW2QK0Y6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
