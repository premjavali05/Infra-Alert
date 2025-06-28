import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    phno: '',
    email: '',
    pass: ''
  });
  const [error, setError] = useState('');
  const { userRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.phno)) {
      setError('Phone number must be 10 digits');
      return;
    }
    
    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    const result = await userRegister(formData);
    
    if (result.success) {
      navigate('/user-login');
    } else {
      setError(result.message || 'Registration failed. Phone number may already exist.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="infield">
            <input 
              type="text" 
              placeholder="Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label></label>
          </div>
          <div className="infield">
            <input 
              type="text" 
              placeholder="Phone Number" 
              name="phno"
              value={formData.phno}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
            <label></label>
          </div>
          <div className="infield">
            <input 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label></label>
          </div>
          <div className="infield">
            <input 
              type="password" 
              placeholder="Password" 
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
            <label></label>
          </div>
          
          {error && <div className="message" style={{ color: '#ff2770' }}>{error}</div>}
          
          <button type="submit">Sign Up</button>
          
          <button id="btn" className="mobile-only">
            <Link to="/user-login">Sign In</Link>
          </button>
        </form>
      </div>
      
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <Link to="/user-login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
        <Link to="/user-login">
          <button id="overlayBtn"></button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegister;