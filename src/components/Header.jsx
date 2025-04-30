import { useNavigate } from "react-router-dom";

const Header = ({ role, toggleRole, setRole }) => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (role) {
      // Logout
      localStorage.removeItem("role");
      setRole(null);
      navigate("/");
    } else {
      // Go to login page
      navigate("/");
    }
  };

  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        {role ? `Welcome, ${role === "admin" ? "Admin" : "Vendor"}` : "Welcome"}
      </h1>

      <div className="flex gap-4">
        {role && (
          <button
            onClick={toggleRole}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
          >
            Switch to {role === "admin" ? "Vendor" : "Admin"}
          </button>
        )}

        <button
          onClick={handleAuthAction}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded text-sm"
        >
          {role ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;
