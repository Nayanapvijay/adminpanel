import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-50 min-h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <Link to="/customers" className="hover:text-blue-400">Customers</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
