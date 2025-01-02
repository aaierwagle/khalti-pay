"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Page = () => {
  // Fetch data using React Query
  const {
    data: OrderData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["get-order-items"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/getOrder");
      return response.data;
    }
  });

  // Logging the order data for debugging
  console.log(OrderData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <p>Order Page</p>
      
    </>
  );
};

export default Page;
