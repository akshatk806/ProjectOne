import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

// styles and images
import './Navbar.css'
import Logo from '../assets/temple.svg'

const Navbar = () => {
  const { logout, isPending } = useLogout();

  return (
    <nav className="navbar">
        <ul>
            <li className="logo">
                <img src={Logo} alt="myProject Logo" />
                <span><Link exact to="/">MyProject</Link></span>
            </li>

            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li>
                {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button className="btn" disabled>logging out...</button>}
            </li>
        </ul>
    </nav>
  )
}

export default Navbar