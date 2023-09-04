import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

import Avatar from "../../components/Avatar"

const ProjectComments = ({ project }) => {
    const { updateDocument, response } = useFirestore('projects');
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // create a new javascript object which represents the comment
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        // console.log(commentToAdd)
        await updateDocument(project.id, {      // passing id of the document that we want to update
            comments: [...project.comments, commentToAdd]
        }) 
        
        // reset the comment
        if(!response.error) {
            setNewComment('');
        }
    }

  return (
    <div className="project-comments">
        <h4>Project Comments</h4>

        {/* listing all the comments */}
        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL}/>
                        <p>{comment.displayName}</p>
                    </div>
                    <div className="comment-date">
                        <p>date here</p>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))}
        </ul>

        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Add New Comment:</span>
                <textarea
                    required
                    onChange={e => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
            </label>

            <button className="btn">Add comment</button>
        </form>
    </div>
  )
}

export default ProjectComments