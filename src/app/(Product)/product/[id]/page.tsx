"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { userId } from "@/app/constant/constants";

// Define the product type based on your API response
interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string;
}

const ProductPage = () => {
  // for push
  const router = useRouter();

  // get id from params
  const params = useParams<{ tag: string; item: string }>();

  // extract Id
  const ProductId = params.id;
  // const userId = "64b7eaf4d4f8c9a8a22b3f1b";

  // State for managing product quantity
  const [quantity, setQuantity] = useState(1);

  // Fetch product data using React Query
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const response = await axios.get<Product>(
        `http://localhost:3000/api/getProduct/${ProductId}`
      );
      return response.data;
    }
  });

  // here call api for cart
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/api/addcartitems",
        {
          userId,
          productId: ProductId,
          orderedQuantity: quantity
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/cart");
      console.log("Item added to cart:", data);
    },
    onError: (error) => {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }
  });

  // Handle Add to Cart
  const handleAddToCart = () => {
    mutation.mutate(); // Call the mutation function
  };

  // Handle quantity increase
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Render loading state
  if (isLoading) return <p>Loading...</p>;

  // Render error state
  if (isError) return <p>Error: {error.message}</p>;

  const ProductDetailSData = data?.productDataDetails;

  // Render product details
  return (
    <>
      <div className="p-4 mx-auto flex gap-4">
        <div className="w-[50%]">
          <img
            src={
              ProductDetailSData?.imageUrl ||
              "https://via.placeholder.com/600x400"
            }
            alt="Product"
            className="w-full h-auto mb-4"
          />
        </div>

        <div className="w-[50%]">
          <h1 className="text-3xl font-bold mb-4">
            Name : {ProductDetailSData?.name || "Product Name"}
          </h1>

          <p className="text-lg mb-4">
            {ProductDetailSData?.description ||
              "Product description goes here. It can include details about features, specifications, and other relevant information."}
          </p>
          <p className="text-lg mb-4">
            Quentity : {ProductDetailSData?.quantity}
          </p>
          <p className="text-xl font-semibold mb-4">
            Price: ${ProductDetailSData?.price || "99.99"}
          </p>

          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              className="bg-gray-300 text-black py-1 px-3 rounded"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="bg-gray-300 text-black py-1 px-3 rounded"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
