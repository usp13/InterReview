// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "intervreview.firebaseapp.com",
  projectId: "intervreview",
  storageBucket: "intervreview.firebasestorage.app",
  messagingSenderId: "499095502499",
  appId: "1:499095502499:web:e8ff7a9aa0593ac8668916",
  measurementId: "G-070NCJLVLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app) ; 

const provider = new GoogleAuthProvider() ;

export { auth , provider } ;