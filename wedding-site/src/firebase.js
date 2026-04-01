import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrkuax3jesZIj2Gs6VwhBGbBGSYnvAufM",
  authDomain: "wedding-site-64693.firebaseapp.com",
  projectId: "wedding-site-64693",
  storageBucket: "wedding-site-64693.firebasestorage.app",
  messagingSenderId: "414634472934",
  appId: "1:414634472934:web:f8be9ded75e8b2287f5227",
  measurementId: "G-N7279NMRMD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);