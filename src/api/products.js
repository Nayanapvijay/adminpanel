// src/api/products.js
import axios from "axios";

const API_BASE_URL = "https://fishandmeatapp.onrender.com";

export const getAllProducts = async () => {
  const res = await axios.get("https://fishandmeatapp.onrender.com/api/admin/products");
  console.log("API response:", res.data);
  return res.data;
};

export const deleteProduct = async (id) => {
  
  const token = localStorage.getItem("token");  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  
    },
  };

  try {
    const res = await axios.delete(
      `https://fishandmeatapp.onrender.com/api/products/${id}`,
      config
    );
    return res.data;
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const addProduct = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is missing");

  return await axios.post("https://fishandmeatapp.onrender.com/api/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = async ( {id, data} ) => {
  if (!id) throw new Error("Product ID is required to update the product.");
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `https://fishandmeatapp.onrender.com/api/products/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return response.data;
};