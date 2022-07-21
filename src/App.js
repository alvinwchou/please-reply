import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from './firebase.js';

import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    user: null,
    displayName: null,
    userID: null
  })

  const registerUser = (userName) => {
    onAuthStateChanged(auth, currentUser => {
      // add display to the authentication
      updateProfile(auth.currentUser, {
        displayName: userName
      }).then(() => {
        setUser({
          'user': currentUser,
          'displayName': currentUser.displayName,
          'userID': currentUser.uid,
        })
      })
    })
  }

  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register registerUser={registerUser}/>} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
      
    </div>
  );
}

export default App;
