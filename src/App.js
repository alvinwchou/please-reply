import logo from './logo.svg';
import './App.css';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
      <Register />
      <LogIn />
    </div>
  );
}

export default App;
