// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcYD2xgwJyflJJTl9lqToozgE-U3AXC4I",
  authDomain: "codeword-verify.firebaseapp.com",
  projectId: "codeword-verify",
  storageBucket: "codeword-verify.firebasestorage.app",
  messagingSenderId: "1948017597",
  appId: "1:1948017597:web:28c3fbfd80cd9bda9e28d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
