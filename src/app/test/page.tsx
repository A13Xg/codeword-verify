'use client'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/config/firebase'

const createDocument = async()=>{
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

console.log('CHOOCHED')
}

export default function Test() {
    return <div>
        <h1>Test</h1>
        <button onClick={createDocument} style={{ fontSize: '1.5rem', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Enter
        </button>
    </div>
}