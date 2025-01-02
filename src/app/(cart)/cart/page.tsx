"use client";

import OrderSummary from "@/components/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const CartPage = () => {
  // Fetch cart items
  const { data: cartData, isLoading: isCartLoading, error: cartError } = useQuery({
    queryKey: ["get-cart-items"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/getcartitems");
      return response.data;
    }
  });

  if (isCartLoading) return <div>Loading...</div>;
  if (cartError) return <div>Error loading cart items</div>;

  // Access cart data
  const cartProducts = cartData?.cartData?.products || [];
  const totalQuantity = cartData?.cartData?.totalQuantity || 0;
  const totalPrice = cartData?.cartData?.totalPrice || 0;


  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2">
          {cartProducts.length > 0 ? (
            cartProducts.map((item, index) => (
              <div key={index} className="flex items-center border-b py-4">
                <img
                  src="https://via.placeholder.com/150" // Use a placeholder or actual image URL
                  alt={item.product.name}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">Description: {item.product.description}</p>
                  <p className="text-gray-600">Quantity Ordered: {item.orderedQuantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    Total: ${(item.orderedQuantity * item.product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Your cart is empty.</div>
          )}
        </div>
        {/* Order Summary */}
        <div className="col-span-1">
          <OrderSummary 
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            cartProducts={cartProducts}
            
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
