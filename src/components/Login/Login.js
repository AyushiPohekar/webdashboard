import React, { useState } from 'react'
import { useAuth } from '../../Context/Auth';
import axios from 'axios';
import { API } from '../../global';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

const handleLogin=async(e)=>{
    
    e.preventDefault();
    try {
        const res = await axios.post(`${API}/api/users/login`, {
          email,
          password,
        });
        if (res && res.data.success) {
        //   toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('auth',JSON.stringify(res.data))
        
          if (auth.user.role === 'Manufacturer') {
            navigate('/manufacturer');
          } else if (auth.user.role === 'Transporter') {
            navigate('/transporter');
          }
         
        } else {
        //   toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        // toast.error("Something went wrong");
      }
    };

    
    
  return (
    <div>
    <form onSubmit={handleLogin}>
    
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

 


export default Login