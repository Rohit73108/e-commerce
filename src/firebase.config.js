// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF0Nmcw8Ka24zwf9RNK3U5Gn35ArnoaWk",
  authDomain: "fruitables-c6ac2.firebaseapp.com",
  projectId: "fruitables-c6ac2",
  storageBucket: "fruitables-c6ac2.appspot.com",
  messagingSenderId: "887206098583",
  appId: "1:887206098583:web:63406ec78792b849d51bd2",
  measurementId: "G-4N6RD8CWXX"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  export const db = getFirestore(app);

  // Initialize Firebase Storage and get a reference to the service
  export const storage = getStorage(app);

  // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);


