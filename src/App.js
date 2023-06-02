import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './Context/Auth';
import Manufacturer from './components/Manufacturer/Manufacturer';
import Transporter from './components/Transporter/Transporter';
import Home from './components/Home';

function App() {
  const [auth,setAuth]=useAuth();
  
  const userRole = auth && auth.user ? auth.user.role : null;
console.log("userRole",userRole)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Navigate replace to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
     
      <Route path="/manufacturer" element={<Manufacturer/>}/>
      <Route path="/transporter" element={<Transporter/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
