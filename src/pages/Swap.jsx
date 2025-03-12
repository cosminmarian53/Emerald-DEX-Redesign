import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Model from "../components/Model";
import TradingViewWidget from "../components/TradingViewWidget";

const Swap = () => {
  // Simple GSAP animations on mount
  useGSAP(() => {
    gsap.fromTo(
      "#getStartedBtn",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 1 }
    );
    gsap.fromTo(
      "#swap-section",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 3 }
    );
    // add animations for the features section, make sure they appear one after one after a litle bit of time
    gsap.fromTo(
      "#features-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 4 }
    );
    gsap.fromTo(
      "#features-container",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 4.5 }
    );
  }, []);

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col">
      {/* ========================== Hero Section ========================== */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center px-4"
      >
        {/* Model (3D or visual) */}
        <div className="mt-5">
          <Model />
        </div>
        {/* CTA Button */}
        <button
          id="getStartedBtn"
          className="bg-transparent text-gray py-3 px-6 text-lg rounded-md transition duration-300 hover:bg-emerald-500 hover:text-white mt-8"
          onClick={() => {
            const target = document.querySelector("#swap-section");
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          Start Swapping
        </button>
      </section>

      {/* ========================== Features Section ========================== */}
      <section className="py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <h2
            id="features-title"
            className="text-3xl md:text-4xl text-gray font-bold text-center mb-12"
          >
            Why use our DEX?
          </h2>

          <div
            id="features-container"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <div className="space-y-4 text-center">
              <img
                src="https://cdn.sanity.io/images/2bt0j8lu/production/12ff7a030184f18107956c1065ce478c79a829f3-1600x862.png?w=714&fit=max&auto=format&dpr=3"
                alt="Fast Transactions"
                className="mx-auto w-25 h-24 object-cover rounded hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-semibold">
                Blazing-Fast Transactions
              </h3>
              <p className="text-gray-400">
                Harness the power of MultiversX to swap tokens in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 text-center">
              <img
                src="https://thedatascientist.com/wp-content/uploads/2023/09/Bitcoin-Security.jpg"
                alt="Security"
                className="mx-auto w-25 h-24 object-cover rounded hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-semibold">
                State-of-the-Art Security
              </h3>
              <p className="text-gray-400">
                Swap confidently with audited smart contracts and robust
                protocols.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 text-center">
              <img
                src="https://thorchain.org/images/video-posters/swap-hero-poster.png"
                alt="Massive Token Catalog"
                className="mx-auto w-24 h-24 object-cover rounded hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-semibold">Massive Token Catalog</h3>
              <p className="text-gray-400">
                Access a vast selection of tokens in one intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== Swap Section ========================== */}
      <section id="swap-section" className="w-full pt-10 pb-20 px-4">
        <div className="mx-auto flex flex-col md:flex-row items-start justify-center gap-8 max-w-6xl">
          {/* TradingView Widget / Chart */}
          <div className="w-full h-full md:flex-1">
            <TradingViewWidget />
          </div>

          {/* Swap Card */}
          <div className="w-full md:w-1/3 max-w-sm bg-[#1C1C1C] p-4 rounded-md">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-white text-xl font-bold">EmeraldDEX</h1>
              <button className="border border-gray-600 text-white px-4 py-2 rounded-md bg-transparent hover:bg-gray-700 transition-colors">
                Connect Wallet
              </button>
            </div>

            {/* Main swap area */}
            <div className="bg-[#1C1C1C] p-4 rounded-md">
              {/* Top "USDC" box */}
              <div className="bg-[#2C2C2C] rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">USDC</span>
                  <span className="text-sm text-white">0.00</span>
                </div>
                <div className="text-xs text-gray-400">USDC</div>
              </div>

              {/* Swap arrow */}
              <div className="flex justify-center items-center mb-4">
                <div className="w-6 h-6 bg-[#2C2C2C] flex items-center justify-center rounded-full cursor-pointer">
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

              {/* Bottom "EGLD" box */}
              <div className="bg-[#2C2C2C] rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">EGLD</span>
                </div>
                <div className="text-xs text-gray-400">EGLD</div>
              </div>

              {/* Connect Wallet button */}
              <button className="w-full bg-[#2C2C2C] py-2 rounded-md text-white hover:bg-[#3C3C3C] transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Swap;
