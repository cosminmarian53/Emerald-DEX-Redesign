import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { gsap } from "gsap";
import { FaArrowRight, FaWallet } from "react-icons/fa";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index"; // Ensure this path is correct

// Define shared class strings at the module level
const CARD_BASE_CLASSES = "bg-[#0F0F0F]/80 backdrop-blur-md rounded-xl p-5 shadow-xl border border-white/10";
const CARD_HOVER_EFFECTS = "transition-all duration-300 hover:border-[#10ffb1]/40 hover:shadow-[0_0_20px_rgba(16,255,177,0.15)]";
const CARD_BUTTON_CLASSES = "w-full mt-2 px-5 py-2.5 bg-[#10ffb1] text-black rounded-lg font-semibold shadow-md hover:shadow-[#10ffb1]/40 hover:-translate-y-0.5 transition-all duration-200 text-sm";
const GLOWING_CORNER_CLASSES_BASE = "absolute w-16 h-16 bg-[#10ffb1]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300";

// Optimized Pulsating Star Field Component
const PulsatingStarField = memo(() => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const stars = []; const pulsatingStars = []; const shootingStars = [];
    const STAR_COUNT = 80; const PULSATING_STAR_COUNT = 20; const SHOOTING_STAR_INIT_COUNT = 1;
    const initStars = () => {
      stars.length = 0; pulsatingStars.length = 0; shootingStars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 0.8 + 0.1, opacity: Math.random() * 0.5 + 0.1, hue: Math.random() < 0.8 ? 145 : 155 }); }
      for (let i = 0; i < PULSATING_STAR_COUNT; i++) { pulsatingStars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, baseRadius: Math.random() * 1.5 + 0.4, radius: 0, opacity: 0, hue: 150, saturation: Math.random() * 20 + 80, pulse: Math.random() * 2 + 1, phase: Math.random() * Math.PI * 2 }); }
      for (let i = 0; i < SHOOTING_STAR_INIT_COUNT; i++) { addShootingStar(); }
    };
    const addShootingStar = () => { shootingStars.push({ x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), length: Math.random() * 70 + 30, angle: Math.random() * Math.PI / 4 + Math.PI / 4, speed: Math.random() * 15 + 10, opacity: 0, hue: 145 + Math.random() * 15, decay: 0.025 + Math.random() * 0.03 }); };
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => { ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`; ctx.fill(); });
      pulsatingStars.forEach(star => { if (star.opacity <= 0) return; ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 65%, ${star.opacity})`; ctx.shadowBlur = star.radius * 3; ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, 0.5)`; ctx.fill(); });
      ctx.shadowBlur = 0;
      shootingStars.forEach(star => { if (star.opacity <= 0) return; ctx.beginPath(); ctx.moveTo(star.x, star.y); const endX = star.x - Math.cos(star.angle) * star.length; const endY = star.y + Math.sin(star.angle) * star.length; ctx.lineTo(endX, endY); const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY); gradient.addColorStop(0, `hsla(145, 100%, 70%, ${star.opacity})`); gradient.addColorStop(1, `hsla(145, 100%, 70%, 0)`); ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(star.x, star.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = `hsla(145, 100%, 80%, ${star.opacity})`; ctx.fill(); });
      ctx.shadowBlur = 0;
    };
    const animateStars = () => {
      pulsatingStars.forEach(star => { star.phase += 0.03; star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.6; star.opacity = 0.3 + Math.sin(star.phase) * 0.5; if (star.opacity < 0) star.opacity = 0; });
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) { if (shootingStars.length < PULSATING_STAR_COUNT / 2 && Math.random() < 0.025) { shootingStars[index] = { x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), length: Math.random() * 70 + 30, angle: Math.random() * Math.PI / 4 + Math.PI / 4, speed: Math.random() * 15 + 10, opacity: 0, hue: 145 + Math.random() * 15, decay: 0.025 + Math.random() * 0.03 }; } return; }
        if (star.opacity < 1 && star.x > canvas.width * 0.7 && star.x < canvas.width * 0.95) { star.opacity += 0.08; if (star.opacity > 1) star.opacity = 1; } else { star.x -= star.speed; star.y += Math.sin(star.angle) * star.speed * 0.3; star.opacity -= star.decay; }
        if (star.x < 0 || star.y > canvas.height || star.y < 0) { star.opacity = 0; }
      });
      if (Math.random() < 0.003 && shootingStars.filter(s => s.opacity > 0).length < 5) { addShootingStar(); }
      drawStars(); animationFrameId = requestAnimationFrame(animateStars);
    };
    const debouncedResize = () => { cancelAnimationFrame(animationFrameId); resizeCanvas(); initStars(); animateStars(); };
    window.addEventListener('resize', debouncedResize); resizeCanvas(); initStars(); animateStars();
    return () => { window.removeEventListener('resize', debouncedResize); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-90" />;
});

// RESTORED DATA DEFINITIONS
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


const DistributionChart = memo(() => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) return;
    gsap.fromTo(".chart-segment", { strokeDashoffset: 427 }, { strokeDashoffset: (index, target) => target.dataset.offset, duration: 1.2, ease: "power2.out", delay: 0.2 });
    gsap.fromTo(["#chart-percentages span", "#chart-title"], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5 });
  }, []);
  const radius = 82; const strokeWidth = 18; const circumference = 2 * Math.PI * radius; const percentages = [45, 30, 25]; const colors = ["rgba(16, 255, 129, 0.95)", "rgba(161, 253, 13, 0.95)", "rgba(20, 244, 226, 0.95)",];
  let accumulatedOffset = 0; const segments = percentages.map((percent, index) => { const dashOffset = circumference * (1 - percent / 100); const rotation = (accumulatedOffset / 100) * 360; accumulatedOffset += percent; return { color: colors[index % colors.length], offset: dashOffset, rotation: rotation, percent: percent, }; });
  return (
    <div ref={chartRef} className="relative w-52 h-52 md:w-56 md:h-56">
      <div className="absolute inset-0 rounded-full border-[18px] border-gray-800/50"></div>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {segments.map((segment, index) => (<circle key={index} className="chart-segment" cx="100" cy="100" r={radius} fill="none" stroke={segment.color} strokeWidth={strokeWidth} strokeDasharray={circumference} data-offset={segment.offset} strokeLinecap="round" transform={`rotate(${segment.rotation} 100 100)`} />))}
        <circle cx="100" cy="100" r="5" fill="#10ffb1" filter="drop-shadow(0 0 8px rgba(16, 255, 177, 0.7))" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <span id="chart-title" className="text-gray-100 text-sm mb-1 font-medium">Distribution</span>
        <div id="chart-percentages" className="flex items-baseline justify-center">
          <span className="text-[#10ffb1] font-bold text-xl">{segments[0].percent}%</span><span className="text-gray-300 mx-0.5 text-sm">/</span>
          <span className="text-[#a1fd0d] font-bold text-xl">{segments[1].percent}%</span><span className="text-gray-300 mx-0.5 text-sm">/</span>
          <span className="text-[#14f4e2] font-bold text-xl">{segments[2].percent}%</span>
        </div>
      </div>
    </div>
  );
});

const TokenCard = memo(({ item }) => {
  return (
    <div className={`group ${CARD_BASE_CLASSES} ${CARD_HOVER_EFFECTS}`}>
      <div className="flex items-center gap-3.5 mb-4"> <img src={item.logo} alt={item.name} className="token-icon w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110" /> <h4 className="text-lg font-semibold text-white">{item.name}</h4> </div>
      <div className="flex justify-between items-center mb-1.5"> <span className="text-gray-300 text-sm font-medium">Amount</span> <span className="text-gray-50 font-medium">{item.amount}</span> </div>
      <div className="flex justify-between items-center"> <span className="text-gray-300 text-sm font-medium">Value</span> <span className="text-gray-50 font-medium">{item.value}</span> </div>
    </div>
  );
});

const PoolCard = memo(({ item }) => (
  <div className={`group ${CARD_BASE_CLASSES} ${CARD_HOVER_EFFECTS} relative overflow-hidden`}>
    <div className={`${GLOWING_CORNER_CLASSES_BASE} -top-8 -right-8`}></div>
    <div className="flex items-center gap-3 mb-3"> <img src={item.logo} alt={item.name} className="w-9 h-9 rounded-full p-0.5 bg-white/5" /> <h4 className="text-lg font-semibold text-white">{item.name}</h4> </div>
    <div className="flex justify-between text-sm mb-1"> <span className="text-gray-300">APY</span> <span className="text-[#10ffb1] font-semibold">{item.apy}</span> </div>
    <div className="flex justify-between text-sm mb-3"> <span className="text-gray-300">Liquidity</span> <span className="text-gray-50">{item.liquidity}</span> </div>
    <button className={CARD_BUTTON_CLASSES}> Join Pool </button>
  </div>
));

const FarmCard = memo(({ item }) => (
  <div className={`group ${CARD_BASE_CLASSES} ${CARD_HOVER_EFFECTS} relative overflow-hidden`}>
    <div className={`${GLOWING_CORNER_CLASSES_BASE} -bottom-8 -left-8`}></div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-[#10ffb1]/80 flex items-center justify-center text-black font-bold text-base"> {item.name.charAt(5) || 'F'} </div>
      <h4 className="text-lg font-semibold text-white">{item.name}</h4>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
      {[{ label: "Your Staked", value: item.staked, highlight: false }, { label: "Fees APR", value: item.fees, highlight: true }, { label: "Boosted APR", value: item.boostedAPR, highlight: true }, { label: "Total Rewards", value: item.rewards, highlight: false },].map(detail => (<div key={detail.label} className="bg-white/5 p-2 rounded-md"> <p className="text-gray-200 mb-0.5">{detail.label}</p> <p className={`${detail.highlight ? 'text-[#10ffb1]' : 'text-gray-50'} font-semibold`}>{detail.value}</p> </div>))}
    </div>
    <button className={CARD_BUTTON_CLASSES}> Stake More </button>
  </div>
));

const Portfolio = () => {
  const dummyAddress = "erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
  const truncatedAddress = `${dummyAddress.slice(0, 6)}...${dummyAddress.slice(-4)}`;
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline.fromTo(["#slogan", "#walletContainer"], { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .fromTo(".top-card", { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .fromTo([".section-heading", ".token-card-item", ".pool-card-item", ".farm-card-item", ".rewards-breakdown-item", ".latest-activity-item"], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 }, "-=0.2");
  }, []);
  const sharedCardClass = `${CARD_BASE_CLASSES} ${CARD_HOVER_EFFECTS}`;
  const buttonClass = CARD_BUTTON_CLASSES;

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 flex flex-col items-center py-8 px-4 relative overflow-x-hidden">
      <PulsatingStarField />
      <div className="max-w-7xl w-full relative z-10 space-y-12 md:space-y-16">
        <div className="text-center">
          <h1 id="slogan" className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-6 tracking-wide" style={{ textShadow: "0 0 12px rgba(16, 255, 177, 0.4)" }}> Your Portfolio </h1>
          <div id="walletContainer" className={`inline-flex items-center gap-2.5 mx-auto px-4 py-2.5 border border-[#10ffb1]/30 rounded-full shadow-lg bg-black/70 ${CARD_HOVER_EFFECTS} cursor-pointer group`}>
            <FaWallet className="w-4 h-4 text-[#10ffb1]" /> <span className="font-mono text-sm text-white tracking-wider font-medium">{truncatedAddress}</span> <FaArrowRight className="w-3 h-3 text-[#10ffb1]/80 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className={`top-card ${sharedCardClass}`}> <h2 className="text-[#10ffb1] text-sm uppercase tracking-wider mb-2 font-semibold flex items-center"> <span className="inline-block w-1.5 h-1.5 bg-[#10ffb1] rounded-full mr-2"></span> Total Balance </h2> <p className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">$4,253.78</p> <div className="flex gap-3"> <button className={buttonClass}>Invest</button> <button className={buttonClass}>Swap</button></div> </div>
          <div className={`top-card flex items-center justify-center ${sharedCardClass} p-4`}> <DistributionChart /> </div>
          <div className={`top-card ${sharedCardClass}`}> <h2 className="text-[#10ffb1] text-sm uppercase tracking-wider mb-2 font-semibold flex items-center"> <span className="inline-block w-1.5 h-1.5 bg-[#10ffb1] rounded-full mr-2"></span> Available Rewards </h2> <p className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">$153.78</p> <button className={buttonClass}>Claim All</button> </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className={`${sharedCardClass} rewards-breakdown-item`}> <h3 className="text-[#10ffb1] text-sm uppercase tracking-wider mb-5 font-semibold flex items-center"> <span className="inline-block w-1.5 h-1.5 bg-[#10ffb1] rounded-full mr-2"></span> Rewards Breakdown </h3> <div className="space-y-5"> <div> <div className="flex justify-between text-sm text-gray-50 mb-1.5 font-medium"> <span>Fees</span> <span className="text-[#10ffb1] font-semibold">$34.36 (78.3%)</span> </div> <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden"> <div className="bg-[#10ffb1] h-2 rounded-full" style={{ width: "78%" }}></div> </div> </div> <div> <div className="flex justify-between text-sm text-gray-50 mb-1.5 font-medium"> <span>Boosted Farms</span> <span className="text-[#10ffb1] font-semibold">$26.07 (21.6%)</span> </div> <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden"> <div className="bg-[#10ffb1] h-2 rounded-full" style={{ width: "22%" }}></div> </div> </div> </div> </div>
          <div className={`${sharedCardClass} latest-activity-item`}> <h3 className="text-[#10ffb1] text-sm uppercase tracking-wider mb-5 font-semibold flex items-center"> <span className="inline-block w-1.5 h-1.5 bg-[#10ffb1] rounded-full mr-2"></span> Latest Activity </h3> <ul className="space-y-3"> {[{ text: "Swapped ETH to USDC", value: "-0.5 ETH", color: "bg-red-400/70" }, { text: "Invested in EGLD", value: "+50 EGLD", color: "bg-[#10ffb1]/70" }, { text: "Claimed Rewards", value: "$153.78", color: "bg-[#10ffb1]/70" },].map((activity, i) => (<li key={i} className="flex justify-between p-2.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200 text-sm"> <span className="text-gray-100 flex items-center font-medium"> <span className={`w-2 h-2 ${activity.color} rounded-full mr-2.5`}></span> {activity.text} </span> <span className="text-gray-50 font-medium">{activity.value}</span> </li>))} </ul> </div>
        </div>
        {(['Tokens', 'Pools', 'Farms']).map(sectionTitle => {
          const data = sectionTitle === 'Tokens' ? portfolioData : sectionTitle === 'Pools' ? poolData : farmData;
          const gridCols = sectionTitle === 'Tokens' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
          const itemClass = sectionTitle === 'Tokens' ? 'token-card-item' : sectionTitle === 'Pools' ? 'pool-card-item' : 'farm-card-item';
          return (
            <div key={sectionTitle} className="section-container">
              <h3 className="section-heading text-xl font-semibold text-white mb-5 flex items-center"> <div className="w-1 h-6 bg-[#10ffb1] rounded-r mr-2.5"></div> My {sectionTitle} </h3>
              {data.length > 0 ? (
                <div className={`grid grid-cols-1 ${gridCols} gap-5 md:gap-6`}>
                  {data.map((item) => (<div key={item.id} className={itemClass}> {sectionTitle === 'Tokens' && <TokenCard item={item} />} {sectionTitle === 'Pools' && <PoolCard item={item} />} {sectionTitle === 'Farms' && <FarmCard item={item} />} </div>))}
                </div>
              ) : (<p className="text-gray-300">No {sectionTitle.toLowerCase()} found.</p>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;