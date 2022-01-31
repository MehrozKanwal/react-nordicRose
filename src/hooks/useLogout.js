import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error , setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const {dispatch, user} = useAuthContext()
    const navigate = useNavigate()

    const logout = async () => {
        setError(null)
        setIsPending(true)
         //sign the user out
        try{
            // updae status
            const {uid} = user
            await projectFirestore.collection('users').doc(uid).update({online: false})

         await projectAuth.signOut()

         //dispatch logout action
         dispatch({type: 'LOGOUT'})
         navigate('/login')
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
    return {logout , error, isPending}
}