import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { App } from './app';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC1MpPx-hBHiidUgoq09Rg5CQcK75gaOCU',
  authDomain: 'my-health-59d4d.firebaseapp.com',
  projectId: 'my-health-59d4d',
  storageBucket: 'my-health-59d4d.appspot.com',
  messagingSenderId: '555746872791',
  appId: '1:555746872791:web:147c98adcb14a2d83ecf92',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
