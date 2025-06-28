import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ showDashboard = true }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, userType, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
      
      <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
        {!isAuthenticated ? (
          <>
            <Link to="/"><li><i className="ri-home-2-line"></i> Home</li></Link>
            <a href="#about"><li><i className="ri-information-line"></i> About</li></a>
            <a href="#dept"><li><i className="ri-building-2-line"></i> Department</li></a>
            <a href="#contact"><li><i className="ri-phone-line"></i> Contact</li></a>
            <Link to="/user-login"><li><i className="ri-user-line"></i> User Login</li></Link>
            <Link to="/auth-login"><li><i className="ri-admin-line"></i> Auth Login</li></Link>
          </>
        ) : userType === 'user' ? (
          <>
            <Link to="/main"><li><i className="ri-home-2-line"></i> Home</li></Link>
            {showDashboard && (
              <Link to="/user-dashboard"><li><i className="ri-dashboard-line"></i> Dashboard</li></Link>
            )}
            <li onClick={handleLogout}><i className="ri-logout-box-r-line"></i> Logout</li>
          </>
        ) : (
          <>
            <Link to="/auth-dashboard"><li><i className="ri-home-2-line"></i> Home</li></Link>
            <li onClick={handleLogout}><i className="ri-logout-box-r-line"></i> Logout</li>
          </>
        )}
      </ul>
      
      <div className={`nav-toggle ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;