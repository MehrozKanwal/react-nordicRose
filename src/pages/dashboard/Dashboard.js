import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
//Stylesheet
import './Dashboard.css'
import Sidebar from '../../components/Sidebar';

export default function Dashboard() {
  
  const { documents, error } = useCollection('projects')
  const {user} = useAuthContext()

  
  return <div  className='dashboard'>
  
  
     {/* <button className='btn' onClick={handleCreate}>Create</button>
     {!isPending && <button className='btn' onClick={logout}>Logout</button>}
     {isPending && <button className='btn' disabled onClick={logout}>Logging out</button>}
     {error && <p className="error">{error}</p>} */}
     
     
     
     <Sidebar />
     <div className='other-blogs' >
     {/* {documents.length === 0 && <p>No blogs yet!</p>} */}
     { user && documents && documents.map((doc)=>{
      if(user.uid===doc.createdBy.id){
        return(
          
        <div className="each-blog" key={doc.id}>
          <img className='all-blog-img' src={doc.blogImg}/>
          <h4 className='all-blog-title'>{doc.title}</h4>
         
        </div>
         
        ) }

     })}
     </div>
     
     
  </div>;
}
