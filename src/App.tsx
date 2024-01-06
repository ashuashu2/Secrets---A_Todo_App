import React from 'react';
import './App.css';
import { NavBar} from  "./components/NavBar"
import { Home } from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/signup" element={<Signup />} />
        <Route  path="/login" element={<Login />} />

      </Routes>
      
      
     
    </div>
  );
}

export default App;
