import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./screens/LandingPage.jsx";
import Game from "./screens/Game.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.js";
import Profile from "./screens/Profile.jsx";
import Spectate from "./screens/Spectate.jsx";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from "react-router-dom";
import { Switch } from "@mui/material";
export const  App=() =>{
  const auth = getAuth();
  const [user, setUser] = useState("");
  const location=useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // console.log(userFirebase);
    return () => unsubscribe();
  }, []);
  const [playerInfo, setPlayerInfo] = useState(null);
  useEffect(() => {
    async function getDocumentsByQuery(collectionName, field, operator, value) {
      if (value != undefined) {
        console.log(value);
        const q = query(
          collection(db, collectionName), 
          where(field, operator, value)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setPlayerInfo(doc.data());
        });
      }
    }

    getDocumentsByQuery("users", "email", "==", user?.email);
  }, [user]);

  return (
    <UserProvider user={playerInfo} setUser={setPlayerInfo}>
      <div className="bg-slate-800 h-screen">
        
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames="fade">
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/game" element={<Game />} />
              <Route path="/spectate" element={<Spectate />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </UserProvider>
  );
}

// Wrapping the App with BrowserRouter
const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default WrappedApp;