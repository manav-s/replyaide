// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH4x84BuQnno3cSoBwKJhjnhDMueEj7Hg",
  authDomain: "replyaide-auth.firebaseapp.com",
  projectId: "replyaide-auth",
  storageBucket: "replyaide-auth.appspot.com",
  messagingSenderId: "127465898305",
  appId: "1:127465898305:web:0828de35528317e72ca1c0",
  measurementId: "G-DTDJGWP9EZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
