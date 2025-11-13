// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHce-FJXZdEabxO4TgiA326IpPRVCqnBk",
  authDomain: "freelance-marketplace-ce615.firebaseapp.com",
  projectId: "freelance-marketplace-ce615",
  storageBucket: "freelance-marketplace-ce615.firebasestorage.app",
  messagingSenderId: "702970971318",
  appId: "1:702970971318:web:f292b1e2d883833c69d217",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
