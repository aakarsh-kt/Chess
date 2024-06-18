// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8KrkOOxtN0kRMAXOtIGjqK39O8-DXTew",
  authDomain: "chess-e3600.firebaseapp.com",
  databaseURL: "https://chess-e3600-default-rtdb.firebaseio.com",
  projectId: "chess-e3600",
  storageBucket: "chess-e3600.appspot.com",
  messagingSenderId: "607622097227",
  appId: "1:607622097227:web:710fd7eb28003f29f560ce",
  measurementId: "G-DZPQYF8MP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



import { getFirestore,collection } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth";




export const db = getFirestore(app);
export const usersCollectionRef = collection(db, "users");
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const storage = getStorage(app);
export const gameCollectionRef=collection(db,"games");
