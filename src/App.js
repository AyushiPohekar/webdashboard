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
import MessagesRecieved from './components/Manufacturer/MessagesRecieved';
import ManuMsgSent from './components/Manufacturer/ManuMsgSent';
import ManuCreateMsg from './components/Manufacturer/ManuCreateMsg';
import Details from './components/Manufacturer/Details';
import TransRecievedDetails from './components/Transporter/TransRecievedDetails';

function App() {
const [auth,setAuth]=useAuth()
// console.log(auth)
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Navigate replace to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
     
      <Route path="/manufacturer" element={<Manufacturer/>}/>
      <Route path="/manufacturer" element={<MessagesRecieved/>}/>
      <Route path="/manufacturer/sent" element={<ManuMsgSent/>}/>
      <Route path="/manufacturer/createmsg" element={<ManuCreateMsg/>}/>
      <Route path="/manufacturer/:orderId" element={<Details/>}/>
      
      <Route path="/transporter" element={<Transporter/>}/>
      <Route path="/transporter/recieved/:orderId" element={<TransRecievedDetails/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
