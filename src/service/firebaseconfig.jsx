// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc6ifihQiISty1kJLAsgMfGS9BMtcIkIE",
  authDomain: "myapp-fa2da.firebaseapp.com",
  projectId: "myapp-fa2da",
  storageBucket: "myapp-fa2da.firebasestorage.app",
  messagingSenderId: "597956802276",
  appId: "1:597956802276:web:d3c9864db99ec4aff55ef1",
  measurementId: "G-8PZV1JRY00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
