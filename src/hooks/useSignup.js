import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"

// import useAuthContext hook so that we have access to that context object, and in that context object we have dispatch function
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    // state variable for cancelling the subscription
    const [isCancelled, setIsCancelled] = useState(false)

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();
 
    // once the user is submit the form then only we invoked the below function that comes from this hook
    const signup = async (email, password, displayName, thumbnail) => {
        setError(null);   // imaging we fill up the form and we click on submit button, we call this signup function which takes 3 arguments and then some kind of error and then firebase comes up the error
        // we set the error everytime we try to signup

        setIsPending(true);

        try {
            // signup the user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);   // when user signup then firebase automatically loggedin the user automatically
            // console.log(response.user);  // user just created
            /*
            reponse.user = {
                ----
                ----
                ----
                displayName:
                email:
                ----
                ----
            }
            */

            if(!response) {
                throw new Error("Could not complete signup");
            }

            // upload user thumbnail 
            // step (i) creating upload path, that upload path is a folder structure
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;   // created a upload path where is the image is stored in the bucket

            // step (ii) upload the image
            const image = await projectStorage.ref(uploadPath).put(thumbnail);  
            const imageURL = await image.ref.getDownloadURL();   // this gets up the url of the image


            // add the displayName to user in DB
            await response.user.updateProfile( {displayName: displayName, photoURL: imageURL } );    // with response we get a user object

            // creating a user document (we creting a firestore document for the user)
            await projectFirestore.collection('users').doc(response.user.uid).set({
                online: true,
                displayName: displayName,
                photoURL: imageURL
            })    // if we use .add() then firestore automatically assings a new document in id property but this time I want that the id not to be auto generated by firestore but I wanna create a id myself, I want the document id to be the same as id of the user

            // 56->60: we are creating a new document inside users collection for every user which signsup the id of that docuemnt is same as user id

            
            // dipatch login action
            dispatch({ type: 'LOGIN', payload: response.user})           // the input to dipatch method is action, which has two property i.e, type of action and payload 

            // update state (after component unmount we don't allow states to updating)
            if(!isCancelled) {
                setIsPending(false);
                setError(null);
            }
            // because only state update can rerendered the component
        }
        catch(err) {
            // if signup fails then we catch the error
            if(!isCancelled) {
                console.log(err.message);
                setError(err.message);         // like email is already taken etc.
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)    // we want to cancel whatever is going on backgroud (asynchronous task)
    }, [])   // empty array for initial component render

    return { error, isPending, signup };
}