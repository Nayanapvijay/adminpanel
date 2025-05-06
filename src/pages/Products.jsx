import { useState, useEffect } from "react";
import Product from "../components/columns/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, deleteProduct , updateProduct } from "../api/products";
import { useMutation } from "@tanstack/react-query";
import AddProductForm from "../components/columns/AddProductForm";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

const ProductsPage = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const handleDeleteProduct = (e) => {
      setProductToDelete(e.detail);
      setOpenDialog(true);
    };

    window.addEventListener("delete-product", handleDeleteProduct);
    return () => {
      window.removeEventListener("delete-product", handleDeleteProduct);
    };
  }, []);

  const products = data?.data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice the data for the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const queryClient = useQueryClient();
  
  // Delete mutation
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setSuccessMessage("Product deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    onError: () => {
      alert("Failed to delete the product. Please try again.");
    },
  });

  // Update mutation for updating the product
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    onError: () => {
      alert("Failed to update the product. Please try again.");
    },
  });

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError) return <div className="p-4 text-red-600">Error loading products.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>

        {/* Add New Product button */}
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setProductToEdit(null);
          }}
          className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
        >
          Add New Product
        </button>
      </div>

      {/* Show AddProductForm */}
      
          {showForm && (
            <AddProductForm
              initialData={productToEdit}
              onSuccess={() => {
                setProductToEdit(null);
                setShowForm(false);
                setSuccessMessage("Product updated successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
              }}
              onSubmit={updateMutation.mutate}  // Pass the update mutation here
            />
          )}
          
       

      {/* Display Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 rounded text-sm bg-green-100 text-green-800 border border-green-300">
          {successMessage}
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedProducts.map((product) => (
              <Product key={product.id} product={product}>
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    const event = new CustomEvent("delete-product", {
                      detail: product.id,
                    });

                    window.dispatchEvent(event);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Product>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMutation(productToDelete);
                setOpenDialog(false);
                setProductToDelete(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsPage;

