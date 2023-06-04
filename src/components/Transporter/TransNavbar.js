import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TransNavbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("auth");
    navigate("/")
  }


 




  return (
 <nav className="navbar navbar-expand-lg mainnav">
  <div className="container-fluid  ">
    <a className="navbar-brand mainnavbrand" href="/transporter">Transporter's Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/transporter"> Recieved</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/transporter/sent"> Sent</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/transporter/reply">Reply</a>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit" >Search</button>
      </form>
      <ul>
    
          <button className="nav-link logoutbtn" onClick={handleLogout}>Logout</button>
      
      </ul>
      
    </div>
  </div>
</nav>

  )
}

export default TransNavbar