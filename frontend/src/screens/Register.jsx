import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { usersCollectionRef } from "../firebase.js";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import Navbar from "../components/Navbar.jsx";
export default function () {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function addDocument(user) {
    // event.preventDefault();
    const obj = { name: user.displayName, email: user.email, uid: user.uid };
    const ref = await addDoc(usersCollectionRef, obj);
    setUser(user.displayName);
  }
  // const [success, setSuccess] = React.useState(false);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const tempUser = result.user;
        console.log("User info:", tempUser);
        addDocument(tempUser);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };
  async function register(event) {
    event.preventDefault();
    addDocument(info);
    console.log("Reached here");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );


      navigate("/landing");
      // navigate("/app");
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  const [val, setVal] = React.useState(false);
  const [info, setInfo] = React.useState({
    displayName: "",
    email: "",
    uid: nanoid(),
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="flex flex-col items-center gap-10 h-screen">
      <Navbar />
      <h1 className="text-6xl text-white font-bold mt-10 gap-10">Sign Up</h1>
      <div className="flex flex-row justify-between m-10">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-white font-bold">SignUp with Google</h1>

          <img
            src="googleSignInLogo.png"
            onClick={signInWithGoogle}
            className="bg-white w-10 h-10 cursor-pointer border rounded-full"
          />
        </div>
        <h2 className="text-white  font-bold text-xl mx-10">OR</h2>
        <div className="text-white cursor-pointer font-bold text-2xl">
          <div className="flex flex-col items-center">
            Sign Up With Email
            <img
              src="email2.jpeg"
              className="w-10 h-10 rounded-full"
              onClick={() => setVal(!val)}
            />
        
          </div>
          {val && (
            <form
              onSubmit={register}
              className="flex flex-col items-center justify-evenly text-white gap-2"
            >
              <label htmlFor="username">Username</label>
              <TextField
                type="text"
                id="displayName"
                name="displayName"
                required
                className="size-10 w-60 h-10 bg-white  rounded-md"
                onChange={handleChange}
              ></TextField>
              <label htmlFor="email">Email</label>
              <TextField
                // className="stand rd-basic"
                type="email"
                id="email"
                name="email"
                required
                className="size-10 w-60 h-10 bg-white  rounded-md"
                onChange={handleChange}
              ></TextField>
              {/* <br /> */}
              <label htmlFor="password">Password</label>
              <TextField
                // className="standard-basic"
                type="password"
                id="password"
                name="password"
                className="size-10 w-60 h-10 bg-white  rounded-md"
                onChange={handleChange}
                required
              ></TextField>
              <br />
              <Button type="primary" onClick={register}>
                Register
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
