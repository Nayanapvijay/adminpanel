const VendorDetail = ({ vendor }) => {
    if (!vendor) return null;
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">{vendor.name}</h2>
        <p><strong>Email:</strong> {vendor.email}</p>
        <p><strong>Phone:</strong> {vendor.phone}</p>
        <p><strong>Location:</strong> {vendor.location}</p>
        <p><strong>Status:</strong> {vendor.status}</p>
      </div>
    );
  };
  
  export default VendorDetail;
  