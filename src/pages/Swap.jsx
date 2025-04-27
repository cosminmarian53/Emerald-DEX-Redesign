import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Sample tokens and mock exchange rates
const tokens = [
  { symbol: "USDC", logo: usdcImg },
  { symbol: "ETH", logo: ethImg },
  { symbol: "BTC", logo: btcImg },
  { symbol: "BNB", logo: bnbImg },
  { symbol: "SOL", logo: solImg },
  { symbol: "EGLD", logo: egldImg },
];

// Simple mock rate lookup
const mockRates = {
  "USDC-EGLD": 0.025,
  "EGLD-USDC": 40,
  "ETH-BTC": 0.06,
  // add more pairs as needed
};

export default function Swap() {
  const [address, setAddress] = useState("");
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const swapBtnRef = useRef(null);

// GSAP entrance
  useGSAP(() => {
    gsap.fromTo(
      "#heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
    gsap.fromTo(
      "#swap-panel",
      { scale: 0.8, opacity: 0, rotateY: 30, transformPerspective: 800 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
    );
  }, []);

  const truncate = (addr = "") => addr.slice(0, 6) + "..." + addr.slice(-4);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount(val < 0 ? 0 : val);
  };

  const rateKey = `${fromToken.symbol}-${toToken.symbol}`;
  const rate = mockRates[rateKey] || 1;
  const mockPrice = (amount * rate).toFixed(4);

  const handleConnect = () => setAddress("0xAbCdEF1234567890GhIjKL7890MnOpQr");

  const handleArrowSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount(0);
  };

  const handleSwap = () => {
    if (!address) return;
    setSwapping(true);
    gsap.fromTo(
      swapBtnRef.current,
      { boxShadow: "0 0 10px #00ff99" },
      { boxShadow: "0 0 20px #00ff99", duration: 0.3, yoyo: true, repeat: 3, ease: "power1.inOut" }
    );
    setTimeout(() => {
      setSwapping(false);
      setFromToken(toToken);
      setToToken(fromToken);
      setAmount(0);
    }, 1500);
  };

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 id="heading" className="section-heading text-4xl font-bold">
          Swap tokens like never before.
        </h1>
      </section>

      {/* Swap Panel */}
      <section id="swap-section" className="w-full px-4 pb-20 flex justify-center">
        <div id="swap-panel" className="group w-full max-w-md min-h-[600px] perspective-[1000px]">
          <div className="transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-3">
            <div className="bg-[#000]/90 p-1 rounded-2xl shadow-[0_0_15px_rgba(0,255,153,0.5)] hover:scale-105 transition">
              <div className="bg-black p-6 rounded-2xl h-full flex flex-col justify-between">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-extrabold text-[#00ff99] drop-shadow-lg">
                    EmeraldDEX
                  </h1>
                  {address ? (
                    <span className="text-sm font-medium bg-[#121212] px-3 py-1 rounded-full">
                      {truncate(address)}
                    </span>
                  ) : (
                      <button
                        onClick={handleConnect}
                        className="px-4 py-2 rounded-full font-semibold bg-[#00ff99] hover:opacity-90 transition"
                      >
                        Connect Wallet
                      </button>
                  )}
                </div>

                {/* Inputs Section */}
                <div className="space-y-6 flex-grow">
                  {/* From Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">From</label>
                    <div className="flex bg-[#111] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-lg transition">
                      <div className="flex items-center gap-2">
                        <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6" />
                        <select
                          value={fromToken.symbol}
                          onChange={(e) => setFromToken(tokens.find((t) => t.symbol === e.target.value))}
                          className="bg-transparent outline-none text-white font-medium"
                        >
                          {tokens.map((t) => (
                            <option key={t.symbol} className="text-black">{t.symbol}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.0"
                        className="w-1/2 bg-transparent text-right outline-none text-white font-semibold"
                      />
                    </div>
                    <div className="text-xs text-gray-500">Price: {mockPrice} {toToken.symbol}</div>
                  </div>

                  {/* Arrow Swap */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleArrowSwap}
                      className="w-10 h-10 bg-[#111] flex items-center justify-center rounded-full transition-transform duration-500 hover:rotate-180 shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* To Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">To</label>
                    <div className="flex bg-[#111] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-lg transition">
                      <div className="flex items-center gap-2">
                        <img src={toToken.logo} alt={toToken.symbol} className="w-6 h-6" />
                        <select
                          value={toToken.symbol}
                          onChange={(e) => setToToken(tokens.find((t) => t.symbol === e.target.value))}
                          className="bg-transparent outline-none text-white font-medium"
                        >
                          {tokens.map((t) => (
                            <option key={t.symbol} className="text-black">{t.symbol}</option>
                          ))}
                        </select>
                      </div>
                      <span className="text-white font-semibold">{mockPrice} {toToken.symbol}</span>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  ref={swapBtnRef}
                  onClick={handleSwap}
                  className="w-full py-3 rounded-full font-bold tracking-wide bg-[#00ff99] text-black shadow-md hover:animate-pulse transition transform duration-300 mt-6 disabled:opacity-50 flex items-center justify-center"
                  disabled={!amount || !address || swapping}
                >
                  {swapping ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" />
                    </svg>
                  ) : address ? (
                    "Swap"
                  ) : (
                    "Connect to Swap"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
