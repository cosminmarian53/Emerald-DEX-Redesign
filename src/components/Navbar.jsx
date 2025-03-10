import React, { useState } from "react";
import { emeraldImgLogo } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full max-w-screen-xl mx-auto justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={emeraldImgLogo} alt="EmeraldDEX" width={55} height={55} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 my-5 justify-center">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer hover:tracking-widest text-gray-200 hover:text-emerald-200 transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="flex items-center gap-4 md:order-2">
          <button className="bg-emerald-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-black">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="relative md:hidden flex items-center order-3">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none pr-4"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <span style={{ fontSize: "1.5rem" }}>X</span>
            ) : (
              <span style={{ fontSize: "1.5rem" }}>☰</span>
            )}
          </button>

          {/* Dropdown Menu (Mobile) */}
          {isOpen && (
            <div className="absolute right-0 top-10 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <div className="py-2">
                {navLists.map((nav) => (
                  <a
                    key={nav}
                    href="#"
                    className="block px-4 py-2 text-md text-gray-400 hover:bg-emerald-200 hover:text-black transition-colors"
                  >
                    {nav}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
