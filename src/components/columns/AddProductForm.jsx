import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct } from "../../api/products"; // Add updateProduct API


const AddProductForm = ({ initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    offerPrice: "",
    availability: "", // default option
    category: "",
    image: null,
  });

  const queryClient = useQueryClient();
  const { mutate: addMutate, isLoading: addLoading, isError: addError, error: addErrorMessage } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onSuccess(); // Callback after success
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading, isError: updateError, error: updateErrorMessage } = useMutation({
    mutationFn: updateProduct,  // use the update mutation for editing
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onSuccess(); // Callback after success
    },
  });

  useEffect(() => {
    
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        offerPrice: initialData.offerPrice,
        availability: initialData.availability,
        category: initialData.category,
        image: null, // Image cannot be pre-filled, will be uploaded separately
      });
    }
  }, [initialData]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //console.log("Editing product ID:", initialData?.id);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("offerPrice", formData.offerPrice);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("category", formData.category);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    if (initialData) {
      updateMutate({
        id: initialData.id || initialData._id,
        data: formDataToSend,  
      });
    } else {
      addMutate(formDataToSend);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-md">
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title || ""}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description || ""}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price || ""}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock || ""}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="offerPrice"
        placeholder="Offer Price"
        value={formData.offerPrice || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="availability"
        value={formData.availability || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={addLoading || updateLoading}
      >
        {addLoading || updateLoading ? "Processing..." : initialData ? "Update Product" : "Add Product"}
      </button>

      {(addError || updateError) && (
  <p className="text-red-600 text-sm">
    Error: {addErrorMessage?.message || updateErrorMessage?.message}
  </p>
)}
    </form>
  );
};

export default AddProductForm;
