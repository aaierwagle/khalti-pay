"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/register", user);
      router.push('/login')
      toast.success("User Create");
     
    } catch (error: any) {
      toast.error("Not created");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster />
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">{loading ? "Processing..." : "Signup"}</h1>
        <hr className="mb-6" />
        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">Username</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full p-2 rounded-lg mb-4 text-white ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none`}
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <Link href="/login" className="text-blue-500 hover:underline"> Login </Link>
      </div>
    </div>
    </>
  );
}
