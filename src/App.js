import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser)
    })
    .catch(err => console.log(err))
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h2>Hello Fire Auth</h2>
      {
        user.isSignedIn ?
        <button onClick={handleSignOut}>SIGN OUT</button> :
        <button onClick={handleSignIn}>SIGN IN</button>
      }
      {
        user.isSignedIn && <div>
          <h3>Welcome, {user.name}!</h3>
          <h4>Email: {user.email}</h4>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
