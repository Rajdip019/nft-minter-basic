import React from "react";

const Navbar = ({setIsAbout}) => {
  return (
    <div className="w-full overflow-x-hidden h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute z-50 flex justify-between px-16 items-center">
      <div className="flex items-center  cursor-pointer" onClick={() => {setIsAbout(false)}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg> <span className="ml-3 font-bold text-white text-xl">
          NFT Baker
      </span>
      </div>
      <div>
          <button className="text-xl font-semibold text-white " onClick={() => {setIsAbout(true)}}>About Us</button>
      </div>
    </div>
  );
};

export default Navbar;
