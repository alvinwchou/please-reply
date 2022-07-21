import logo from './logo.svg';
import './App.css';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
      
      
      
    </div>
  );
}

export default App;
