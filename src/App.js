import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth, } from './firebase.js';
import { useEffect, useState } from 'react';
import './styles/styles.css'
import CreateEvent from './pages/CreateEvent';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import firebase from './firebase';
import Events from './pages/Events';
import SignUp from './pages/SignUp';


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
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${currentUser.uid}`);

        onValue(dbRef, res => {
          const data = res.val();
          let eventList = [];
          console.log('data', data)
          for(let item in data) {
            console.log('item', data[item])
            console.log('item.eventName', data[item].eventName)
            eventList.push({
              eventID: item,
              eventName: data[item].eventName,
              startDate: data[item].startDate,
              startTime: data[item].startTime,
              endDate: data[item].endDate,
              endTime: data[item].endTime,
              description: data[item].description
            });
          }

          setUser({
            'user': currentUser,
            'displayName': currentUser.displayName,
            'userID': currentUser.uid,
            'events': eventList
          })
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

  const addEvent = (eventDetails) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `events/${user.user.uid}`)
    push(dbRef, {
      'eventName': eventDetails.eventName,
      'startDate': eventDetails.startDate,
      'startTime': eventDetails.startTime,
      'endDate': eventDetails.endDate,
      'endTime': eventDetails.endTime,
      'location': eventDetails.location,
      'description': eventDetails.description
    })
  }

  return (
    <div className="App">
      <Navigation displayName={user.displayName} logoutUser={logoutUser}/>

      <Routes>
        <Route path='/' element={<Home displayName={user.displayName} />} />
        <Route path='/register' element={<Register registerUser={registerUser}/>} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/createEvent' element={<CreateEvent addEvent={addEvent}/>} />
        <Route path='/events' element={<Events events={user.events} userID={user.userID} />} />
        <Route path='/signUp/:userID/:eventID' element={<SignUp />} />
      </Routes>
      
    </div>
  );
}

export default App;
