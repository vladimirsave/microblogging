import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { addUserDoc, addUser, auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({ userName: '', email: '', password: '', repassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value })
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (userInfo.password === userInfo.repassword) {

        const userCredential = await
          createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
          console.log(userCredential.user);
          const newUser = {userName: userInfo.userName, email: userInfo.email, password : userInfo.password };
          await setDoc(doc(db, "users", userCredential.user.uid), newUser);
          navigate ('/login');

      }
    } catch (err) {
      console.log(err)
    }

    setUserInfo({ userName: '', email: '', password: '', repassword: '' });

  }

  return (
    <div className="writecontainer">
      <></>
      <form className="userForm">
        <h1>Sign Up</h1>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} type="text" value={userInfo.userName} id="userName" />
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="text" value={userInfo.email} id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="text" value={userInfo.password} id="password" />
        <label htmlFor="repassword">Re-Password</label>
        <input onChange={handleChange} type="text" value={userInfo.repassword} id="repassword" />
        <button className="btn-submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form >
    </div>
  );
}
