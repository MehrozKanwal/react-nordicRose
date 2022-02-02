import React from 'react';
import { useState } from 'react';
import './BlogArticlesSummary.css'    
import { BsFacebook, BsTwitter,BsFillChatLeftFill,BsFillHandThumbsUpFill} from 'react-icons/bs';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';


export default function BlogArticlesSummary({project }) {
  const {id} =useParams()
  const { document, error } = useDocument('projects', id)
  const [liked,setLiked]=useState(false);
  const [comment,setComment]=useState(false);

  
  return  <div className='blog-summary'>
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
    <div className='react'>
    <button className='like' 
        onClick={()=>{setLiked()}}>
        <BsFillHandThumbsUpFill className='icon'/> LIKE</button>

        <button className='comment' 
        onClick={()=>{setComment(!comment)}}>
        <BsFillChatLeftFill className='icon' />  COMMENT</button>
       </div>
     {comment && <Comment project={document} />}

    <p className='blog-lable'>Tags: 
    {project.tag.map((t, index) => (
         <span className='tag' key={index}> <a href='#'>{t.value}</a>, </span>
             ))}</p>

             
            
</div>;
}
