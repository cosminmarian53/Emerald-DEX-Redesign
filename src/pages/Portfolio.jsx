import React, { useState, useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { FaArrowRight, FaWallet } from "react-icons/fa";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Pulsating Star Field Component with faster animations
const PulsatingStarField = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = [];
    const pulsatingStars = [];
    const shootingStars = [];

    const initStars = () => {
      // Background stars - fewer for better performance
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.1,
          opacity: Math.random() * 0.6 + 0.1,
          hue: Math.random() < 0.8 ? 145 : 155,
        });
      }

      // Pulsating stars - fewer and faster
      for (let i = 0; i < 30; i++) {
        pulsatingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.8 + 0.5,
          radius: 0,
          opacity: 0,
          hue: 150,
          saturation: Math.random() * 20 + 80,
          pulse: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Initial shooting stars
      for (let i = 0; i < 2; i++) {
        addShootingStar();
      }
    };

    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        length: Math.random() * 80 + 40,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4,
        speed: Math.random() * 18 + 12, // Increased speed
        opacity: 0,
        hue: 145 + Math.random() * 15,
        decay: 0.02 + Math.random() * 0.03, // Faster decay
      });
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`;
        ctx.fill();
      });

      pulsatingStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 65%, ${star.opacity})`;
        ctx.shadowBlur = star.radius * 5;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      shootingStars.forEach(star => {
        if (star.opacity <= 0) return;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;
        ctx.lineTo(endX, endY);

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `hsla(145, 100%, 70%, ${star.opacity})`);
        gradient.addColorStop(1, `hsla(145, 100%, 70%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(145, 100%, 80%, ${star.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(145, 100%, 70%, ${star.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animateStars = () => {
      // Animate pulsating stars - faster pulsing
      pulsatingStars.forEach(star => {
        star.phase += 0.03; // Increased speed
        star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.6;
        star.opacity = 0.3 + Math.sin(star.phase) * 0.5;
      });

      // Animate shooting stars - faster movement
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) {
          if (Math.random() < 0.02) { // More frequent respawning
            shootingStars[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * (canvas.height / 3),
              length: Math.random() * 80 + 40,
              angle: Math.random() * Math.PI / 4 + Math.PI / 4,
              speed: Math.random() * 18 + 12, // Faster
              opacity: 0,
              hue: 145 + Math.random() * 15,
              decay: 0.02 + Math.random() * 0.03, // Faster
            };
          }
          return;
        }

        if (star.opacity < 1 && star.x > canvas.width * 0.8) {
          star.opacity += 0.1; // Faster fade in
        } else {
          star.x -= star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= star.decay;
        }

        if (star.x < 0 || star.y > canvas.height) {
          star.opacity = 0;
        }
      });

      if (Math.random() < 0.004) { // More frequent
        addShootingStar();
      }

      drawStars();
      requestAnimationFrame(animateStars);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animateStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
});

// Portfolio data
const portfolioData = [
  { id: 1, name: "USDC", logo: usdcImg, amount: "1,000", value: "$1,000" },
  { id: 2, name: "EGLD", logo: egldImg, amount: "50", value: "$3,500" },
  { id: 3, name: "BTC", logo: btcImg, amount: "0.1", value: "$4,200" },
  { id: 4, name: "ETH", logo: ethImg, amount: "2", value: "$6,000" },
  { id: 5, name: "BNB", logo: bnbImg, amount: "5", value: "$1,500" },
  { id: 6, name: "SOL", logo: solImg, amount: "10", value: "$1,200" },
];

const poolData = [
  { id: 1, name: "ETH/USDC Pool", logo: ethImg, apy: "12.5%", liquidity: "$2,300,000" },
  { id: 2, name: "BTC/ETH Pool", logo: btcImg, apy: "8.2%", liquidity: "$1,200,000" },
];

const farmData = [
  { id: 1, name: "Farm A", logo: egldImg, staked: "100 LP", fees: "20.22%", boostedAPR: "12.1%", rewards: "$10,000,000" },
  { id: 2, name: "Farm B", logo: solImg, staked: "500 LP", fees: "22.22%", boostedAPR: "15.1%", rewards: "$21,000,000" },
];

// Enhanced chart component with MUCH higher contrast
const DistributionChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // All segments animate together now, no staggering
    gsap.fromTo(
      ".chart-segment",
      { strokeDashoffset: 427 },
      { strokeDashoffset: value => value, duration: 1, ease: "power2.out" }
    );

    // Percentage numbers all appear at once
    gsap.fromTo(
      "#chart-percentages span",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 }
    );
  }, []);

  return (
    <div ref={chartRef} className="relative w-56 h-56">
      {/* Background ring */}
      <div className="absolute inset-0 rounded-full border-[12px] border-gray-800/70"></div>

      {/* Chart container */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Chart segments - higher contrast colors */}
        <circle
          className="chart-segment"
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(16, 255, 129, 0.9)" // Much brighter emerald
          strokeWidth="16"
          strokeDasharray="427"
          strokeDashoffset="235"
          strokeLinecap="round"
        />
        <circle
          className="chart-segment"
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(161, 253, 13, 0.9)" // Much brighter lime
          strokeWidth="16"
          strokeDasharray="427"
          strokeDashoffset="320"
          strokeLinecap="round"
          transform="rotate(120 100 100)"
        />
        <circle
          className="chart-segment"
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(20, 244, 226, 0.9)" // Much brighter teal
          strokeWidth="16"
          strokeDasharray="427"
          strokeDashoffset="365"
          strokeLinecap="round"
          transform="rotate(240 100 100)"
        />

        {/* Central glowing dot */}
        <circle
          cx="100"
          cy="100"
          r="6"
          fill="#10ffb1"
          filter="drop-shadow(0 0 5px rgba(16, 255, 177, 0.8))"
        />
      </svg>

      {/* Labels inside chart - much higher contrast */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transform rotate-0">
        <span className="text-white text-base mb-2 font-semibold">Distribution</span>
        <div id="chart-percentages" className="flex items-center justify-center">
          <span className="text-[#10ffb1] font-bold text-lg">45%</span>
          <span className="text-white mx-1">/</span>
          <span className="text-[#a1fd0d] font-bold text-lg">30%</span>
          <span className="text-white mx-1">/</span>
          <span className="text-[#14f4e2] font-bold text-lg">25%</span>
        </div>
      </div>
    </div>
  );
};

// Token card component
const TokenCard = ({ item }) => {
  return (
    <div className="bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-200 hover:border-[#10ffb1]/50 hover:shadow-[0_0_15px_rgba(16,255,177,0.2)]">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={item.logo}
          alt={item.name}
          className="token-icon w-9 h-9 rounded-full transition-transform duration-300"
        />
        <h4 className="text-xl font-bold text-white"> {/* Now white instead of gradient */}
          {item.name}
        </h4>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">Amount</span>
        <span className="text-white font-semibold">{item.amount}</span> {/* Brighter text */}
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300 font-medium">Value</span>
        <span className="text-white font-semibold">{item.value}</span> {/* Brighter text */}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const dummyAddress = "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
  const truncatedAddress = `${dummyAddress.slice(0, 6)}...${dummyAddress.slice(-4)}`;

  useEffect(() => {
    // MUCH faster animations - everything appears almost at once
    const timeline = gsap.timeline();

    // Show all elements simultaneously
    timeline.fromTo(
      ["#slogan", "#walletContainer", ".top-card", ".section-heading", ".token-card"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 flex flex-col items-center py-10 px-4 relative">
      {/* Pulsating Star Background */}
      <PulsatingStarField />

      <div className="max-w-7xl w-full relative z-10">
        {/* Header with Wallet Connection */}
        <div className="text-center mb-10">
          <h1
            id="slogan"
            className="text-4xl md:text-5xl font-bold text-emerald-400 mb-10 text-center tracking-wider"

            style={{ textShadow: "0 0 15px rgba(16, 255, 177, 0.5)" }} /* Brighter glow */
          >
            Your Portfolio
          </h1>
          <div
            id="walletContainer"
            className="inline-flex items-center gap-3 mx-auto mt-2 px-5 py-3 border border-[#10ffb1]/40 rounded-full shadow-lg bg-black/80 hover:border-[#10ffb1]/70 transition-all duration-300 cursor-pointer group"
          >
            <FaWallet id="walletImage" className="w-5 h-5 text-[#10ffb1]" />
            <span className="font-mono text-white tracking-wide font-semibold"> {/* WHITE text */}
              {truncatedAddress}
            </span>
            <FaArrowRight className="w-3.5 h-3.5 text-[#10ffb1] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Top Section: Balance, Distribution & Rewards */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          {/* Total Balance Card */}
          <div className="top-card flex-1 w-full bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-[#10ffb1] text-base uppercase tracking-wide mb-2 font-bold flex items-center">
              <span className="inline-block w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
              Total Balance
            </h2>
            <p className="text-4xl font-bold text-white mb-4 tracking-tight">$4,253.78</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#10ffb1] text-black rounded-xl font-bold shadow-lg hover:shadow-[#10ffb1]/30 hover:-translate-y-1 transition-all duration-300">
                Invest
              </button>
              <button className="px-6 py-3 bg-[#10ffb1] text-black rounded-xl font-bold shadow-lg hover:shadow-[#10ffb1]/30 hover:-translate-y-1 transition-all duration-300">
                Swap
              </button>
            </div>
          </div>

          {/* Enhanced Distribution Chart */}
          <div className="top-card flex-1 w-full flex items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
            <DistributionChart />
          </div>

          {/* Available Rewards Card */}
          <div className="top-card flex-1 w-full bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-[#10ffb1] text-base uppercase tracking-wide mb-2 font-bold flex items-center">
              <span className="inline-block w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
              Available Rewards
            </h2>
            <p className="text-4xl font-bold text-white mb-4 tracking-tight">$153.78</p>
            <button className="px-6 py-3 bg-[#10ffb1] text-black rounded-xl font-bold shadow-lg hover:shadow-[#10ffb1]/30 hover:-translate-y-1 transition-all duration-300">
              Claim All
            </button>
          </div>
        </div>

        {/* Middle Section: Rewards Breakdown & Latest Activity */}
        <div className="flex flex-col md:flex-row items-stretch gap-8 mb-16">
          {/* Rewards Breakdown Card */}
          <div className="flex-1 bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-[#10ffb1] text-base uppercase tracking-wide mb-6 font-bold flex items-center">
              <span className="inline-block w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
              Rewards Breakdown
            </h3>
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between text-base text-white mb-2 font-medium">
                  <span>Fees</span>
                  <span className="text-[#10ffb1] font-bold">$34.36 (78.3%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#10ffb1] h-3 rounded-full relative"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-base text-white mb-2 font-medium">
                  <span>Boosted Farms</span>
                  <span className="text-[#10ffb1] font-bold">$26.07 (21.6%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#10ffb1] h-3 rounded-full relative"
                    style={{ width: "22%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Activity Card */}
          <div className="flex-1 bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-[#10ffb1] text-base uppercase tracking-wide mb-6 font-bold flex items-center">
              <span className="inline-block w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
              Latest Activity
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-white flex items-center font-medium">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  Swapped ETH to USDC
                </span>
                <span className="text-white font-bold">-0.5 ETH</span>
              </li>
              <li className="flex justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-white flex items-center font-medium">
                  <span className="w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
                  Invested in EGLD
                </span>
                <span className="text-white font-bold">+50 EGLD</span>
              </li>
              <li className="flex justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-white flex items-center font-medium">
                  <span className="w-2 h-2 bg-[#10ffb1] rounded-full mr-2"></span>
                  Claimed Rewards
                </span>
                <span className="text-white font-bold">$153.78</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: My Tokens */}
        <div className="mb-16">
          <h3 className="section-heading text-2xl font-bold text-white mb-6 flex items-center">
            <div className="w-1 h-8 bg-[#10ffb1] rounded-r mr-3"></div>
            My Tokens
          </h3>
          {portfolioData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {portfolioData.map((item, index) => (
                <div key={item.id} className="token-card">
                  <TokenCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : (
              <p className="text-white">No tokens found</p>
          )}
        </div>

        {/* Bottom Section: My Pools */}
        <div className="mt-16 mb-16">
          <h3 className="section-heading text-2xl font-bold text-white mb-6 flex items-center">
            <div className="w-1 h-8 bg-[#10ffb1] rounded-r mr-3"></div>
            My Pools
          </h3>
          {poolData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {poolData.map((pool) => (
                <div
                  key={pool.id}
                  className="token-card bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col relative overflow-hidden"
                >
                  {/* Glowing corner effect */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#10ffb1]/30 blur-2xl rounded-full"></div>

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={pool.logo}
                      alt={pool.name}
                      className="w-10 h-10 rounded-full p-1 bg-white/10"
                    />
                    <h4 className="text-xl font-bold text-white">
                      {pool.name}
                    </h4>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">APY</span>
                    <span className="text-[#10ffb1] font-bold">{pool.apy}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-300 font-medium">Liquidity</span>
                    <span className="text-white font-bold">{pool.liquidity}</span>
                  </div>
                  <button className="mt-auto self-end px-5 py-2.5 bg-[#10ffb1] text-black rounded-xl font-bold shadow-lg hover:shadow-[#10ffb1]/30 hover:-translate-y-1 transition-all duration-300">
                    Join Pool
                  </button>
                </div>
              ))}
            </div>
          ) : (
              <p className="text-white">No pools found</p>
          )}
        </div>

        {/* Bottom Section: My Farms */}
        <div className="mt-16">
          <h3 className="section-heading text-2xl font-bold text-white mb-6 flex items-center">
            <div className="w-1 h-8 bg-[#10ffb1] rounded-r mr-3"></div>
            My Farms
          </h3>
          {farmData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {farmData.map((farm) => (
                <div
                  key={farm.id}
                  className="token-card bg-[#0A0A0A]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col relative overflow-hidden"
                >
                  {/* Glowing corner effect */}
                  <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#10ffb1]/30 blur-2xl rounded-full"></div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#10ffb1] flex items-center justify-center text-black font-bold text-lg">
                      {farm.name.charAt(5)}
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      {farm.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <p className="text-gray-200 text-sm mb-1 font-medium">Your Staked</p>
                      <p className="text-white font-bold">{farm.staked}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <p className="text-gray-200 text-sm mb-1 font-medium">Fees APR</p>
                      <p className="text-[#10ffb1] font-bold">{farm.fees}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <p className="text-gray-200 text-sm mb-1 font-medium">Boosted APR</p>
                      <p className="text-[#10ffb1] font-bold">{farm.boostedAPR}</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <p className="text-gray-200 text-sm mb-1 font-medium">Total Rewards</p>
                      <p className="text-white font-bold">{farm.rewards}</p>
                    </div>
                  </div>
                  <button className="mt-auto self-end px-5 py-2.5 bg-[#10ffb1] text-black rounded-xl font-bold shadow-lg hover:shadow-[#10ffb1]/30 hover:-translate-y-1 transition-all duration-300">
                    Stake More
                  </button>
                </div>
              ))}
            </div>
          ) : (
              <p className="text-white">No farms found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;