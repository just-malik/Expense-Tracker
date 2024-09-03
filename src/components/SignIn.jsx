import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth , provider , db } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword , signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc , getDoc , collection } from 'firebase/firestore';


const SignIn = () => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const notify = (message) => toast(message);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate('/home')
      }
    })
  },[])
  const userSignIn = () => {
    if(email==='' && pass===''){
      notify('All Fields are Mandatory')
    }
    else {
      signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigate("/home");
        notify("Logged In Successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        notify(errorMessage)
      });
    }
  }
  
  return (
    <div>
      <>
      <div className="sign-in">
        <div className="signin-form">
          <h1>Sign-In</h1>
          
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter Email..."
          />
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            required
            placeholder="Enter Password..."
          />
          
          <button onClick={userSignIn}>Sign In</button>
          <p>
            Create a New Account ? <a href="/signup">Sign-Up</a>{" "}
          </p>
        </div>
      </div>
    </>
    </div>
  )
}

export default SignIn