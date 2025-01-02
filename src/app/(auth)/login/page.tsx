"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/login", user);
      toast.success("Login success");
      router.push("/");
    } catch (error: any) {
      toast.error(`Wrong Crediantial`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-80">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className={`w-full p-2 rounded-lg mb-4 text-white font-semibold ${
              buttonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex justify-between">
            <Link href="/signup" className="text-purple-500 hover:underline">
              Signup
            </Link>
            <Link
              href="/passwordforget"
              className="text-purple-500 hover:underline"
            >
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
