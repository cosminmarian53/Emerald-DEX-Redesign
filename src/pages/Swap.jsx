import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TradingViewWidget from "../components/TradingViewWidget";

const Swap = () => {
  // GSAP entrance animations
  useGSAP(() => {
    gsap.fromTo(
      "#heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
    gsap.fromTo(
      "#getStartedBtn",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 1 }
    );
    gsap.fromTo(
      "#swap-section",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1.5 }
    );
    gsap.fromTo(
      "#features-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 2 }
    );
    gsap.fromTo(
      "#features-container",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 2.5 }
    );
    // Entrance for the swap panel
    gsap.fromTo(
      "#swap-panel",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 1,
      }
    );
  }, []);

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col">
      {/* ========================== Hero Section ========================== */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center px-4"
      >
        <div className="mt-3 px-10">
          <h1
            id="heading"
            className="section-heading text-center text-4xl font-bold"
          >
            Swap tokens like never before.
          </h1>
        </div>
      </section>

      {/* ========================== Swap Section ========================== */}
      <section id="swap-section" className="w-full pt-10 pb-20 px-4">
        <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-8 max-w-6xl">
          {/* TradingView Widget / Chart */}
          <div className="w-full h-full md:flex-1">
            <TradingViewWidget />
          </div>

          {/* Insanely Beautiful Swap Panel */}
          <div id="swap-panel" className="w-full md:w-1/3 max-w-sm">
            {/* Outer container with a gradient border that scales properly */}
            <div className="group relative p-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,160,0.5)]">
              {/* Card container */}
              <div className="bg-[#1C1C1C] p-6 rounded-xl">
                {/* ================== Top Bar ================== */}
                <div className="flex justify-between items-center mb-6">
                  <h1
                    className="
                      text-2xl 
                      font-extrabold 
                      bg-gradient-to-r 
                      from-green-400 
                      to-green-800 
                      bg-clip-text 
                      text-transparent 
                      drop-shadow-lg
                    "
                  >
                    EmeraldDEX
                  </h1>
                  <button
                    className="
                      relative
                      rounded-full
                      text-white 
                      font-bold 
                      tracking-wider
                      px-5 
                      py-2
                      bg-gradient-to-r 
                      from-green-400 
                      to-green-800 
                      shadow-lg
                      transition-transform 
                      duration-300 
                      hover:scale-110 
                      active:scale-95
                    "
                  >
                    Connect Wallet
                  </button>
                </div>

                {/* ================== Main Swap Area ================== */}
                <div className="space-y-6">
                  {/* Top "USDC" box with token logo */}
                  <div
                    className="
                      relative
                      bg-[#2C2C2C]
                      rounded-lg
                      p-4
                      shadow-inner
                      transition
                      duration-300
                      hover:shadow-2xl
                      hover:scale-105
                    "
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040"
                          alt="USDC"
                          className="w-5 h-5"
                        />
                        <span className="text-sm text-white font-medium">
                          USDC
                        </span>
                      </div>
                      <span className="text-sm text-white font-medium">
                        0.00
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">USDC</div>
                  </div>

                  {/* Swap arrow */}
                  <div className="flex justify-center items-center">
                    <div
                      className="
                        w-8
                        h-8
                        bg-[#2C2C2C]
                        flex
                        items-center
                        justify-center
                        rounded-full
                        cursor-pointer
                        transition
                        duration-300
                        hover:rotate-180
                        hover:shadow-md
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom "EGLD" box with token logo */}
                  <div
                    className="
                      relative
                      bg-[#2C2C2C]
                      rounded-lg
                      p-4
                      shadow-inner
                      transition
                      duration-300
                      hover:shadow-2xl
                      hover:scale-105
                    "
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://cryptologos.cc/logos/multiversx-egld-egld-logo.png?v=040"
                          alt="EGLD"
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="text-sm text-white font-medium">
                          EGLD
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">EGLD</div>
                  </div>

                  {/* Big "Connect Wallet" button at the bottom */}
                  <button
                    className="
                      w-full
                      py-3
                      rounded-full
                      text-white
                      font-bold
                      tracking-wider
                      bg-gradient-to-r
                      from-green-400
                      to-green-800
                      shadow-lg
                      transition
                      duration-300
                      hover:scale-105
                      hover:shadow-[0_0_20px_rgba(0,255,160,0.5)]
                      active:scale-95
                      focus:outline-none
                    "
                  >
                    Connect Wallet
                  </button>
                </div>
                {/* End Main Swap Area */}
              </div>
            </div>
            {/* End outer container */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Swap;
