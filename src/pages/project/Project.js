import { useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"

// styles
import './Project.css'
import ProjectSummary from "./ProjectSummary"
import ProjectComments from "./ProjectComments"

const Project = () => {
  const { id } = useParams()       // extracing a parameter from a route

  const { error, document } = useDocument('projects', id)    // 'projects' is collection name

  if(error) {
    return <div className="error">{error}</div>   // returning a template
  }

  if(!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments />
    </div>
  )
}

export default Project