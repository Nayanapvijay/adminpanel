import { useEffect, useState } from 'react';
import axios from 'axios';


const SalesReport = () => {
  
  const [salesReport, setSalesReport] = useState(null);
  const [, setError] = useState(null);

 

  // Fetch the sales report data
  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get(
          'https://fishandmeatapp.onrender.com/api/admin/analytics/sales-report'
        );
        setSalesReport(response.data.data);  // Set the sales report data
      } catch (error) {
        console.error("Error fetching sales report:", error);
        setError("Error fetching sales report.");
      }
    };

    fetchSalesReport();
  }, []);  // Empty dependency array to only run once when the component mounts

  
  return (
    <div className="p-6">
      
      {/* Sales Report */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

        {salesReport ? (
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <p><strong>Total Revenue:</strong> ₹{salesReport.totalRevenue}</p>
            <p><strong>Total Orders:</strong> {salesReport.totalOrders}</p>
          </div>
        ) : (
          <p>Loading sales report...</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
