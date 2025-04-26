// src/api/products.js
import axios from "axios";

export const getAllProducts = async () => {
  const res = await axios.get("https://fishandmeatapp.onrender.com/api/admin/products");
  console.log("API response:", res.data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`https://fishandmeatapp.onrender.com/api/admin/product/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const res = await axios.post("https://fishandmeatapp.onrender.com/api/admin/analytics/top-product", productData);
  return res.data;
};

