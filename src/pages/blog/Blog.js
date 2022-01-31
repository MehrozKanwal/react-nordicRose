import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
//Stylesheet
import './Blog.css'

export default function Blog() {
  const { documents, error } = useCollection('projects')
  const {user} = useAuthContext()
  return <div>
     {error && <p className="error">{error}</p>}
      {documents && 
      <>
      <div className="blog-container">
      {documents.length === 0 && <p>No blogs yet!</p>}
      <Link to={`/blogarticles/${documents[0].id}`} key={documents[0].id}>
          <img className='blog-img' src={documents[0].blogImg}/>
          <h1 className='blog-title'>{documents[0].title}</h1>
          <p>{documents[0].content}</p>
        </Link>
        
        <div className='bt-border'></div>
        </div>
        
        <div className='all-articles' >
          <h1>All Articles</h1>
          </div>
       <div className='other-blogs'>
      {documents.map(document => (
        
        <div  className='each-blog' key={document.id}>
        
        <Link  to={`/blogarticles/${document.id}`}>
          <img className='all-blog-img' src={document.blogImg}/>
          <h4 className='all-blog-title'>{document.title}</h4>
        </Link>
        </div>
      ))}
    </div>
    </>
      }
        
  </div>;
}
