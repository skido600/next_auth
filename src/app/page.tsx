"use client";
import Loader from "@/components/Loader";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const renderSessionContent = () => {
    if (status === "authenticated") {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <button
            className="border border-solid border-black rounded px-4 py-2"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </div>
      );
    } else if (status === "loading") {
      return <Loader />;
    } else {
      return (
        <main className="bg-[#D8DBBD] h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="font-playwrite text-[20px] mb-6">
              Learning Next Authentication
            </h1>
          </div>
          <div className="absolute bottom-8 w-[80%] md:w-[32%] lg:w-[20%]">
            <Link href="/login">
              <button className="bg-[#4DA1A9] text-white rounded-full w-full py-2 mb-4">
                Login
              </button>
            </Link>
            <Link href="/signin">
              <button className="border-2 bg-[#2A3663] text-white rounded-full w-full py-2">
                Sign Up
              </button>
            </Link>
          </div>
        </main>
      );
    }
  };

  return <>{renderSessionContent()}</>;
}
