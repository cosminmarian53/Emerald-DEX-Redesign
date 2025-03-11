import Model from "../components/Model";
import gsap from "gsap";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import TradingViewWidget from "../components/TradingViewWidget";

const Swap = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#getStartedBtn",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 2.5 }
    );
    gsap.fromTo(
      "#swap-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 3.5 }
    );
    gsap.fromTo(
      "#tradingview",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 3.5 }
    )
  }, []);

  return (
    <>
      {/* Page container */}
      <div className="flex flex-col items-center bg-black min-h-screen">
        {/* Hero / Top section with the Model + "Get Started" button */}
        <div className="flex flex-col items-center pt-10">
          <Model />
          <button
            id="getStartedBtn"
            className="bg-transparent text-gray py-3 px-6 text-lg rounded-md transition duration-300 hover:bg-emerald-500 hover:text-white"
            onClick={() => {
              const target = document.querySelector("#swap-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Get Started
          </button>
        </div>

        {/* Swap section */}
        <div id="swap-section" className="w-full pt-10 pb-20 pr-4">
          {/* Center a max-width container */}
          <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4">
            {/* Left side: TradingView Widget (big chart) */}
            <div id="tradingview" className="w-full h-full">
              <TradingViewWidget />
            </div>

            {/* Right side: Swap card */}
            <div
              id="swap-card"
              className="w-full md:w-1/4 max-w-sm sm:p-3 sm:mt-3"
            >
              {/* Top bar */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-white text-xl font-bold">EmeraldDEX</h1>
                <button className="border border-gray-600 text-white px-4 py-2 rounded-md bg-transparent hover:bg-gray-700 transition-colors">
                  Connect Wallet
                </button>
              </div>

              {/* The Swap Card */}
              <div className="bg-[#1C1C1C] p-4 rounded-md">
                {/* Top "USDC" box */}
                <div className="bg-[#2C2C2C] rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white">USDC</span>
                    <span className="text-sm text-white">0.00</span>
                  </div>
                  <div className="text-xs text-gray-400">USDC</div>
                </div>

                {/* Swap arrow in the middle */}
                <div className="flex justify-center items-center mb-4">
                  <div className="w-6 h-6 bg-[#2C2C2C] flex items-center justify-center rounded-full cursor-pointer">
                    {/* Simple arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 rotate-180"
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

                {/* Bottom "SOL" box */}
                <div className="bg-[#2C2C2C] rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white">EGLD</span>
                  </div>
                  <div className="text-xs text-gray-400">EGLD</div>
                </div>

                {/* Connect Wallet button at bottom of the card */}
                <button className="w-full bg-[#2C2C2C] py-2 rounded-md text-white hover:bg-[#3C3C3C] transition-colors">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
