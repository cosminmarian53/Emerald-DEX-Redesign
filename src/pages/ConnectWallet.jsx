import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { walletImg } from "../utils";
const ConnectWallet = () => {
  useGSAP(() => {
    // Animate the slogan text
    gsap.fromTo(
      "#slogan",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );

    // Animate the wallet image
    gsap.fromTo(
      "#walletImage",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
    );

    // Animate the wallet container (buttons)
    gsap.fromTo(
      "#walletContainer",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1 }
    );
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-black overflow-hidden">
      {/* Subtle emerald gradient overlay */}
      <div className="absolute inset-0 to-black pointer-events-none" />

      {/* Slogan & Image Section */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center mb-12">
        <h1
          id="slogan"
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-6"
        >
          Your Wallet, Your Fortress.
        </h1>

        {/* Animated Image */}
        <p className="text-gray-500 text-lg max-w-2xl mb-8">
          Experience DeFi with the Confidence of{" "}
          <span className="font-bold">True</span> Security.
        </p>
      </div>

      {/* Wallet Connect Section */}
      <div
        id="walletContainer"
        className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl ring-1 ring-white/20 shadow-2xl transition-all duration-300 hover:ring-emerald-400 hover:ring-2 mb-4"
      >
        {/* Title & Subtitle */}
        <h2 className="text-center text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          MultiversX Login
        </h2>
        <p className="text-center text-gray-500 mb-8">Choose a login method</p>

        {/* Top Row (DEFI Wallet & xPortal) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* DEFI Wallet */}
          <button
            className="relative flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#000000" }}
          >
            <img
              src="https://smart-exchange.x-launcher.com/assets/extensionLogo-014cda32.svg"
              alt="DEFI Wallet"
              className="h-8 w-auto mb-2"
            />
            <span className="text-white font-semibold">DEFI Wallet</span>
            {/* Neon glow on hover */}
            <span className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-emerald-400/30 blur-md" />
          </button>

          {/* xPortal App */}
          <button
            className="relative flex flex-col items-center justify-center rounded-lg p-4 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <img
              src="https://smart-exchange.x-launcher.com/assets/xPortalLogo-2ab76308.svg"
              alt="xPortal App"
              className="h-8 w-auto mb-2"
            />
            <span className="text-black font-semibold">xPortal App</span>
            {/* Neon glow on hover */}
            <span className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-emerald-400/30 blur-md" />
          </button>
        </div>

        {/* Bottom Row (Ledger & Web Wallet) */}
        <div className="flex flex-col gap-4">
          {/* Ledger */}
          <button className="relative w-full rounded-lg p-4 bg-emerald-600 text-white font-semibold transition-transform hover:scale-[1.02]">
            Ledger
            {/* Neon glow on hover */}
            <span className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-emerald-400/50 blur-md" />
          </button>

          {/* Web Wallet */}
          <button className="relative w-full rounded-lg p-4 bg-emerald-600 text-white font-semibold transition-transform hover:scale-[1.02]">
            Web Wallet
            {/* Neon glow on hover */}
            <span className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-emerald-400/50 blur-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
