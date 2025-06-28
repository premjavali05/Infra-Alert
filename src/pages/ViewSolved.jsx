import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';
import '../styles/AuthDashboard.css';

const ViewSolved = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterCid, setFilterCid] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaint')
        .select('*')
        .eq('category', user.category)
        .eq('dept', user.department)
        .eq('state', user.state)
        .eq('city', user.city)
        .eq('status', 'Solved')
        .order('date', { ascending: false });
      
      if (error) throw error;
      
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    
    if (filterCid) {
      filterComplaints(filterCid);
    } else {
      fetchComplaints();
    }
  };

  const filterComplaints = async (cid) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('complaint')
        .select('*')
        .eq('category', user.category)
        .eq('dept', user.department)
        .eq('state', user.state)
        .eq('city', user.city)
        .eq('status', 'Solved')
        .eq('cid', cid);
      
      if (error) throw error;
      
      setComplaints(data || []);
    } catch (error) {
      console.error('Error filtering complaints:', error);
      setError('Failed to filter complaints');
    } finally {
      setLoading(false);
    }
  };

  const openPdf = async (phno, img_url) => {
    try {
      // In a real implementation, this would generate a PDF
      // For now, we'll just open the image in a new tab
      window.open(img_url, '_blank');
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const openSolvedPdf = async (phno, img_url) => {
    try {
      // In a real implementation, this would generate a PDF with both images
      // For now, we'll just open the solved image in a new tab
      window.open(img_url, '_blank');
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-title">
          <div className="search-bar">
            <h1>Complaints Solved</h1>
            <form onSubmit={handleFilter} className="filter-form">
              <input 
                type="text" 
                placeholder="Enter Complaint ID"
                value={filterCid}
                onChange={(e) => setFilterCid(e.target.value)}
              />
              <button type="submit">Filter</button>
            </form>
          </div>
          
          <div className="dashboard-links">
            <Link to="/auth-dashboard" className="btn">Complaints Pending</Link>
            <Link to="/view-inprogress" className="btn">Complaints In Progress</Link>
            <Link to="/view-rejected" className="btn">Complaints Rejected</Link>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="table-container">
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>C ID</th>
                  <th>Date</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Department</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Complaint PDF</th>
                  <th>Status</th>
                  <th>Final PDF</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((complaint, index) => (
                    <tr key={complaint.cid}>
                      <td>{index + 1}</td>
                      <td>{complaint.cid}</td>
                      <td>{complaint.date}</td>
                      <td>{complaint.phno}</td>
                      <td>{complaint.category}</td>
                      <td>{complaint.dept}</td>
                      <td>{complaint.state}</td>
                      <td>{complaint.city}</td>
                      <td>
                        <button onClick={() => openPdf(complaint.phno, complaint.img_url)}>
                          <i className="ri-link"></i>
                        </button>
                      </td>
                      <td>{complaint.status}</td>
                      <td>
                        {complaint.solved_url && (
                          <button onClick={() => openSolvedPdf(complaint.phno, complaint.solved_url)}>
                            <i className="ri-link"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="no-data">No solved complaints found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewSolved;