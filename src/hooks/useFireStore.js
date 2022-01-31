import { useState , useEffect, useReducer } from "react";
import { projectFirestore , timeStamp} from "../firebase/Config";
let initialState = {
    document: null,
    isPending: false , 
    error: null,
    success: null
}

const firestoreReducer =  (state , action) => {
 switch (action.type){
     case 'IS_PENDING':
         return {isPending: true , document: null, success: false, error: null}
    case 'ADDED_DOCUMENT':
         return { isPending: false , document: action.payload , success: true , error: null}
    case 'DELETED_DOCUMENT':
         return { isPending: false , document: null , success: true , error: null} 
    case 'ERROR':
         return {isPending : false , document: null , success: false, error: action.payload}
    default:
        return state
 }



}
 export const useFirestore = (collection) => {
     const [response , dispatch] = 
     useReducer(firestoreReducer , initialState)
     const [iscancelled , setIsCancelled] = useState(false)

     const ref = projectFirestore.collection(collection)
     // only dispatch is not cancelled
     const dispatchIfNotCancelled = (action) => {
         if(!iscancelled){
             dispatch(action)
         }
     }
     // Add document
      const addDocument = async (doc) => {
          dispatch ({type: 'IS_PENDING'})
          try{
              const createdAt = timeStamp.fromDate(new Date())
            const addedDocument =  await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT' , payload:addedDocument })
          }
          catch(err){
           dispatchIfNotCancelled({type: 'ERROR' , payload: err.message})
          }

      }
      // Delete Document
      const delDocument = async (id) => {
          dispatch({type: 'IS_PENDING'})
          try{
           const deletedDocument = await ref.doc(id).delete()
           dispatchIfNotCancelled({type: "DELETED_DOCUMENT" , payload: deletedDocument})
          }
          catch(err){
            dispatchIfNotCancelled({type:"ERROR" , payload: "could not delete"})
          }
          
      }

      useEffect (() => {
          return () => setIsCancelled(true)
      } , [])

      return {addDocument,delDocument , response}

 }


