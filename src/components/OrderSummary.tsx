import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { userId } from "@/app/constant/constants";
import { useRouter } from "next/navigation";

interface OrderSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  cartProducts: {
    product: { name: string; description: string; price: number; id: string }; // Ensure product has 'id'
    orderedQuantity: number;
  }[];
}

const OrderSummary = ({
  totalQuantity,
  totalPrice,
  cartProducts
}: OrderSummaryProps) => {
  // for push
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const grandTotal = totalPrice;
  const productDataForOrdering = cartProducts.map(
    ({ product, orderedQuantity }) => ({
      unitPrice: product.price,
      orderedQuantity,
      subTotal: product.price * orderedQuantity,
      productId: product.id
    })
  );

  const { isLoading, mutate } = useMutation({
    mutationKey: ["initiate-khalti-payment"],
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:3000/api/payment/khalti/start",
        {
          amount: grandTotal,
          productList: productDataForOrdering,
          userId // Include userId in the request payload
        }
      );
    },
    onSuccess: (res) => {
      const paymentUrlpath = res?.data?.data?.payment_url;
      router.push(paymentUrlpath);
      console.log(res);
      console.log(paymentUrlpath);

    },
    onError: (error) => {
      const message = error?.response?.data?.message || "An error occurred";
      setError(message);
    }
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Quantity</span>
        <span>{totalQuantity}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Total Price</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Cart Products:</h3>
        <ul>
          {cartProducts.map(({ product, orderedQuantity }, index) => (
            <li key={index} className="flex justify-between mb-2">
              <span>
                {product.name} ({orderedQuantity} x ${product.price.toFixed(2)})
              </span>
              <span>${(product.price * orderedQuantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => mutate()}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </button>
      {/* Display error or success messages */}
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">Success: {successMessage}</p>
      )}
    </div>
  );
};

export default OrderSummary;
