import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles
import './Login.css'   // auth-form class css written in signup.css but that signup.css is become global so we don't need to write another css code in login.css
// the signup.css is global file and its injected in head of the page unlike css modules 

const Login = () => {
  // state for the fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(email, password)
    login(email, password); 
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login