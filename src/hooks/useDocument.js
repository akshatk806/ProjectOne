import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for the document
    useEffect(()=> {
        // ref to that particular document
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubsribe = ref.onSnapshot(snapshot => {               // .onSnapshot method returns and an unsubsribe funtion and now we have to invoke that function in line 22 
            if(snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null);
            }
            else {
                setError('No Such Project exists')
            }

        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })

        // cleanup function so that we unsubscribe the line 13 if we leave up the page. Return a function which fires up whenever the component that uses this useDocument hook unmounts, so if we go another page component unmounts and fires cleanup function at that we have to unsubsribe from real time data of line 11 for the document
        return () => unsubsribe()

    }, [collection, id])

    return { document, error }
}