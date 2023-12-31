import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    // state variable for cancelling the subscription
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        // logout the user
        try {   
            // update online status
            const { uid } = user
            await projectFirestore.collection('users').doc(uid).update({ online: false })

            await projectAuth.signOut();       // firebase log out our user (asynchronous task)

            // dispatch logout action
            dispatch( {type: "LOGOUT"} )
            setIsPending(false);

            // update state (after component unmount we don't allow states to updating)
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
            // because only state update can rerendered the component
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
        return () => setIsCancelled(true)    // we want to cancel whatever is going on backgroud (asynchronous task)
    }, [])   // empty array for initial component render

    return { logout, error, isPending };
}