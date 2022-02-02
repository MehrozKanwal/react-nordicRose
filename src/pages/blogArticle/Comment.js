import React, { useState } from 'react';
import {timeStamp} from '../../firebase/Config'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFireStore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


import './Comment.css'

export default function Comment({project}) {
const {updateDocument,response} = useFirestore('projects')
const [newComment, setNewComment] = useState('')
const {user} = useAuthContext()

  const handleSubmit = async (e) =>{
    e.preventDefault()
   if(user){
    const commentToAdd= {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      content: newComment,
      createdAt: timeStamp.fromDate(new Date()),
      id: Math.random()
    }
    await updateDocument(project.id,{
        comments: [...project.comments, commentToAdd],
    })
  
    if (!response.error) {
      setNewComment('')
    }
   }
    else{
      alert("You have to login first")
   }
  }
 
  return <div className='blog-comments'>
  <form className='add-comment' onSubmit={handleSubmit}>
  <label>
    <span><h4>Add Comment:</h4></span>
    <textarea
    required
    onChange={(e) => setNewComment(e.target.value)}
    value={newComment}
    ></textarea>
   </label>
   <button className='com-btn'>Add</button>
  </form>


  <ul className="comments-list">
        {project.comments && project.comments.map(comment => (
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

  </div>;
}
