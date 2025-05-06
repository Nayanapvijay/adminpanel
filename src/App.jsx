import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import RegisterPage from "./components/RegisterPage";
import ProductsPage from "./pages/Products";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex">
      {!isAuthPage && <Sidebar />}

      <div className="flex-1">
        {!isAuthPage && <Header />}

        <main className="p-4 overflow-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/vendor/:id" element={<VendorDetail />} />
            <Route path="/sales-reports" element={<SalesReport />} />
            <Route path="/add-products" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;