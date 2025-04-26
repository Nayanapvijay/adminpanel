import axios from "axios";

export const getAllOrders = async () => {
  const res = await axios.post("https://fishandmeatapp.onrender.com/api/admin/orders",{});
  console.log("Full response:", res.data); 
  return res.data; 
};

