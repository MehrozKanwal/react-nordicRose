import React from 'react';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
//Stylesheet
import './../signup/Signup.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isPending, error} = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }
  
  return <div>
      
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Create An Account</h1>
      <p>Create an account to enjoy all the services eithout any ads for free!</p>
      
        <input
          required 
          type="email" 
          placeholder=' E-mail'
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      
        <input
          required
          placeholder=' Password'
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      
     

      {!isPending && <button className="btn" >Login</button>}
      {isPending && <button className="btn" disabled>loading</button>}
    </form>
  </div>;
}
