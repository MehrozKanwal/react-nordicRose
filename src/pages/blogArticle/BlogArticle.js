import React from 'react';
import { useParams , Link} from 'react-router-dom';
import BlogArticlesSummary from './BlogArticlesSummary';
import { useCollection } from '../../hooks/useCollection';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';

// import { Link } from 'react-router-dom';

//Stylesheet
import './BlogArticle.css'
import '../blog/Blog.css'
import Comment from './Comment';

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
  <BlogArticlesSummary project={document}  />
  
   {/* {user &&
      <>
      <img className="user-img" src={user.photoURL} />{user.displayName}</> 
      } */}

      <div className='com-bt-border'></div>

      <ul className="comments-list blog-comments" id='com-list'>
        {document.comments && document.comments.map(comment => (
          <li className="each-comment" key={comment.id}>
            <div className="comment-author">
              <img width="25" className="user-img" src={comment.photoUrl} />
              <div className="det">
               
              <p className="name" >{comment.displayName}</p>
              <p className="time">{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
              </div>
            </div>
            
            <div >
              <p className="comment-content">{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className='bt-border'></div>
        
        
        <div className='all-articles' >
          <h1>What to read next ...</h1>
          </div>
       <div className='other-blogs'>
        {!documents && <div className="loading">Loading...</div>}
      {documents && documents.map(document => (
        
        <div  className='each-blog' key={document.id}>
        
        <Link  to={`/blogarticles/${document.id}`}>    
          <img className='all-blog-img' src={document.blogImg}/>
          <h4 className='all-blog-title'>{document.title}</h4>
          </Link>
        
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
