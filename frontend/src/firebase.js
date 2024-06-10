// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8KrkOOxtN0kRMAXOtIGjqK39O8-DXTew",
  authDomain: "chess-e3600.firebaseapp.com",
  projectId: "chess-e3600",
  storageBucket: "chess-e3600.appspot.com",
  messagingSenderId: "607622097227",
  appId: "1:607622097227:web:1e389b43c5af57f6f560ce",
  measurementId: "G-6LYVQ21YC7"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersCollectionRef = collection(db, "users");
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
const analytics = getAnalytics(app);
export const gameCollectionRef=collection(db,"games");
