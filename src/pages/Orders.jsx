import React from "react";
import { columns } from "../components/columns/orders";
import { DataTable } from "../components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/Orders";

const Orders = () => {
  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  console.log("Fetched Orders:", responseData);

  const data = Array.isArray(responseData?.data)
    ? responseData.data
    : Array.isArray(responseData)
    ? responseData
    : [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load orders.</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default Orders;
