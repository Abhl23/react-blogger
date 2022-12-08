import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSOXHTPTmL9m3V7rMInCL4fsOAh6OIfE",
  authDomain: "react-blogger-bb1a9.firebaseapp.com",
  projectId: "react-blogger-bb1a9",
  storageBucket: "react-blogger-bb1a9.appspot.com",
  messagingSenderId: "1027396455481",
  appId: "1:1027396455481:web:5b342d901757a4411111e8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// gets a reference to the firebase authentication service
export const auth = getAuth();
// gets a reference to the storage service
export const storage = getStorage();
// gets a reference to the cloud firestore database
export const db = getFirestore();
