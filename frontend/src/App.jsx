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
export default function () {
  const auth = getAuth();
  const [user, setUser] = useState("");

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
    <div className="bg-slate-800 h-screen">
      <UserProvider user={playerInfo} setUser={setPlayerInfo}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
