  import React,{useState,useEffect} from "react"
  import {BrowserRouter,Route,Routes} from "react-router-dom"
  import LandingPage from "./screens/LandingPage.jsx"
  import Game from "./screens/Game.jsx"
  import Login from "./screens/Login.jsx"
  import Register from "./screens/Register.jsx"
  import {UserProvider} from "./contexts/userContext.jsx"
  import { onAuthStateChanged } from "firebase/auth"  
  import { getAuth } from "firebase/auth"
  export default function(){
    const auth=getAuth();
    const [user,setUser]=useState("");

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      
      // console.log(userFirebase);
      return () => unsubscribe();
    }, []);
    return(
      <div className="bg-slate-800 h-screen" >
        <UserProvider user={user} setUser={setUser}>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<LandingPage/>} />
        <Route path="/game" element={<Game/>} />
        </Routes>
        </BrowserRouter>
        </UserProvider>
      </div>
    )
  }