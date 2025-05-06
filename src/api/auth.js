// src/api/auth.js
import axios from "axios";





export const loginUser = async (credentials) => {
  const response = await axios.post(
    "https://fishandmeatapp.onrender.com/api/auth/login",
    credentials,
    {
      headers: {
        "Content-Type": "application/json", // ensures JSON format
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // optional, if token is needed
      },
    }
  );
  return response.data;
};

