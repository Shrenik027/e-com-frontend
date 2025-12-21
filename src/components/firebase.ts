// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh4QhzW3NztHRxSgh0PBxdi4dJ6RtUxHI",
  authDomain: "ecom-c32ff.firebaseapp.com",
  projectId: "ecom-c32ff",
  storageBucket: "ecom-c32ff.firebasestorage.app",
  messagingSenderId: "206844937074",
  appId: "1:206844937074:web:b4056a25438a3a5eead3eb",
  measurementId: "G-KFEBDC2BLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
