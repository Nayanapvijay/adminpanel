import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
     
        <Link to="/dashboard" className="hover:text-blue-400 p-2">Dashboard</Link>
       
        <Link to="/products" className="hover:text-blue-400 p-2">Products</Link>
        <Link to="/customers" className="hover:text-blue-400 p-2">Customers</Link>
        <Link to="/sales-reports" className="hover:text-blue-400 p-2">Sales Report</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
