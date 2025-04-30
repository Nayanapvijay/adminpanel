import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://fishandmeatapp.onrender.com/api"; 

const LoginPage = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const navigate = useNavigate();

  // Countdown timer for Resend OTP
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
      setResendCountdown(30); // 30 seconds cooldown
    } catch (err) {
      alert("Failed to send OTP",err);
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
      alert("Failed to resend OTP",err);
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
      setRole("admin"); // or get from backend if role is dynamic
      navigate("/dashboard");
    } catch (err) {
      alert("OTP verification failed",err);
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

        {otpSent && (
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
        )}

        {!otpSent && (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
