import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../api/Customer";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

const CustomerTable = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "totalOrders",
      header: "Total Orders",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
         <Button
  size="sm"
  variant="outline"
  onClick={() => handleView(row.original)}
>
  View
</Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => console.log("Blocking", row.original)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Loading customers...</div>;
  if (isError) return <div className="p-4 text-red-600">Failed to load customers.</div>;


  return (
    <div className="rounded-xl border shadow-sm overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Customer Details</DialogTitle>
    </DialogHeader>
    {selectedCustomer && (
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {selectedCustomer.name}</p>
        <p><strong>Email:</strong> {selectedCustomer.email}</p>
        <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
        <p><strong>Status:</strong> {selectedCustomer.status}</p>
        <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
      </div>
    )}
  </DialogContent>
</Dialog>
    </div>
  );
};

export default CustomerTable;
