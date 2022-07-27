import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.js';
import { useEffect, useState } from 'react';
import './styles/styles.css'


function App() {
  const [user, setUser] = useState({
    user: null,
    displayName: null,
    userID: null
  })

  let navigate = useNavigate()

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
    // route to homepage after registering
    navigate('/')
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser({
          'user': currentUser,
          'displayName': currentUser.displayName,
          'userID': currentUser.uid,
        })
      } else {
        setUser({
          user: null,
          displayName: null,
          userID: null,
        })
      }
    })
  }, [])

  const logoutUser  = () => {
    setUser({
      user: null,
      displayName: null,
      userID: null,
    })

    signOut(auth).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className="App">
      <Navigation displayName={user.displayName} logoutUser={logoutUser}/>

      <Routes>
        <Route path='/' element={<Home displayName={user.displayName} />} />
        <Route path='/register' element={<Register registerUser={registerUser}/>} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
      
    </div>
  );
}

export default App;
