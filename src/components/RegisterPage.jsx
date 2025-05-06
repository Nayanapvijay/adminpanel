import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://fishandmeatapp.onrender.com/api";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        phone,
      });

      setMessage("OTP sent to your email or phone. Please verify.");
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post(`${API_BASE_URL}/auth/verify`, {
        email,
        otp,
      });

      alert("Account verified successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h2>

        {message && <p className="text-green-600 text-sm mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 1 && (
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
