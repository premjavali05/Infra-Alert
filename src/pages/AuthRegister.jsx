import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthRegister.css';

const AuthRegister = () => {
  const [formData, setFormData] = useState({
    eid: '',
    name: '',
    phno: '',
    email: '',
    state: '',
    category: '',
    department: '',
    city: '',
    pass: ''
  });
  const [departments, setDepartments] = useState({});
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [error, setError] = useState('');
  const { authorityRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load departments data
    const loadDepartments = async () => {
      try {
        const response = await fetch('/data/departments.json');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error loading departments:', error);
      }
    };
    
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update available departments when state or category changes
    if (name === 'state' || name === 'category') {
      updateDepartments(
        name === 'state' ? value : formData.state,
        name === 'category' ? value : formData.category
      );
    }
  };

  const updateDepartments = (state, category) => {
    if (state && category && departments[category] && departments[category][state]) {
      setAvailableDepartments(departments[category][state]);
    } else {
      setAvailableDepartments([]);
    }
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
    
    const result = await authorityRegister(formData);
    
    if (result.success) {
      navigate('/auth-login');
    } else {
      setError(result.message || 'Registration failed. Employee ID may already exist.');
    }
  };

  return (
    <div className="auth-register-container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="infield">
            <input 
              type="text" 
              placeholder="Employee ID" 
              name="eid"
              value={formData.eid}
              onChange={handleChange}
              required
            />
            <label></label>
          </div>
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
              placeholder="Work Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label></label>
          </div>

          <label htmlFor="state">State</label>
          <select 
            id="state" 
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            <option value="AP">Andhra Pradesh</option>
            <option value="AR">Arunachal Pradesh</option>
            <option value="AS">Assam</option>
            <option value="BR">Bihar</option>
            <option value="CG">Chhattisgarh</option>
            <option value="GA">Goa</option>
            <option value="GJ">Gujarat</option>
            <option value="HR">Haryana</option>
            <option value="HP">Himachal Pradesh</option>
            <option value="JK">Jammu and Kashmir</option>
            <option value="JH">Jharkhand</option>
            <option value="KA">Karnataka</option>
            <option value="KL">Kerala</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="MH">Maharashtra</option>
            <option value="MN">Manipur</option>
            <option value="ML">Meghalaya</option>
            <option value="MZ">Mizoram</option>
            <option value="NL">Nagaland</option>
            <option value="OD">Odisha</option>
            <option value="PB">Punjab</option>
            <option value="RJ">Rajasthan</option>
            <option value="SK">Sikkim</option>
            <option value="TN">Tamil Nadu</option>
            <option value="TS">Telangana</option>
            <option value="TR">Tripura</option>
            <option value="UK">Uttarakhand</option>
            <option value="UP">Uttar Pradesh</option>
            <option value="WB">West Bengal</option>
            <option value="AN">Andaman and Nicobar Islands</option>
            <option value="CH">Chandigarh</option>
            <option value="DN">Dadra and Nagar Haveli</option>
            <option value="DD">Daman and Diu</option>
            <option value="DL">Delhi</option>
            <option value="LD">Lakshadweep</option>
            <option value="PY">Puducherry</option>
          </select>

          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="home_electricity">Home Electricity (Electricity Board)</option>
            <option value="street_lights">Street Lights (Municipal Corporation)</option>
            <option value="potholes">Potholes (Municipal Corporation)</option>
            <option value="garbage">Garbage (Municipal Corporation)</option>
          </select>

          <label htmlFor="department">Department</label>
          <select 
            id="department" 
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {availableDepartments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>

          <div className="infield">
            <input 
              type="text" 
              placeholder="City" 
              name="city"
              value={formData.city}
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
            <Link to="/auth-login">Sign In</Link>
          </button>
        </form>
      </div>
      
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <Link to="/auth-login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
        <Link to="/auth-login">
          <button id="overlayBtn"></button>
        </Link>
      </div>
    </div>
  );
};

export default AuthRegister;