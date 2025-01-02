"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-items"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/getProduct");
      return response.data;
    }
  });

  const ProductData = data?.productsData;
  console.log(ProductData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="p-6 mx-auto flex justify-center gap-4 flex-wrap">
      {ProductData.map((product: any) => (
        <div
          key={product.id}
          className="border border-lime-950 p-4 rounded-lg shadow-lg w-[24%]  h-80 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-lg font-semibold mb-2">
              Price: ${product.price}
            </p>
            <p className="text-md mb-4">Description: {product.description}</p>
          </div>

          <Link
            href={`/product/${product._id}`}
            className="text-blue-500 hover:underline mt-auto"
          >
            View More
          </Link>
        </div>
      ))}
    </section>
  );
};

export default ProductPage;
