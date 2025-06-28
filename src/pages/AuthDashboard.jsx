import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';
import '../styles/AuthDashboard.css';

const AuthDashboard = () => {
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
        .eq('status', 'Pending')
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
        .eq('status', 'Pending')
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

  const markInProgress = async (cid) => {
    try {
      const { error } = await supabase
        .from('complaint')
        .update({ status: 'In Progress' })
        .eq('cid', cid);
      
      if (error) throw error;
      
      // Refresh complaints
      fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      setError('Failed to update complaint status');
    }
  };

  const markSolved = async (cid) => {
    try {
      // In a real implementation, this would open a form to upload the solved image
      // For now, we'll just update the status
      const { error } = await supabase
        .from('complaint')
        .update({ status: 'Solved' })
        .eq('cid', cid);
      
      if (error) throw error;
      
      // Refresh complaints
      fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      setError('Failed to update complaint status');
    }
  };

  const markRejected = async (cid) => {
    try {
      const { error } = await supabase
        .from('complaint')
        .update({ status: 'Rejected' })
        .eq('cid', cid);
      
      if (error) throw error;
      
      // Refresh complaints
      fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      setError('Failed to update complaint status');
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

  return (
    <>
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-title">
          <div className="search-bar">
            <h1>Complaint History</h1>
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
            <Link to="/view-inprogress" className="btn">Complaints In Progress</Link>
            <Link to="/view-solved" className="btn">Complaints Solved</Link>
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
                  <th>PDF</th>
                  <th>View</th>
                  <th>Solved</th>
                  <th>Rejected</th>
                  <th>Status</th>
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
                      <td>
                        <button onClick={() => markInProgress(complaint.cid)}>
                          <i className="ri-check-line"></i>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => markSolved(complaint.cid)}>
                          <i className="ri-check-double-line"></i>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => markRejected(complaint.cid)}>
                          <i className="ri-close-line"></i>
                        </button>
                      </td>
                      <td>{complaint.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="no-data">No pending complaints found</td>
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

export default AuthDashboard;