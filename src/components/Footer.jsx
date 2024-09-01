import React from "react";

function Footer() {
  return (
    <>
      <div className="flex bg-purple-400 justify-center flex-row  items-center p-1">
        <div className="font-bold relative bottom-3 text-xl left-16">
          Created with ReactJs By Aman
        </div>
        <div className="logo text-xl font-bold text-white relative pt-4 top-1 right-44">
          <span className="text-black font-extrabold text-2xl">&lt;</span>
          <span className="font-extrabold text-black text-2xl">Secur</span>
          <span className="text-black font-extrabold">Key/&gt;</span>
        </div>
      </div>
    </>
  );
}

export default Footer;
