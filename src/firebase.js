// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_hTjNUqToipYmPnEQXxHh7f6kv_fkUB8",
  authDomain: "bakery-feedback.firebaseapp.com",
  projectId: "bakery-feedback",
  storageBucket: "bakery-feedback.firebasestorage.app",
  messagingSenderId: "957453002949",
  appId: "1:957453002949:web:06e1ec099d8944feb9e8ac",
  measurementId: "G-26DB391GDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);
