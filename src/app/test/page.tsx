'use client'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/config/firebase'
import React, { useState } from "react";
import { getRandomCodeWord } from '@/constants';



export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <button
        onClick={createDocument}
        style={{
          fontSize: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Enter
      </button>
    </div>
  );
}