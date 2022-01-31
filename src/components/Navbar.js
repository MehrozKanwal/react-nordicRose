import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
//Stylesheet
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const {user} = useAuthContext()
  const handleClick =(e) => {
   navigate('/signup')
  }
  return <div className='navbar'>
    <ul>
      <li className='logo'>NORDIC ROSE</li>
      <li><Link to='/blog'>BLOG</Link></li>
      <li><Link to='/about'>ABOUT</Link></li>
      {!user && <li><button className='btn' onClick={handleClick}>LogIn / SignUp</button></li>}
      {user &&
      <li ><Link className='signupbtn-link' to ="/">
      <img className="user-img" src={user.photoURL} />{user.displayName} </Link></li>
      }
    </ul>
  </div>;
}
