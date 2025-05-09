const Product = ({ product, children }) => {
 
  return (
    <div className="relative bg-white rounded-lg shadow p-4 flex flex-col justify-between min-h-[200px]">
      <div>
        <h3 className="text-lg font-semibold">{product.title}</h3>
        {product.image && (
          <img
            src={`https://fishandmeatapp.onrender.com/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-sm font-medium mt-2">Price: ${product.price}</p>
      </div>

      <div className="mt-4 flex justify-between items-center gap-2">
        {children}
      </div>
    </div>
  );
};
export default Product;