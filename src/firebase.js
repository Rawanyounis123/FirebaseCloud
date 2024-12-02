// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwYLRw2quQcOaXG7-9inUUq9fPxpPF8Ns",
  authDomain: "cloudtasks-d57eb.firebaseapp.com",
  projectId: "cloudtasks-d57eb",
  databaseURL: "https://cloudtasks-d57eb-default-rtdb.firebaseio.com/",
  storageBucket: "cloudtasks-d57eb.firebasestorage.app",
  messagingSenderId: "1013980382270",
  appId: "1:1013980382270:web:f8058060e4561972d47d6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

export const messaging = getMessaging(app);
export { database, firestore };
