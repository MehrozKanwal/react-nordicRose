import React from 'react';
import { useParams } from 'react-router-dom';
import BlogArticlesSummary from './BlogArticlesSummary';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';
import { Link } from 'react-router-dom';
//Stylesheet
import './BlogArticle.css'
import '../blog/Blog.css'

export default function BlogArticle() {
  const {id} = useParams()
  const { document, error } = useDocument('projects', id)
  const { documents } = useCollection('projects')
  
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }
  


  return <div className='blog-details'>
  <BlogArticlesSummary project={document} />

   {/* {user &&
      <>
      <img className="user-img" src={user.photoURL} />{user.displayName}</> 
      } */}


      <div className='bt-border'></div>
        
        
        <div className='all-articles' >
          <h1>What to read next</h1>
          </div>
       <div className='other-blogs'>
        {!documents && <div className="loading">Loading...</div>}
      {documents && documents.map(document => (
        
        <div  className='each-blog' key={document.id}>
        
      
          <img className='all-blog-img' src={document.blogImg}/>
          <h4 className='all-blog-title'>{document.title}</h4>
        
        </div>
      ))}
    </div>
   
        
  <form  className="newsletter-form">
      <h2 className="news-title">Sign up for the newsletter</h2>
       <p>If you want relevant updates occasionally, sign up for
        the private newsletter. Your email is never shared. </p>
           
             <div className="news-btn">
              <input
                required
                placeholder='Enter your email ...'
                type="email"
              />
               <button className="btn" id='newscast'>Signup</button>
               </div>

          </form>
  </div>;
}
