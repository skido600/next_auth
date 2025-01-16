"use client";
import React, { useRef, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RiKey2Line } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LoaderV from "./LoaderV";

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Username is required.");
      toast.error("Username is required."); // Display error toast
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address."); // Display error toast
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters."); // Display error toast
      return;
    }

    setLoading(true);
    setError(""); // Reset error message
    setSuccess(false); // Reset success state

    try {
      const response = await fetch(
        "http://localhost:3000/api/customAuth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success("Registration successful!"); // Display success toast
        router.push("/login");
      } else {
        setError(data.error || "An unexpected error occurred.");
        toast.error(data.error || "An unexpected error occurred."); // Display error toast
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred during registration.");
      toast.error("An unexpected error occurred during registration."); // Display error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#D8DBBD] flex fixed top-0 bottom-0 right-0 left-0 justify-center items-center">
      <section className="overflow-y-auto h-[80vh] sm:overflow-hidden sm:h-auto">
        <article className="bg-white w-[90vw] sm:w-[400px] p-6 rounded-lg shadow-lg">
          <h1 className="text-center font-bold text-2xl mb-4">Signup</h1>
          <form onSubmit={handleSubmit} ref={ref}>
            <div className="flex justify-center">
              <main className="text-[14px]">
                {error && <div className="text-red-500">{error}</div>}
                {success && (
                  <div className="text-blue-500">Registration successful!</div>
                )}
              </main>
            </div>
            {/* Username Field */}
            <div className="relative mb-6">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  id="username"
                  className="w-full outline-none border-b-2 px-7 border-gray-300 focus:border-blue-500 placeholder:text-[12px] mt-2"
                  placeholder="Type your username"
                  aria-label="Username"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FiUsers size={20} className="relative top-[-25px] left-1 " />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative mb-6">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div className="flex flex-col">
                <input
                  type="email"
                  id="email"
                  className="w-full outline-none border-b-2 px-7 border-gray-300 focus:border-blue-500 placeholder:text-[12px] mt-2"
                  placeholder="Type your email"
                  aria-label="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMail
                  size={20}
                  className="relative top-[-25px] left-1 "
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative mb-6">
              <label htmlFor="password" className="font-semibold">
                Create password
              </label>
              <div className="flex flex-col">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full outline-none border-b-2 px-7 border-gray-300 focus:border-blue-500 placeholder:text-[12px] mt-2"
                  placeholder="Type your password"
                  aria-label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[30px] right-2 w-6 h-6 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <IoEyeOff />}
                </div>
                <RiKey2Line className="relative top-[-25px] left-1 w-6 h-6" />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleSubmit}
                id="submit"
                type="submit"
                className="w-full font-bold text-white bg-[#2A3663] p-2 rounded-full"
              >
                {loading ? <LoaderV /> : "SIGNUP"}
              </button>
              <div className="flex gap-2 justify-center mt-4">
                <p className="text-center text-[12px]">
                  Already have an account?
                </p>
                <span className="text-[12px] text-blue-600">
                  <Link href="/login">Login</Link>
                </span>
              </div>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Signin;
