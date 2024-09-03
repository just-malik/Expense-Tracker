import  {getAuth , GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCOIIg3ByGO9j8Z6yTrWx6Q4fnYeh-3KEo",
  authDomain: "expense-tracker-d5034.firebaseapp.com",
  projectId: "expense-tracker-d5034",
  storageBucket: "expense-tracker-d5034.appspot.com",
  messagingSenderId: "499184356845",
  appId: "1:499184356845:web:581fcf280f86de03b6abe4",
  measurementId: "G-TLWY4D31J9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)