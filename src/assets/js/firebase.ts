// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAipkosInM68yGVPv6lRQeKWnwCF4wT4Wc",
  authDomain: "midterm-exam-3adb8.firebaseapp.com",
  projectId: "midterm-exam-3adb8",
  storageBucket: "midterm-exam-3adb8.appspot.com",
  messagingSenderId: "284437151621",
  appId: "1:284437151621:web:efd5a6ad2ff465910e8eec",
  measurementId: "G-03SK2HDJQJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
