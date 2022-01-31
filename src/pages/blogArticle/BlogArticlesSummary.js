import React from 'react';
import './BlogArticlesSummary.css'
import { BsFacebook, BsTwitter } from 'react-icons/bs';

export default function BlogArticlesSummary({project}) {
  return <div>
  <div className='blog-summary'>
   <h1>{project.title}</h1>
    <img className='blog-detail-img1' src={project.blogImg} />
    <div className='blog-author-details'>
      <img className="user-img" src={project.createdBy.photoURL} />
       <div className='auth-Info '>
         <h4>{project.createdBy.displayName}</h4>
         <p>{project.createdAt.toDate().toDateString()}, read : {project.readtime}</p>
       </div>
    
    <div className='icons'>
           <span className='facebook'><BsFacebook /></span>
           <span className='twitter'><BsTwitter /></span>
    </div>
    </div>

    <div className='blog-content'>
        <p>{project.content}</p>
    </div>
    <p className='blog-lable'>Tags: 
    {project.tag.map((t, index) => (
         <span className='tag' key={index}> <a href='#'>{t.value}</a>, </span>
             ))}</p>


  </div>
</div>;
}
