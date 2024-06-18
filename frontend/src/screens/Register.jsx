import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { TextField, Button } from "@mui/material";
import { usersCollectionRef, storage } from "../firebase.js";
import { addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [val, setVal] = useState(false);
  const [info, setInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const addDocument = async (user, url,name) => {
    const obj = {
      name: name,
      email: user.email,
      games: [],
      profilePicture: url,
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "users", user.uid), obj);
      setUser(user.displayName);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const tempUser = result.user;
        const storageRef = ref(storage, `profilePictures/${tempUser.uid}`);
        await uploadBytes(storageRef, file);
        const profilePicUrl = await getDownloadURL(storageRef);

        addDocument(tempUser, profilePicUrl);
        navigate("/landing");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setError(error.message);
      });
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const profilePicUrl = await getDownloadURL(storageRef);

      await addDocument(user, profilePicUrl,info.displayName);
      navigate("/landing");
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              />
              <label htmlFor="email">Email</label>
              <TextField
                type="email"
                id="email"
                name="email"
                required
                className="size-10 w-60 h-10 bg-white  rounded-md"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <TextField
                type="password"
                id="password"
                name="password"
                className="size-10 w-60 h-10 bg-white  rounded-md"
                onChange={handleChange}
                required
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
              <br />
              <Button type="submit">Register</Button>
            </form>
          )}
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
