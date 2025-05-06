import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // or any auth flag
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token"); // Remove token or auth flag
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Welcome Admin,</h1>

      <div>
        <button
          onClick={handleAuthAction}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1 rounded text-sm"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;
