import React, { useState } from 'react';
import Select from 'react-select';
import { useAuthContext } from '../../hooks/useAuthContext';
import { timeStamp, projectStorage } from '../../firebase/Config'
import { useFirestore } from '../../hooks/useFireStore';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
//Stylesheet
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState("")
  const [tag, setTag] = useState(null)
  const [thumbnailimg, setThumbnailimg] = useState(null)
  const [readtime, setReadtime] = useState("")
  const [content, setContent] = useState("")
  const [formError, setFormError] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const {addDocument, response} = useFirestore("projects")
  const { documents } = useCollection('users')



  const options = [
    { value: 'Design', label: 'Design' },
    { value: 'Food', label: 'Food' },
    { value: 'Sales', label: 'Marketing' },
    { value: 'Technology', label: 'Technology' }
  ];
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title, tag, thumbnailimg,  readtime, content)
    if (!tag) {
     setFormError('Please select a project category.')
      return
    }
    const createdBy = { 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        id: user.uid                                                
      }
    const uploadPath = `thumbnails/${user.uid}/${thumbnailimg.name}`
    const img = await projectStorage.ref(uploadPath).put(thumbnailimg)
    const imgUrl = await img.ref.getDownloadURL();
    

    const project = {                               
        title,
        tag: tag, 
        createdBy,
        createdAt: timeStamp.fromDate(new Date()),
        readtime,
        content,
        blogImg:imgUrl,
        comments: [],
        likes: []
      }
      await addDocument(project)
      if(!response.error){
        navigate("/")
      }
  }

  const handleFileChange = (e) => {
    setThumbnailimg(null)
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
      setThumbnailError('Image file size must be less than 1MB')
      return
    }
    
    setThumbnailError(null)
    setThumbnailimg(selected)
    console.log('thumbnail updated')
  }

  

  return <div className='create'>
  
      <form className='create-form' onSubmit={handleSubmit}>
      <h1>CREATE NEW BLOG POST</h1>
      <div className='form-creation'>
      <label>
        <span>TITLE</span>
        <input
          required 
          type="text" 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
        />
      </label>
      <label>
        <span>TAG</span>
        <Select 
           className = "tag"
           defaultValue={tag}
           onChange={(option)=>setTag(option)}
           options={options}
           isMulti
       />
      {formError && <p className="error">{formError}</p>}        

      </label>
      <label>
        <span>ATTACHMENT</span>
        <input 
         placeholder='Choose Image'
          required
          onChange={handleFileChange}
          type="file"
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <label>
        <span>READ TIME</span>
        <input 
          required
          type="TEXT" 
          onChange={(e) => setReadtime(e.target.value)} 
          value={readtime}
        />
      </label>
      </div>
      <div className='content'>
      <label>
        <span>CONTENT</span>
        <textarea 
          required
          type="TEXT" 
          onChange={(e) => setContent(e.target.value)} 
          value={content}
        />
      </label>
      </div>
      <button className="btn" id='create-btn'>CREATE</button>

      </form>
  </div>;
}
