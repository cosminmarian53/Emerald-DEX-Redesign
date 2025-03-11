import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- import Link
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
        {/* Logo (links to home) */}
        <Link to="/" className="flex items-center gap-2">
          <img src={emeraldImgLogo} alt="EmeraldDEX" width={55} height={55} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 my-5 justify-center">
          {navLists.map((nav) => (
            <Link
              key={nav}
              to={`/${nav.toLowerCase()}`} // e.g. "SWAP" => "/swap"
              className="px-5 text-sm cursor-pointer hover:tracking-widest text-gray-200 hover:text-emerald-200 transition-all"
            >
              {nav}
            </Link>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="flex items-center gap-4 md:order-2">
          <button className="bg-emerald-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-black">
            <Link to="/connect-wallet">Connect Wallet</Link>
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
          <div
            className={`absolute right-0 top-10 mt-2 w-40 bg-black bg-opacity-80 backdrop-blur-xl rounded-md shadow-lg z-50 transform transition-all duration-300 ease-out ${
              isOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="py-2 p-5">
              {navLists.map((nav) => (
                <Link
                  key={nav}
                  to={`/${nav.toLowerCase()}`} // e.g. "POOLS" => "/pools"
                  className="block px-4 py-2 text-md text-gray-200 hover:bg-emerald-500 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)} // optionally close menu on link click
                >
                  {nav}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
