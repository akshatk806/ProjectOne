import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"

const ProjectComments = () => {
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
    }

  return (
    <div className="project-comments">
        <h4>Project Comments</h4>
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