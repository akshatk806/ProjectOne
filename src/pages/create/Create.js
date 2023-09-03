import { useState } from 'react'
import Select from 'react-select';

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
  // form fields value
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assingedUsers, setAssingedUsers] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(name, details, dueDate, category.value);
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input 
            type="text" 
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea 
            type="text" 
            onChange={e => setDetails(e.target.value)}
            value={details}
            required
          ></textarea>  
        </label>
        <label>
          <span>Set Due Date:</span>
          <input 
            type="date" 
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select 
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
        </label>

        <button className="btn">Add Project</button>
      </form>
    </div>
  )
}

export default Create