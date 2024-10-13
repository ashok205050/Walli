// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS3NxKb92CfJKpAYEuUfkIXEjfd8mG-Cs",
    authDomain: "walli-d2154.firebaseapp.com",
    projectId: "walli-d2154",
    storageBucket: "walli-d2154.appspot.com",
    messagingSenderId: "1027626358339",
    appId: "1:1027626358339:web:598570d19a247aaeb2a6f6",
    measurementId: "G-VXWK3T8GPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export storage and auth
export const storage = getStorage(app);
export const auth = getAuth(app);
