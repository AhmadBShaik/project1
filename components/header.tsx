import Link from "next/link";
import React from "react";

function Header() {
  return (
    <>
      <header className="fixed bg-orange-50 w-full p-5 text-orange-500 bg-opacity-80 border-b border-orange-100 max-w-6xl mx-auto">
        <div className="sm:flex justify-between items-center">
          <div className="font-bold text-2xl ">Project 1</div>
          <div className="space-x-5 text-xs hidden sm:block">
            <Link
              href={"/sign-in"}
              className="hover:bg-opacity-75 hover:text-orange-400 font-bold text-orange-500 bg-orange-100 px-3 py-2 rounded"
            >
              Sign In
            </Link>
            <Link
              href={"/sign-up"}
              className="hover:bg-opacity-75 hover:text-orange-100 font-bold text-white bg-orange-500 px-3 py-2 rounded"
            >
              Sign Up
            </Link>
          </div>
          {/* <div className="space-x-5 text-xs sm:hidden mt-5 flex justify-end">
            <Link
              href={"/sign-in"}
              className="hover:bg-opacity-75 text-orange-500 bg-orange-100 px-2.5 py-1.5 rounded"
            >
              Sign In
            </Link>
            <Link
              href={"/sign-up"}
              className="hover:bg-opacity-75 text-white bg-orange-500 px-2.5 py-1.5 rounded"
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      </header>
    </>
  );
}

export default Header;
