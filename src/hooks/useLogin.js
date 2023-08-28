import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {   
            const response = await projectAuth.signInWithEmailAndPassword(email, password);   // this function returns a response object

            // update the online property of the user once they loggedin in firestore database
            await projectFirestore.collection('users').doc(response.user.uid).update({ online: true })

            dispatch( {type: "LOGIN", payload: response.user} )
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch(err) {
            if(!isCancelled) {
                console.log(err.message);
                setError(err.message);        
                setIsPending(false);
            }
        }
    }
    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)  
    }, []) 

    return { login, error, isPending };
}