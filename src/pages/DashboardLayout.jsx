import { useState, useEffect } from 'react';
import Header from './components/Header';
import AdminSidebar from '../components/columns/Sidebar';
import VendorSidebar from '../components/columns/VendorSidebar';
import AdminDashboard from '../pages/Dashboard';
import VendorDashboard from '../pages/VendorDashboard';
import axios from 'axios';

const DashboardLayout = () => {
  // Initialize role based on localStorage or default to 'admin'
  const savedRole = localStorage.getItem('role') || 'admin';
  const [role, setRole] = useState(savedRole);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle role and save it to localStorage
  const toggleRole = () => {
    const newRole = role === 'admin' ? 'vendor' : 'admin';
    setRole(newRole);
    localStorage.setItem('role', newRole); // Save role to localStorage
  };

  // Fetch vendor applications when role is vendor
  useEffect(() => {
    const fetchApplications = async () => {
      if (role === 'vendor') {
        setLoading(true);
        try {
          const res = await axios.get('/api/vendor-applications');
          setApplications(res.data.applications || []);
        } catch (error) {
          console.error('Error fetching applications:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplications();
  }, [role]);

  return (
    <div className="flex">
      {/* Sidebar */}
      {role === 'admin' ? <Sidebar /> : <VendorSidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header role={role} toggleRole={toggleRole} />

        {/* Dashboard Content */}
        <div className="flex-1 bg-gray-100">
          {role === 'admin' ? (
            <Dashboard />
          ) : (
            <VendorDashboard applications={applications} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
