import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyCd9O8MOUP1SUk2_vOrdPwlc49eeq-r7Bg",
  authDomain: "binary-learning-84f20.firebaseapp.com",
  projectId: "binary-learning-84f20",
  storageBucket: "binary-learning-84f20.appspot.com",
  messagingSenderId: "283984280493",
  appId: "1:283984280493:web:796b1d8a838492525b7f24",
  measurementId: "G-T51BE66MHC"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
