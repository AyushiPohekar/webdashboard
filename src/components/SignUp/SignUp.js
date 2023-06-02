// components/Register.js
import React, { useState } from 'react';
import "./signup.css";
import { API } from '../../global';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    

    // Make a POST request to the backend API to register the user
    const response = await fetch(`${API}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password,email, role }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful, redirect to login page or perform any desired action
      console.log(data.message);

    } else {
      // Registration failed, display error message or handle accordingly
      console.log(data.message);
    }
  };

  return (
    <div className='SignUpContainer'>
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Manufacturer">Manufacturer</option>
        <option value="Transporter">Transporter</option>
      </select>
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
