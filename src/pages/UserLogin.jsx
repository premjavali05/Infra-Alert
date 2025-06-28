import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const UserLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phone || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits');
      return;
    }
    
    const result = await userLogin(phone, password);
    
    if (result.success) {
      navigate('/main');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="infield">
            <input 
              type="text" 
              placeholder="Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
            <label></label>
          </div>
          
          <div className="infield">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label></label>
          </div>
          
          {error && <div className="message" style={{ color: '#ff2770' }}>{error}</div>}
          
          <button type="submit">Sign In</button>
          
          <button id="btn" className="mobile-only">
            <Link to="/user-register">Sign Up</Link>
          </button>
        </form>
      </div>
      
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Link to="/user-register">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
        <Link to="/user-register">
          <button id="overlayBtn"></button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;