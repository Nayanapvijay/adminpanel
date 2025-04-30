import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "../components/data-table";
import { columns as getColumns } from "../components/columns/vendors";
import { useEffect, useState } from "react";
import VendorDetail from "../pages/VendorDetail";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui/dialog";

const fetchVendors = async () => {
  const res = await axios.get(
    "https://fishandmeatapp.onrender.com/api/admin/vendors"
  );
  return res.data;
};

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });

  useEffect(() => {
    if (data?.data) {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = data.data.filter((vendor) =>
        `${vendor.name} ${vendor.email} ${vendor.phone} ${vendor.location}`
          .toLowerCase()
          .includes(lowerSearch)
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  // const closeModal = () => setSelectedVendor(null);

  if (isLoading) return <div className="p-4">Loading vendors...</div>;
  if (isError)
    return <div className="p-4 text-red-600">Error fetching vendors.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, email, phone, location..."
        className="mb-4 w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <DataTable
        columns={getColumns({ onView: setSelectedVendor })}
        data={filteredData}
      />

      {/* Modal View for Selected Vendor */}
      <Dialog open={!!selectedVendor} onOpenChange={setSelectedVendor}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && <VendorDetail vendor={selectedVendor} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
