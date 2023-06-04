import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';

const ManuNavbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("auth");
    navigate("/")
  }

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
 <nav className="navbar navbar-expand-lg mainnav">
  <div className="container-fluid  ">
    <a className="navbar-brand mainnavbrand" href="/manufacturer">Manufacturer's Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/manufacturer"> Recieved</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manufacturer/sent"> Sent</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manufacturer/createmsg">Create</a>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search by OrderID" aria-label="Search" value={searchQuery} onChange={handleSearch} />
        
      </form>
      <ul>
    
          <button className="nav-link logoutbtn" onClick={handleLogout}>Logout</button>
      
      </ul>
      
    </div>
  </div>
</nav>

  )
}

export default ManuNavbar