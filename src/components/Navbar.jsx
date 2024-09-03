import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const [isLogged,setIsLogged] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
       onAuthStateChanged(auth,(user)=>{
         if(user) {
            setIsLogged(true)
         }
         else {
            setIsLogged(false)
         }
        })
    },[])
    const signUserOut = () => {
        signOut(auth).then(() => {
           navigate('/')
          }).catch((error) => {
           console.log(error);
           
          });
    }
  return (
    <>
    <nav >
     <h1>EXPENSE TRACKER</h1>
     {isLogged && <button onClick={signUserOut}>Log Out</button>}
    </nav>
     <Outlet />
    </>
  )
}

export default Navbar