import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles and images
import './Navbar.css'
import Logo from '../assets/temple.svg'

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
        <ul>
            <li className="logo">
                <img src={Logo} alt="myProject Logo" />
                <span><Link to="/">ProjectOne</Link></span>
            </li>

            {!user && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </>
            )}
            {user && (
              <li>
                  {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                  {isPending && <button className="btn" disabled>logging out...</button>}
              </li>
            )}      
        </ul>
    </nav>
  )
}

export default Navbar