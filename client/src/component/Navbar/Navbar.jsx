import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useNavigate } from 'react-router-dom';
import Context from '../../context/roleContext';

function Navbar({ showExtraLinks,showLogout }) {

  const {userType} = useContext(Context);
  const navigate=useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/')
  }
  return (
    <nav className="navbar">
      <div className="navbar-heading">HelpDesk</div>
      <ul className="navbar-list">
       {showLogout && <li onClick={()=>handleLogout()} style={{color:'white'}}>Logout</li>}
      </ul>
    </nav>
  );
}

export default Navbar;
