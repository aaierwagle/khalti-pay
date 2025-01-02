import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex justify-center gap-8">
        <Link href="/">Home</Link>
        <Link href="/product">Product</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/order">Order</Link>
        <Link href="/login">Login</Link>
      </div>
    </>
  );
};

export default Header;
