import { useState } from 'react'

// styles
import './Signup.css'

const Signup = () => {
  // states for the field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);     // nothing is selected to begin with
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleFileChange = e => {
    setThumbnail(null);
    let selected = e.target.files[0];   // e.target.files returns an array of files
    // so we select first file from the array

    // console.log(selected);

    if(!selected) {
      setThumbnailError("Please Select a file");
      return;
    }
    if(!selected.type.includes("image")) {
      setThumbnailError("Invalid file type");
      return;
    }
    if(selected.size > 1000000) { // 1 mb
      setThumbnailError("Image file size must be less than 1MB")
      return;
    }  

    // file is that selected is valid
    setThumbnailError(null);
    setThumbnail(selected);
    // console.log("thumbnail updated");
  }

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(email, password, displayName, thumbnail);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
            onChange={handleFileChange}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <button className="btn">Sign Up</button>
    </form>
  )
}

export default Signup