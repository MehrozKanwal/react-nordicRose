import React from 'react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

//Stylesheet
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()
  const navigate = useNavigate()

  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName , thumbnail)
    navigate('/')
  }
  
  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 1000000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }
    
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
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
        <input
          required
          type="text" 
          placeholder=' Display Name'
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      
        <input 
         placeholder='Choose Image'
          required
          type="file" 
          onChange={handleFileChange}
        />
       
       {thumbnailError && <div className="error">{thumbnailError}</div>}
      {!isPending && <button className="btn" >Create Account</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
      <p>Already Have An Acoount?</p>
      <Link to='/login'>Sign In</Link>
    </form>
  </div>;
}
