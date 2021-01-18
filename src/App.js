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
    photo: '',
    password:''
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

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      // here user er signout ta jkhn succesfull holo tkhn isSignedIn hobe false and name,email,photo hoye jabe khali string and pore signedOutUser take set kore debo
      
      const signedOutUser = {
        isSignedIn : false,
        name : '',
        email :'',
        photo :''
      }
      setUser(signedOutUser)
    })

    .catch((error) => {
      // An error happened.
    });
  }

  //Change hole ja korbe

  const handleBlur=(e) =>{
   
    let isFormValid = true;      //form ta valid kina check korar jonno

   //console.log(e.target.name,e.target.value) //event.target mane event ta j element theke target hoyce seytar nameta and tar valuta nibe (oneke event na likhe e likhe)
   
      //email validation

   if(e.target.name==='email')
   {
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value); 
    
   }

     //password validation

   if(e.target.name==='password')
   {
        isFormValid = e.target.value.length > 6;
        
   }

     //form validation and state manage kora

   if(isFormValid)
   {
     const newUserInfo = {...user};  //user state er sob information newUserInfo ar modhe copy hoye gelo

     newUserInfo[e.target.name] = e.target.value; //akhane newUserInfo ar modhe giya email,passowrd j proparty ta ace setak update korbo and tar value hobe email,password er value

     setUser(newUserInfo)

   }

   

  }

  // Submit button er kaj

  const handleSubmit = () =>{
    
  }

  return (
    <div className="App">
    {
      // ata holo javascript if-else for one line . akhane bola hoyece j user jodi signin kora thake tahole button dakhabe sign out r jodi na thake tahole button hobe sign in(? atar mane holo if, ar : atar mane holo else) 

      user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
      <button onClick={handleSignIn}>Sign In</button>
    }



    {
      user.isSignedIn && <p>Welcome {user.name}</p>  // akhane user.isSigndIn jodi true hoy tahole user ar name ta dakhabe
    }

    {/* submit form er kaj */}

    <form onSubmit={handleSubmit} >
      <h3>Our own Authentication</h3>
      <p>Name: {user.name} </p>
      <p>Email: {user.email} </p>
      <p>Password: {user.password} </p>
      <input name="name" type="text"  onBlur={handleBlur} placeholder="Your name" />
      <br/>
      <input type="text" name='email' onBlur={handleBlur} placeholder="Your email address" required />
      <br/>
      <input type="password" name='password' onBlur={handleBlur} placeholder="Your password" required />
      <br/>
      <input type="submit" value="Submit"/> 
    </form>
    </div>
  );
}

export default App;
