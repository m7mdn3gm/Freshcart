// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR5gvkNckl-hNrrWQ9Ch3szJ4sp0mt7hU",
  authDomain: "freshcart-ecommerce.firebaseapp.com",
  projectId: "freshcart-ecommerce",
  storageBucket: "freshcart-ecommerce.firebasestorage.app",
  messagingSenderId: "995718951055",
  appId: "1:995718951055:web:25741bf199cf09b04380fa",
  measurementId: "G-YM2E9ZM28C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);