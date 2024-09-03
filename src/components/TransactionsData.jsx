import React from 'react'
import { db , auth } from '../firebase'
import { collection ,query , doc, onSnapshot , orderBy } from 'firebase/firestore'
import { useState , useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
const TransactionsData = () => {
    const [transactions,setTransactions] = useState([])
    useEffect( () => {
        onAuthStateChanged(auth,(user)=>{
            if(user){
                const userId =user.uid
                console.log(userId)
                const userRef = doc(db, "users", userId);
                const transactionsCollectionRef = collection(userRef, "Transactions");
                try {
                      const que = query(transactionsCollectionRef, orderBy("date", "desc"));
                      onSnapshot(que,(snapshot)=>{
                        const TransactionsList = snapshot.docs.map(doc =>({
                            ...doc.data()
                        }))
                        setTransactions(TransactionsList)
                    });
                  } catch (error) {
                    console.error("Error fetching Transactions:", error);
                  }
                
            
                
            }
        })
      }, [db]);
      const data = transactions
      const downloadCSV = () => {
        // Convert array of objects to CSV format
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(',')); // Add headers
    
        data.forEach(row => {
          const values = headers.map(header => {
            const value = row[header];
            return `"${value}"`; 
          });
          csvRows.push(values.join(','));
        });
    
        const csvContent = csvRows.join('\n');
    
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
    
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
    
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };    

  return (

        <div className="dataDisplay">
            
       <div className="transData">
        <h1>AMOUNT</h1>
        <h1>DATE</h1>
        <h1>DESCRIPTION</h1>
        <h1>TYPE</h1>
       </div>
       { transactions.map(trans => (
          <div className='transData'>
            
            <p>{trans.amount}Rs</p>
            <p>{new Date(trans.date.seconds * 1000).toLocaleDateString()}</p>
            <p>{trans.description}</p>
            <p>{trans.type}</p>
          </div>
          
        ))}

        <button className='csvElement' onClick={downloadCSV}>Download CSV</button>
    </div>
  )
}

export default TransactionsData