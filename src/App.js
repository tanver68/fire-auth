import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  
  const [user,setUser] = useState({
    // akhana atodin amra initially 1ta object 0 othoba empty array declear korci karon amader multy value dorkar cilo na bt aj dorkar tay object declear kore nilam 
    isSignedIn: false,  //here initially jodi sign in false hoy tay declear korlam and other valu gulo faka that means 0 declear korlam
    name: '',
    email: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signInUser = {
        // tar mane akhane amra upore j state gulo set kortaci sey sob jinish gulo niya nilam akhane
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signInUser) // akhane user state e signInUser ta set hoyce
      console.log(displayName,email,photoURL)

    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  return (
    <div className="App">
    <button onClick={handleSignIn}>Sign In</button>
    {
      user.isSignedIn && <p>Welcome {user.name}</p>  // akhane user.isSigndIn jodi true hoy tahole user ar name ta dakhabe
    }
    </div>
  );
}

export default App;
