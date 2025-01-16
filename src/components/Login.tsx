"use client";

import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RiKey2Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { validateLogin } from "@/components/validate/validte";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize router here

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate login inputs
    const isValid = validateLogin(email, password, setErrors);

    if (isValid) {
      // Proceed with login logic
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrors({
          email: res.error,
          password: "",
        });
      } else if (res?.ok) {
        // Successful login
        console.log("Login successful:", { email, password });
        router.push("/"); // Redirect to home page
      }
    } else {
      // Validation failed
      console.log("Validation failed:", errors);
    }
  };
  return (
    <main className="bg-[#D8DBBD] h-screen flex items-center justify-center">
      <article className="bg-white w-[90vw] sm:w-[400px] p-6 rounded-[7px] shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
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
            <p className="text-red-600 text-[10px]">{errors.email}</p>
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
            <p className="text-red-600 text-[10px]">{errors.password}</p>
          </div>

          {/* Forgot Password */}
          <p className="text-right text-sm text-blue-600 cursor-pointer">
            Forgot password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full font-bold text-white bg-[#2A3663] p-2 rounded-full mt-4 "
          >
            Login
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
