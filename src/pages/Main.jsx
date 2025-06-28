import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/Main.css';

const Main = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="main-container">
        <h1 className="welcome-title">
          <span style={{ color: 'white' }}>Welcome </span>
          <span className="name-color">{user?.name || 'User'}</span>
        </h1>
        <h2 className="welcome-dept">Choose the Department</h2>
        
        <div className="card-grid">
          {/* Card 1 */}
          <div className="card-item">
            <img src="/images/home.jpg" alt="home_electricity" className="card-image" />
            <h2>HOME ELECTRICITY</h2>
            <Link 
              to="/complaint-form/home_electricity" 
              className="complaint-link"
            >
              Raise Complaint
            </Link>
          </div>
          
          {/* Card 2 */}
          <div className="card-item">
            <img src="/images/street.jpg" alt="streetlights" className="card-image" />
            <h2>STREET LIGHTS</h2>
            <Link 
              to="/complaint-form/street_lights" 
              className="complaint-link"
            >
              Raise Complaint
            </Link>
          </div>
          
          {/* Card 3 */}
          <div className="card-item">
            <img src="/images/pothole.jpg" alt="POTHOLES" className="card-image" />
            <h2>POTHOLES</h2>
            <Link 
              to="/complaint-form/potholes" 
              className="complaint-link"
            >
              Raise Complaint
            </Link>
          </div>
          
          {/* Card 4 */}
          <div className="card-item">
            <img src="/images/garbage1.jpg" alt="Garbage" className="card-image" />
            <h2>GARBAGE</h2>
            <Link 
              to="/complaint-form/garbage" 
              className="complaint-link"
            >
              Raise Complaint
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;