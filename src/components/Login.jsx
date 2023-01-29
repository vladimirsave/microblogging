import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AppContext from './context/AppContext';

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentInUser } = useContext(AppContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
      console.log(userCredential.user.uid);
      setCurrentInUser(userCredential.user.uid);
      localStorage.setItem('currentUser', JSON.stringify(userCredential.user.uid));
      navigate('/');
      }
    } catch (err) {
      console.log(err)
    }
    navigate('/')
  };

  return (
    <div className="writecontainer">
      <form className='userForm'>
        <h1>Log In</h1>
        <label htmlFor='email'>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type='text' id='email' />
        <label htmlFor='password'>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type='text' id='password' />
        <button className='btn-submit' onClick={handleLogIn}>
          Log In
        </button>
        <Link className='link' to='/signup'>
          Not a member? Sign up
        </Link>
      </form>
    </div>
  );
}
