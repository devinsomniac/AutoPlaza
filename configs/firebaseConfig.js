// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auto-plaza-8c332.firebaseapp.com",
  projectId: "auto-plaza-8c332",
  storageBucket: "auto-plaza-8c332.appspot.com",
  messagingSenderId: "314230386248",
  appId: "1:314230386248:web:ef5ee5d7bb3fe2cb26327d",
  measurementId: "G-JDF336NDSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)