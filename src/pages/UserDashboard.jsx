import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data, error } = await supabase
          .from('complaint')
          .select('*')
          .eq('phno', user.phno)
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
    
    fetchComplaints();
  }, [user]);

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
          <h1>Complaint History</h1>
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
                  <th>Status</th>
                  <th>Solved Image</th>
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
                        {complaint.status === 'Solved' && complaint.solved_url && (
                          <a href={complaint.solved_url} target="_blank" rel="noreferrer">
                            <button>
                              <i className="ri-image-line"></i>
                            </button>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="no-data">No complaints found</td>
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

export default UserDashboard;