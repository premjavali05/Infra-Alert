import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const AuthLogin = () => {
  const [eid, setEid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authorityLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eid || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const result = await authorityLogin(eid, password);
    
    if (result.success) {
      navigate('/auth-dashboard');
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
              placeholder="Employee ID" 
              value={eid}
              onChange={(e) => setEid(e.target.value)}
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
            <Link to="/auth-register">Sign Up</Link>
          </button>
        </form>
      </div>
      
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Link to="/auth-register">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
        <Link to="/auth-register">
          <button id="overlayBtn"></button>
        </Link>
      </div>
    </div>
  );
};

export default AuthLogin;