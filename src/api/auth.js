// src/api/auth.js
import axios from "axios";



export const loginUser = async (credentials) => {
  const response = await axios.post("https://fishandmeatapp.onrender.com/api/auth/login", credentials);
  return response.data;
};
