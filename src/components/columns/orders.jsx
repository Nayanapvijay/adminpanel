// src/components/columns/orders.jsx
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const columns = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "Delivered"
              ? "success"
              : status === "Processing"
              ? "warning"
              : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>₹{row.original.amount}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const orderId = row.original.orderId; 
  
      return (
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => console.log("Viewing", orderId)}>
            View
          </Button>
          <Button variant="destructive" size="sm" onClick={() => console.log("Cancelling", orderId)}>
            Cancel
          </Button>
        </div>
      );
    },
  }
];
