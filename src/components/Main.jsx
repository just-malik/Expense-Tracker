import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { collection, doc, getDoc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import TransactionsData from "./TransactionsData";
const Main = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [incomeDesc, setIncomeDesc] = useState("");
  const [expenseDesc, setExpenseDesc] = useState("");
  const [transactions,setTransactions] = useState([])
  const notify = (message)=>{toast(message)}

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
      } else {
        const userId = user.uid;
        const docRef = doc(db, "users", userId);
        await getDoc(docRef).then((docSnap) => {
          setBalance(docSnap.data().balance);
        });
      }
    });
  }, []);


  const addIncome = async () => {
    if(income==='' || incomeDesc===''){
      notify("Enter Income and Description for it")
  }
  else{
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = doc(db, "users", userId);

      try {
        // Fetch the current balance
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const currentBalance = docSnap.data().balance;
          const transactionsCollectionRef = collection(userRef, "Transactions");
          await addDoc(transactionsCollectionRef, {
            amount: Number(income),
            type: "income", // "income" or "expense"
            date: new Date(),
            description: incomeDesc,
          });
          // Update the balance
          const newBalance = currentBalance + Number(income);
          setBalance(newBalance);

          // Update Firestore with the new balance
          await setDoc(userRef, { balance: newBalance }, { merge: true });
        }
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    }
  }
  };
  const addExpense = async () => {
    if(expense==='' || expenseDesc===''){
        notify("Enter Expense and Description for it")
    }
    else{
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = doc(db, "users", userId);

      try {
        // Fetch the current balance
        const docSnap = await getDoc(userRef);

        const transactionsCollectionRef = collection(userRef, "Transactions");
        await addDoc(transactionsCollectionRef, {
          amount: Number(expense),
          type: "expense", // "income" or "expense"
          date: new Date(),
          description: expenseDesc,
        });

        if (docSnap.exists()) {
          const currentBalance = docSnap.data().balance;

          // Update the balance
          const newBalance = currentBalance - Number(expense);
          setBalance(newBalance);

          // Update Firestore with the new balance
          await setDoc(userRef, { balance: newBalance }, { merge: true });
        }
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    }
  }
  };
  return (
    <>
      <div className="main">
        <div className="balance">
          <h1>Current Balance</h1>
          <h2>{balance}Rs</h2>
        </div>

        <div className="income">
          <label htmlFor="income">Income:</label>
          <input
            id="income"
            onChange={(e) => setIncome(e.target.value)}
            type="number"
          />
          <label htmlFor="descIncome">Description:</label>
          <input
            id="descIncome"
            onChange={(e) => setIncomeDesc(e.target.value)}
            type="text"
          />
          <button onClick={addIncome}>Add Income</button>
        </div>
        <div className="expense">
          <label htmlFor="expense">expense:</label>
          <input
            id="expense"
            onChange={(e) => setExpense(e.target.value)}
            type="number"
          />
          <label htmlFor="descExpense">Description:</label>
          <input
            id="descExpense"
            onChange={(e) => setExpenseDesc(e.target.value)}
            type="text"
          />
          <button onClick={addExpense}>Add Expense</button>
        </div>
      </div>
      <div className="Transactions">
        <h1>Transactions</h1>
        <TransactionsData />
      </div>
    </>
  );
};

export default Main;
