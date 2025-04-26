import axios from "axios";

export const getAllCustomers = async () => {
  const response = await axios.get("https://fishandmeatapp.onrender.com/api/admin/vendors"); 
  return response.data.data;
};
