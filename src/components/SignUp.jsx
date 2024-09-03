import React, { useEffect, useState } from "react";
import { auth , db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { setDoc , doc , collection , addDoc} from "firebase/firestore";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const notify = (message) => toast(message);
  const [pass, setPass] = useState("");
  const [cPass, setCpass] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user) {
        navigate('/home')
      }
    })
  },[])
  const userSignUp = async () => {
    if (email === "" || pass === "") {
      notify("All Fields are required");
    } else if (pass === cPass) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(async (userCreds) => {
          const user = userCreds.user
          const userId = user.uid
          const userRef = doc(db, "users", userId)
          setDoc(userRef, { balance: 0 })
          const transactionsCollectionRef = collection(userRef, "Transactions");

      // Optionally, you can add an initial transaction or just leave the collection empty
        await addDoc(transactionsCollectionRef, {
        type: "initial",
        amount: 0,
        date: new Date(),
        description: "Account created"
      });
          navigate("/home");
          notify("Account Created SuccessFully");
        })
        .catch((error) => {
          notify(error.message);
        });
    } else {
      notify("Passwords Do not Match");
    }
  };
  return (
    <>
      <div className="sign-up">
        <div className="signup-form">
          <h1>Create a New Account</h1>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required placeholder="Enter Name..." />
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
          <label htmlFor="cPass">Confirm Password</label>
          <input
            id="cPass"
            value={cPass}
            onChange={(e) => {
              setCpass(e.target.value);
            }}
            type="password"
            required
            placeholder="Confirm Password..."
          />
          <button onClick={userSignUp}>Sign Up</button>
          <p>
            Already have a Account ? <a href="/">Sign-In</a>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
