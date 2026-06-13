// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-2eb1e.firebaseapp.com",
  projectId: "genwebai-2eb1e",
  storageBucket: "genwebai-2eb1e.firebasestorage.app",
  messagingSenderId: "475244631126",
  appId: "1:475244631126:web:d4064e36deca2f4d1217f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}