import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { FaArrowRight, FaWallet } from "react-icons/fa";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";
const portfolioData = [
  {
    id: 1,
    name: "USDC",
    logo: usdcImg,
    amount: "1,000",
    value: "$1,000",
  },
  {
    id: 2,
    name: "EGLD",
    logo: egldImg,
    amount: "50",
    value: "$3,500",
  },
  {
    id: 3,
    name: "BTC",
    logo: btcImg,
    amount: "0.1",
    value: "$4,200",
  },
  {
    id: 4,
    name: "ETH",
    logo: ethImg,
    amount: "2",
    value: "$6,000",
  },
  {
    id: 5,
    name: "BNB",
    logo: bnbImg,
    amount: "5",
    value: "$1,500",
  },
  {
    id: 6,
    name: "SOL",
    logo: solImg,
    amount: "10",
    value: "$1,200",
  },
];

const poolData = [
  {
    id: 1,
    name: "ETH/USDC Pool",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
    apy: "12.5%",
    liquidity: "$2,300,000",
  },
  {
    id: 2,
    name: "BTC/ETH Pool",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
    apy: "8.2%",
    liquidity: "$1,200,000",
  },
];

const farmData = [
  {
    id: 1,
    name: "Farm A",
    logo: "https://via.placeholder.com/40",
    staked: "100 LP",
    fees: "20.22%",
    boostedAPR: "12.1%",
    rewards: "$10,000,000",
  },
  {
    id: 2,
    name: "Farm B",
    logo: "https://via.placeholder.com/40",
    staked: "500 LP",
    fees: "22.22%",
    boostedAPR: "15.1%",
    rewards: "$21,000,000",
  },
];

const Portfolio = () => {
  const dummyAddress = "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
  const truncatedAddress = `${dummyAddress.slice(0, 6)}...${dummyAddress.slice(
    -4
  )}`;

  useEffect(() => {
    // Animate the slogan text
    gsap.fromTo(
      "#slogan",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );
    // Animate the wallet icon
    gsap.fromTo(
      "#walletImage",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
    );
    // Animate the wallet container
    gsap.fromTo(
      "#walletContainer",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1 }
    );
    // Animate the wallet button
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-[#0b0b0b] to-[#111111] flex flex-col items-center py-10 px-4">
      <div className="max-w-7xl w-full">
        {/* Header with Wallet Connection */}
        <div className="text-center mb-8">
          <h1
            id="slogan"
            className="text-5xl section-heading font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-md"
          >
            Your Portfolio
          </h1>
            <div
              id="walletContainer"
              className="inline-flex items-center gap-2 mx-auto mt-2 px-4 py-4 border border-emerald-400 rounded-full shadow-lg"
            >
              <FaWallet id="walletImage" className="w-6 h-6 text-emerald-400" />
              <span className="font-mono text-emerald-400">
                {truncatedAddress}
              </span>
              <FaArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
        </div>

        {/* Top Section: Balance, Distribution & Rewards */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Total Balance Card */}
          <div className="flex-1 w-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
            <h2 className="text-gray-300 text-sm uppercase tracking-widest mb-2">
              Total Balance
            </h2>
            <p className="text-3xl font-bold text-white mb-4">$4,253.78</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                Invest
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                Swap
              </button>
            </div>
          </div>

          {/* Distribution (Ring Chart) */}
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-white/10"></div>
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-emerald-500/30"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="68"
                  cx="96"
                  cy="96"
                />
                <circle
                  className="text-emerald-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="100"
                  stroke="currentColor"
                  fill="transparent"
                  r="68"
                  cx="96"
                  cy="96"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-400">Distribution</span>
                <span className="text-xl text-white font-bold">
                  45% / 30% / 25%
                </span>
              </div>
            </div>
          </div>

          {/* Available Rewards Card */}
          <div className="flex-1 w-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
            <h2 className="text-gray-300 text-sm uppercase tracking-widest mb-2">
              Available Rewards
            </h2>
            <p className="text-3xl font-bold text-white mb-4">$153.78</p>
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
              Claim All
            </button>
          </div>
        </div>

        {/* Middle Section: Rewards Breakdown & Latest Activity */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* Rewards Breakdown Card */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-gray-300 text-sm uppercase tracking-widest mb-4">
              Rewards Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Fees</span>
                  <span>$34.36 (78.3%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Boosted Farms</span>
                  <span>$26.07 (21.6%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                    style={{ width: "22%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Latest Activity Card */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-gray-300 text-sm uppercase tracking-widest mb-4">
              Latest Activity
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-400">Swapped ETH to USDC</span>
                <span className="text-gray-300">-0.5 ETH</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Invested in EGLD</span>
                <span className="text-gray-300">+50 EGLD</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Claimed Rewards</span>
                <span className="text-gray-300">$153.78</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: My Tokens */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">My Tokens</h3>
          {portfolioData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Amount</span>
                    <span>{item.amount}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Value</span>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No token found</p>
          )}
        </div>

        {/* Bottom Section: My Pools */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">My Pools</h3>
          {poolData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {poolData.map((pool) => (
                <div
                  key={pool.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10 hover:scale-[1.02] transition-transform flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={pool.logo}
                      alt={pool.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                      {pool.name}
                    </h4>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>APY</span>
                    <span>{pool.apy}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-4">
                    <span>Liquidity</span>
                    <span>{pool.liquidity}</span>
                  </div>
                  <button className="mt-auto self-end px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                    Join Pool
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pool found</p>
          )}
        </div>

        {/* Bottom Section: My Farms */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">My Farms</h3>
          {farmData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {farmData.map((farm) => (
                <div
                  key={farm.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10 hover:scale-[1.02] transition-transform flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={farm.logo}
                      alt={farm.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                      {farm.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Your Staked</p>
                      <p className="text-white font-bold">{farm.staked}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Fees APR</p>
                      <p className="text-white font-bold">{farm.fees}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Boosted APR</p>
                      <p className="text-white font-bold">{farm.boostedAPR}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Rewards</p>
                      <p className="text-white font-bold">{farm.rewards}</p>
                    </div>
                  </div>
                  <button className="mt-auto self-end px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                    Stake More
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No farms found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
