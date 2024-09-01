import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-400 text-white">
      <div className="myContainer flex justify-between items-center px-6 py-9 h-14 ">
        <div className="logo font-bold">
          <span className="text-black font-extrabold text-2xl">&lt;</span>
          <span className="font-extrabold text-black text-2xl">Secur</span>
          <span className="text-black font-extrabold">Key/&gt;</span>
        </div>
        {/* <ul className="flex gap-20">
          <a className="hover:font-bold" href="/">
            <li>Home</li>
          </a>
          <a className="hover:font-bold" href="#">
            <li>About</li>
          </a>
          <a className="hover:font-bold" href="#">
            <li>Contact Us</li>
          </a>
        </ul> */}
        <button className="text-white border border-black rounded-full bg-purple-400">
          <img
            width={24}
            src="resour\gitimg.jpeg"
            className="rounded-full w-16 text-black invert"
            alt="Github"
            
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
