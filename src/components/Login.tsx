"use client";

import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RiKey2Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoaderV from "./LoaderV";
import { toast } from "react-hot-toast";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters.");
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(""); // Reset the error message on form submission
    setSuccess(false); // Reset success message
    setLoading(true); // Start loading state

    const res = await signIn("credentials", {
      email, // Use the email state directly
      password, // Use the password state directly
      redirect: false,
    });

    setLoading(false); // Stop loading state after the login attempt

    if (res?.error) {
      toast.error(res?.error);
      setError(res.error);
    }

    if (res?.ok) {
      toast.success("welcome");
      return router.push("/welcome");
    }
  };

  return (
    <main className="bg-[#D8DBBD] h-screen flex items-center justify-center">
      <article className="bg-white w-[90vw] sm:w-[400px] p-6 rounded-[7px] shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-blue-500">Login successful!</div>}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative mb-6">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full outline-none border-b-2 px-8 border-gray-300 focus:border-blue-500 placeholder:text-[12px] mt-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FiUsers size={20} className="absolute top-8 left-1" />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full outline-none border-b-2 px-7 border-gray-300 focus:border-blue-500 placeholder:text-[12px] mt-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-2 w-6 h-6 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </div>
            <RiKey2Line className="absolute top-8 left-1 w-6 h-6" />
          </div>

          {/* Forgot Password */}
          <p className="text-right text-sm text-blue-600 cursor-pointer">
            Forgot password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full font-bold text-white bg-[#2A3663] p-2 rounded-full mt-4 "
            disabled={loading} // Disable the button while loading
          >
            {loading ? <LoaderV /> : "Login"}
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-4">
            <Link href="/signin">Or sign up</Link>
          </p>
        </form>
      </article>
    </main>
  );
};

export default Login;
