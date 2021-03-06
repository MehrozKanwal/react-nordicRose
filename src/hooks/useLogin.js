import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error , setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
         //sign the user out
        try{
         const res = await projectAuth.signInWithEmailAndPassword(email, password)
         // update online status
      const documentRef = projectFirestore.collection('users').doc(res.user.uid)
      await documentRef.update({ online: true })

         //dispatch login action
         dispatch({type: 'LOGIN' , payload:res.user})
         //update state
         if(!isCancelled){
            setError(null)
            setIsPending(false)
         }
        
        }
        catch(err){
            if(!isCancelled){
             console.log(err.message)
             setError(err.message)
             setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)

        }
    ,[])
    return {login , error, isPending}
}