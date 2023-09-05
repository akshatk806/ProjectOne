import { useEffect, useState } from 'react'
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
  const history = useHistory();

  const { addDocument, response } = useFirestore('projects')

  const { documents } = useCollection('users');
  // console.log(documents) // all the documents with their displayName, online and photoURL as property of object 

  // when we pass array of object as options in Select component, each object has two properties value and label so we map through the documents and return a new array where each object has value and label
  const [users, setUsers] = useState([]);    // map through the documents of line 16 to create a new array based on the array of users and that new array of users is array of objects that will be passes as option in Select component
  // users array containing object having 5 properties, 3 is same as documents and 2 new which is value and label

  const { user } = useAuthContext();

  // form fields value
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assingedUsers, setAssingedUsers] = useState([]);

  // form error state
  const [formError, setFormError] = useState(null);


  // cont... line 20: We have to map through documents objects to populate users. We use useEffect hook because the useEffect can listen the documents by listing the documents as depedency array and when documents is changing from null to list of users (coming from users colletion) we can fire the code to map them and then update the users based to that
  useEffect(() => {
    // inside the function we are going to map through documents
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }   // completely new array
      })
      // console.log(options)     options: [{value: ..., label: ...}, {value: ..., label: ...}]
      setUsers(options);
    }
  }, [documents])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);   // every time we submit the form at beginning the error should be null

    if(!category) {
      setFormError('Please select a project category');
      return;
    }
    if(assingedUsers.length === 0) {
      setFormError('Please assinged the project to atleast 1 user')
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // assingedUsersList is a new array of objects, where each objects has 3 properties
    const assingedUsersList = assingedUsers.map(user => {
      return { 
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    // project object, this object will going to save to the database as a document
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assingedUsersList
    }
    // console.log(project)
    await addDocument(project)

    // redirect user if no error to home page
    if(!response.error) {
      history.push('/')
    }
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
          <Select 
            onChange={option => setAssingedUsers(option)}
            options={users}
            isMulti
            menuPlacement="auto"
            maxMenuHeight={150}
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create