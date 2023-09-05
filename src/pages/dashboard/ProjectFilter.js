import { useState } from "react";

const filerList = ['all', 'mine', 'developement', 'design', 'marketing', 'sales'];

const ProjectFilter = () => {
    const [currentFilter, setCurrentFilter] = useState('all')
    const handleClick = newFilter => {
        // console.log(newFilter);
        setCurrentFilter(newFilter)
    }

  return (
    <div className="project-filter">
        <nav>
            <p>Filter by:</p>
            {filerList.map(filter => (
                <button key={filter} onClick={() => handleClick(filter)} className={currentFilter === filter ? 'active' : ''}>
                    {filter}
                </button>
            ))}
        </nav>
    </div>
  )
}

export default ProjectFilter