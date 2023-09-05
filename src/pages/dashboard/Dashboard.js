import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection'   // useCollection hook for to set up a real time listener for the projects collection
import ProjectFilter from './ProjectFilter'
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'projects', 
    null, 
    ["dueDate", "asc"]
  )
  
  const [currentFilter, setCurrentFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }
  
  // .filter method returns new array. Filter method fires a function for each item inside the documents array and if for the particular item we return true we keep that item in new array
  const filteredProjects = documents ? documents.filter(doc => {
    switch (currentFilter) {
      case "all": 
        return true        // returning true for all items of array. means all the items in documents we want to include in new array      

      case "mine":
        let assingedToMe = false
        doc.assingedUsersList.forEach(u => {
          if(user.uid === u.id) {
            assingedToMe = true
          }
        });
        return assingedToMe

      case 'development': 
      case 'design':
      case 'sales':
      case 'marketing':
        return doc.category === currentFilter

      default:
        return true
    }
  }) : null

  return (
    <div>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className='error'>{error}</p>}
        {documents && (
          <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
        )}
        {filteredProjects && <ProjectList projects={filteredProjects} />}    {/* documents is array of objects */}
    </div>
  )
}

export default Dashboard