// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your info goes here",
  authDomain: "your info goes here",
  projectId: "your info goes here",
  storageBucket: "your info goes here",
  messagingSenderId: "your info goes here",
  appId: "your info goes here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}