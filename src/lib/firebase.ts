// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Hardcoded configuration for immediate deployment fix
const firebaseConfig = {
  apiKey: "AIzaSyCF4rgLCUAmWQ1MWoeALxGnF2tkmtej-eM",
  authDomain: "eiko-colors.firebaseapp.com",
  projectId: "eiko-colors",
  storageBucket: "eiko-colors.firebasestorage.app",
  messagingSenderId: "37282779527",
  appId: "1:37282779527:web:3117c0ace85f7bfbb64322",
  measurementId: "G-V9XSJ0S2DY",
  databaseURL: "https://eiko-colors-default-rtdb.firebaseio.com"
};

// Console log removed to avoid leaking info, validation removed as values are hardcoded


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Initialize Analytics conditionally (only in browser)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
