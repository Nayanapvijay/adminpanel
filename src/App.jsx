import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect} from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VendorSidebar from "./components/columns/VendorSidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import CustomersPage from "./pages/Customer";
import VendorDetail from "./pages/VendorDetail";
import SalesReport from "./pages/SalesReport";
import LoginPage from "./components/LoginPage";



function App() {
  const [role, setRole] = useState(localStorage.getItem("role")); // Get role from localStorage

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role); // Save the role to localStorage
    }
  }, [role]);

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "admin" ? "vendor" : "admin"));
  };

  return (
    <Router>
      <div className="flex">
        {role && (role === 'admin' ? <Sidebar /> : <VendorSidebar />)}

        <div className="flex-1">
          {role && (
            <Header role={role} toggleRole={toggleRole} setRole={setRole} />

          )}

          <main className="p-4 overflow-auto">
            <Routes>
              <Route path="/login" element={<LoginPage setRole={setRole} />} />
              
              {role === "admin" ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : role === "vendor" ? (
                <Route path="/" element={<SalesReport />} />
              ) : (
                <Route path="/" element={<LoginPage setRole={setRole} />} />
              )}
              
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/vendor/:id" element={<VendorDetail />} />
              <Route path="/sales-reports" element={<SalesReport />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
