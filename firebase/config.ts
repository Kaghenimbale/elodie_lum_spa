// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBno9iqnlAASnee28Ki1bOEgUEzO7YSAhA",
  authDomain: "next-auth-887a3.firebaseapp.com",
  projectId: "next-auth-887a3",
  storageBucket: "next-auth-887a3.firebasestorage.app",
  messagingSenderId: "130174098086",
  appId: "1:130174098086:web:360e957b7799e075a97267",
  measurementId: "G-EGK4YEZKE3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth, googleProvider };
