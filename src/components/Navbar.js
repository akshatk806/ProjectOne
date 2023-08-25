import { Link } from 'react-router-dom';

// styles and images
import './Navbar.css'
import Logo from '../assets/temple.svg'

const Navbar = () => {
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
                <button className="btn">Logout</button>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar