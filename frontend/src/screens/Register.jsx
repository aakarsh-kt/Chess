import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { usersCollectionRef } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
export default function () {
  const navigate = useNavigate();
  // const [success, setSuccess] = React.useState(false);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User info:", user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };
  async function register(event) {
    event.preventDefault();
    console.log("Reached here");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );

      console.log("eyyy");
      const userRef = doc(usersCollectionRef, info.email);
      await setDoc(userRef, {
        username: info.username,
        email: info.email,
        password: info.password,
      });
      navigate("/app?username=" + info.username);
      // navigate("/app");
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  const [val, setVal] = React.useState(false);
  const [info, setInfo] = React.useState({
    username: "",
    email: "",
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
        <div
          className="text-white cursor-pointer font-bold text-2xl"
         
        >
          <div className="flex flex-col items-center">
              Sign Up With Email
                <img src="email2.jpeg" className="w-10 h-10 rounded-full"  onClick={() => setVal(!val)}/>
          </div>
        {val && (
          <form
            onSubmit={register}
            className="flex flex-col items-center justify-evenly text-white gap-2"
          >
            <label htmlFor="username">Username</label>
            <TextField
              type="text"
              id="username"
              name="username"
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
