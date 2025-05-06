import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://fishandmeatapp.onrender.com/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/resend`, { email });
      setOtpSent(true);
      setResendCountdown(30);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/resend`, { email });
      alert("OTP resent to your email");
      setResendCountdown(30);
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/verify`, {
        email,
        otp,
      });

      const token = res.data.data.token;
      const username = res.data.data.username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login via OTP</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />

        {otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded mb-2"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={resendOtp}
              className="w-full bg-gray-300 text-black p-2 rounded"
              disabled={resendCountdown > 0 || loading}
            >
              {resendCountdown > 0
                ? `Resend OTP in ${resendCountdown}s`
                : "Resend OTP"}
            </button>
          </>
        ) : (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline font-medium"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
