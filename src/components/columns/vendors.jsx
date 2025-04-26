import VendorDetail from "../../pages/VendorDetail";
import { Button } from "../../components/ui/button";

export const columns = ({ onView, onEdit }) => [
  {
    accessorKey: "name",
    header: "Vendor Name",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.original.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
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
        <Button size="sm" variant="outline" onClick={() => onView(row.original)}>
          View
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={() => onEdit(row.original)}
        >
          Edit
        </Button>
        
      </div>
    ),
  },
];

