import CustomerTable from "../components/columns/CustomerTable";

const CustomersPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <p className="text-gray-600">Manage all registered customers and their activity.</p>
      <CustomerTable />
    </div>
  );
};

export default CustomersPage;
