import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';
import axios from 'axios';
import '../styles/ComplaintForm.css';

const ComplaintForm = () => {
  const { category } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    date: new Date().toISOString().split('T')[0],
    state: '',
    category: category || '',
    dept: '',
    city: '',
    district: '',
    description: '',
    img_url: null
  });
  
  const [departments, setDepartments] = useState({});
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);

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
    
    // Update available departments when state changes
    if (name === 'state') {
      updateDepartments(value);
    }
  };

  const updateDepartments = (state) => {
    if (state && departments[formData.category] && departments[formData.category][state]) {
      setAvailableDepartments(departments[formData.category][state]);
    } else {
      setAvailableDepartments([]);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get human-readable address using reverse geocoding
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Error getting location. Please enable location services.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      // In a real app, you would use a proper geocoding service
      // For this example, we'll simulate it
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      
      const address = response.data.display_name;
      
      setLocationData({
        latitude,
        longitude,
        address
      });
      
      // Save location data to Supabase
      await saveLocation(latitude, longitude, address);
      
    } catch (error) {
      console.error('Error fetching address:', error);
      setError('Error fetching address. Please try again.');
    }
  };

  const saveLocation = async (latitude, longitude, address) => {
    try {
      const { error } = await supabase
        .from('save_location')
        .insert([
          {
            pno: user.phno,
            img_url: '',
            latitude,
            longitude,
            address
          }
        ]);
      
      if (error) throw error;
      
    } catch (error) {
      console.error('Error saving location:', error);
      setError('Error saving location data.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        img_url: file
      }));
      
      // Get location when image is selected
      getLocation();
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!formData.img_url) {
        setError('Please select an image');
        setLoading(false);
        return;
      }
      
      if (!locationData) {
        setError('Location data is required. Please allow location access.');
        setLoading(false);
        return;
      }
      
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(formData.img_url);
      
      // Generate complaint ID
      const { data: lastComplaint } = await supabase
        .from('complaint')
        .select('cid')
        .order('cid', { ascending: false })
        .limit(1);
      
      let nextCid = 'C101';
      if (lastComplaint && lastComplaint.length > 0) {
        const lastNumber = parseInt(lastComplaint[0].cid.substring(1));
        nextCid = 'C' + (lastNumber + 1);
      }
      
      // Insert complaint data
      const { error: complaintError } = await supabase
        .from('complaint')
        .insert([
          {
            cid: nextCid,
            phno: user.phno,
            name: formData.name,
            date: formData.date,
            state: formData.state,
            category: formData.category,
            dept: formData.dept,
            city: formData.city,
            district: formData.district,
            description: formData.description,
            img_url: imageUrl,
            status: 'Pending'
          }
        ]);
      
      if (complaintError) throw complaintError;
      
      // Update save_location with image URL
      const { error: locationError } = await supabase
        .from('save_location')
        .update({ img_url: imageUrl })
        .eq('pno', user.phno)
        .is('img_url', '');
      
      if (locationError) throw locationError;
      
      // Navigate to dashboard
      navigate('/user-dashboard');
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('Error submitting complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="complaint-container">
        <h2>Complaint Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
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
          <input 
            type="text" 
            id="category" 
            name="category"
            value={formData.category}
            readOnly
          />
          
          <label htmlFor="department">Department</label>
          <select 
            id="department" 
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {availableDepartments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
          
          <label htmlFor="city">City</label>
          <input 
            type="text" 
            id="city" 
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="district">District</label>
          <input 
            type="text" 
            id="district" 
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          
          <label htmlFor="img_url">Take Photo:</label>
          <input 
            type="file" 
            id="img_url" 
            name="img_url"
            accept="image/*"
            onChange={handleImageChange}
          />
          
          {locationData && (
            <div className="location-info">
              <p>Location captured successfully!</p>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ComplaintForm;