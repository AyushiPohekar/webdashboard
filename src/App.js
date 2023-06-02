import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
