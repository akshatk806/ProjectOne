import { useState } from 'react'

// styles
import './Signup.css'

const Signup = () => {
  // states for the field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);     // nothing selected to begin with


  return (
    <form className="auth-form">
        <h2>Sign up</h2>
        <label>
          <span>email:</span>
          <input 
            type="email" 
            required
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input 
            type="password" 
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>name:</span>
          <input 
            type="text" 
            required
            onChange={e => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

        {/* for uploading image */}
        <label>
          <span>profile thumbnail:</span>
          <input 
            type="file"
          />
        </label>
        <button className="btn">Sign Up</button>
    </form>
  )
}

export default Signup