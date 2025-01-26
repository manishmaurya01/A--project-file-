import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjJX0qSbzy8FkI9gPlXmp0MnhrsERX56w",
  authDomain: "online-ticket-booking-sy-41668.firebaseapp.com",
  projectId: "online-ticket-booking-sy-41668",
  storageBucket: "online-ticket-booking-sy-41668.firebasestorage.app",
  messagingSenderId: "725147095889",
  appId: "1:725147095889:web:e527f005f1623bde7eb970",
  measurementId: "G-3JRNVYNJLH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
