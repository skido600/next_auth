import Link from "next/link";
import React from "react";

const HomeL: React.FC = () => {
  return (
    <>
      <main className="bg-[#D8DBBD] h-screen">
        <div className="flex font-playwrite text-[20px] mx-6 text-center justify-center items-center h-screen">
          <div>
            <h1>Learning Next authentication</h1>
          </div>
        </div>
        <section className="flex justify-center">
          <div className=" w-[80%] md:w-[32%] lg:w-[20%]  mb-8 absolute bottom-0">
            <Link href="/login">
              <button className="bg-[#4DA1A9] text-white rounded-full w-full py-2 mb-4">
                Login
              </button>
            </Link>
            <Link href="/signin">
              <button className="border-2 w-full bg-[#2A3663] rounded-full text-white py-2">
                Sign up
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeL;
