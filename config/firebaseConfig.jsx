// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // For persistence
import { getFirestore } from 'firebase/firestore'; // For Firestore
import { getStorage } from 'firebase/storage'; // For Firebase Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsoUaqBZHdHuuNOthac5qunatQHDnZ2Ps",
  authDomain: "projects-2025-b6fc8.firebaseapp.com",
  projectId: "projects-2025-b6fc8",
  storageBucket: "projects-2025-b6fc8.appspot.com", // Corrected storageBucket
  messagingSenderId: "323093880360",
  appId: "1:323093880360:web:a226f76a03dfc331205f1d",
  measurementId: "G-E9SWE05X6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore (Database)
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Analytics (optional, mostly for web)
const analytics = getAnalytics(app);

// Export Firebase services for use in other parts of the app
export { app, analytics };