import { Link } from 'react-router-dom';

const VendorSidebar = () => {
  return (
    <div className="w-64 bg-gray-700 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Vendor Dashboard</h2>
      <ul className="space-y-4">
        <li className="hover:text-green-600 p-2 rounded cursor-pointer">
          <Link to="/sales-reports">Sales reports</Link>
        </li>
        <li className="hover:text-green-600 p-2 rounded cursor-pointer">
        <Link to="/products">Products</Link>
        </li>
        
      
      </ul>
    </div>
  );
};

export default VendorSidebar;

  