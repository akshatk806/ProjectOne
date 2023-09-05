import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection'   // useCollection hook for to set up a real time listener for the projects collection
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css';

const Dashboard = () => {
  const { documents, error } = useCollection('projects')

  return (
    <div>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && <ProjectFilter />}
        {documents && <ProjectList projects={documents} />}    {/* documents is array of objects */}
    </div>
  )
}

export default Dashboard