import React, { useState, useEffect, useRef, memo, useMemo } from 'react'; // Added useMemo
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Import token images
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Optimized Pulsating Star Field Component (copied from your Swap component structure)
const PulsatingStarField = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = [];
    const pulsatingStars = [];
    const shootingStars = [];

    const BACKGROUND_STAR_COUNT = 100;
    const PULSATING_STAR_COUNT = 25;
    const INITIAL_SHOOTING_STARS = 1;

    const initStars = () => {
      stars.length = 0;
      pulsatingStars.length = 0;
      shootingStars.length = 0;

      for (let i = 0; i < BACKGROUND_STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.2,
          opacity: Math.random() * 0.7 + 0.1,
          hue: Math.random() < 0.8 ? 145 : 155, // Emerald/Teal hues
        });
      }

      for (let i = 0; i < PULSATING_STAR_COUNT; i++) {
        pulsatingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.8 + 0.4,
          radius: 0,
          opacity: 0,
          hue: 150, // Emerald green
          saturation: Math.random() * 20 + 80,
          pulse: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      for (let i = 0; i < INITIAL_SHOOTING_STARS; i++) {
        addShootingStar();
      }
    };

    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        length: Math.random() * 70 + 40,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4,
        speed: Math.random() * 10, // Kept your speed adjustment
        opacity: 0,
        hue: 145 + Math.random() * 15,
        decay: 0.015 + Math.random() * 0.02,
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
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 60%, ${star.opacity})`;
        ctx.shadowBlur = star.radius * 5;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 65%, 0.7)`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
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
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(145, 100%, 80%, ${star.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(145, 100%, 70%, ${star.opacity * 0.8})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    };

    const animateStars = () => {
      pulsatingStars.forEach(star => {
        star.phase += 0.015;
        star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.6;
        star.opacity = 0.3 + Math.sin(star.phase) * 0.7;
        if (star.opacity < 0) star.opacity = 0;
      });
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) {
          if (Math.random() < 0.008 && shootingStars.filter(s => s.opacity > 0).length < 3) {
            shootingStars[index] = { ...star, x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), opacity: 0 };
          }
          return;
        }
        if (star.opacity < 1 && star.x > canvas.width * 0.8) { star.opacity += 0.07; }
        else { star.x -= star.speed; star.y += Math.sin(star.angle) * star.speed * 0.8; star.opacity -= star.decay; }
        if (star.x < 0 || star.y > canvas.height || star.y < 0) { star.opacity = 0; }
      });
      if (Math.random() < 0.002 && shootingStars.filter(s => s.opacity > 0).length < 2) { addShootingStar(); }
      drawStars();
      animationFrameId = requestAnimationFrame(animateStars);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
      resizeTimeout = setTimeout(() => { resizeCanvas(); initStars(); animateStars(); }, 100);
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas(); initStars(); animateStars();
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); clearTimeout(resizeTimeout); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-95" />; {/* z-[-1] to ensure it's behind content */ }
});


const tokenImages = {
  USDC: usdcImg, EGLD: egldImg, ETH: ethImg, BNB: bnbImg, BTC: btcImg, SOL: solImg,
  TADA: usdcImg, WEGLD: egldImg, XCR: ethImg, CEGLD: bnbImg, XGT: btcImg, WTAO: solImg, PRIZEEGLD: egldImg,
};

const getTokenImage = (tokenSymbol) => tokenImages[tokenSymbol.toUpperCase()] || null;

const FallbackTokenIcon = memo(({ tokenName }) => { // Memoized
  const colors = ['bg-emerald-700', 'bg-teal-700', 'bg-cyan-700', 'bg-sky-700', 'bg-indigo-700'];
  const charCodeSum = tokenName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (
    <div className={`w-full h-full rounded-full ${colors[charCodeSum % colors.length]} flex items-center justify-center text-white text-xs font-bold ring-1 ring-black/20`}>
      {tokenName.substring(0, 1).toUpperCase()}
    </div>
  );
});

const GreenCheckIcon = memo(() => ( // Memoized
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-emerald-400 ml-0.5">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
));

const sampleFarmsData = [ /* Your existing sampleFarmsData */
  { id: 1, tokenPair: 'TADA-WEGLD', tokenNames: ['TADA', 'WEGLD'], valueUSD: '~ $0.12', totalAPR: '30.26%', feesAPR: '20.21%', boostedAPR: '10.05%', totalStakedDisplay: '$1,888,999,220', totalRewardsDisplay: '$1,987,280', users: 234, isUserFarm: true, details: { totalStakedToken: '1.89M TADA-WEGLD', totalStakedUSD: '($4.53M)', yourStakedToken: '18.89K TADA-WEGLD', yourStakedUSD: '($45.33K)', totalRewardsBreakdown: [{ token: 'TADA', amount: '120K' }, { token: 'PRIZEEGLD', amount: '600.00' },], yourRewardsBreakdown: [{ token: 'TADA', amount: '120.00' }, { token: 'PRIZEEGLD', amount: '60.00' },], }, },
  { id: 2, tokenPair: 'CEGLD-XCR', tokenNames: ['CEGLD', 'XCR'], valueUSD: '~ $1.05', totalAPR: '10.5%', feesAPR: '10.5%', boostedAPR: '0%', totalStakedDisplay: '$698,334,830', totalRewardsDisplay: '$865,630', users: 119, isUserFarm: false, details: { totalStakedToken: '698K CEGLD-XCR', totalStakedUSD: '($0.7M)', yourStakedToken: 'N/A', yourStakedUSD: '', totalRewardsBreakdown: [{ token: 'CEGLD', amount: '86K' },], yourRewardsBreakdown: [{ token: 'CEGLD', amount: 'N/A' },], }, },
  { id: 3, tokenPair: 'XGT-XCR', tokenNames: ['XGT', 'XCR'], valueUSD: '~ $2.30', totalAPR: '60%', feesAPR: '40%', boostedAPR: '20%', totalStakedDisplay: '$3,549,871,000', totalRewardsDisplay: '$10,542,280', users: 634, isUserFarm: true, details: { totalStakedToken: '3.55B XGT-XCR', totalStakedUSD: '($8.16B)', yourStakedToken: '1.2M XGT-XCR', yourStakedUSD: '($2.76M)', totalRewardsBreakdown: [{ token: 'XGT', amount: '5M' }, { token: 'XCR', amount: '5M' },], yourRewardsBreakdown: [{ token: 'XGT', amount: '50K' }, { token: 'XCR', amount: '50K' },], }, },
  { id: 4, tokenPair: 'WTAO-WEGLD', tokenNames: ['WTAO', 'WEGLD'], valueUSD: '~ $0.88', totalAPR: '5.9%', feesAPR: '5.15%', boostedAPR: '0.75%', totalStakedDisplay: '$98,754,310', totalRewardsDisplay: '$79,980', users: 27, isUserFarm: false, details: { totalStakedToken: '98.75M WTAO-WEGLD', totalStakedUSD: '($86.9M)', yourStakedToken: 'N/A', yourStakedUSD: '', totalRewardsBreakdown: [{ token: 'WTAO', amount: '7.9K' },], yourRewardsBreakdown: [{ token: 'WTAO', amount: 'N/A' },], }, },
];
const ITEMS_PER_PAGE = 10;

const expandVariants = { /* Your existing variants */
  hidden: { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
  visible: { height: 'auto', opacity: 1, marginTop: '0rem', marginBottom: '0rem' },
  exit: { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
};

const Farms = () => {
  const [expandedFarm, setExpandedFarm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMyFarms, setShowMyFarms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const titleRef = useRef(null);
  const controlsRef = useRef(null);
  const farmListRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
      .fromTo(controlsRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(farmListRef.current?.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.5");
  }, []);

  const toggleExpand = (id) => {
    setExpandedFarm((prev) => (prev === id ? null : id));
  };

  // Memoize filtered and paginated farms for performance
  const filteredFarms = useMemo(() => {
    return sampleFarmsData
      .filter(farm => farm.tokenPair.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(farm => (showMyFarms ? farm.isUserFarm : true));
  }, [searchTerm, showMyFarms]); // sampleFarmsData is constant here, so not in deps

  const paginatedFarms = useMemo(() => {
    return filteredFarms.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredFarms, currentPage]);

  const totalPages = Math.ceil(filteredFarms.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Optional: Scroll to top of list or animate new items in
      farmListRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
      gsap.fromTo(farmListRef.current?.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#c4ffc4] py-10 px-4 md:px-8 font-sans relative"> {/* Added relative for z-indexing context */}
      <PulsatingStarField /> {/* Star field added here */}

      {/* Content needs a higher z-index to be above the star field if star field is not z-[-1] */}
      <div className="relative z-[1]"> {/* Wrapper for content to ensure it's above stars */}
        <header className="max-w-7xl mx-auto mb-8 md:mb-12">
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-emerald-400 mb-6 md:mb-8 text-center tracking-tight drop-shadow-[0_2px_2px_rgba(0,242,171,0.5)]">
            Farms
          </h1>
          <div ref={controlsRef} className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-3 bg-[#1a1a1a]/80 p-1.5 rounded-full border border-gray-700/70">
              <label htmlFor="myFarmsToggle" className="text-sm text-emerald-200 cursor-pointer pl-2">My Farms</label>
              <button
                id="myFarmsToggle"
                onClick={() => setShowMyFarms(!showMyFarms)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none ${showMyFarms ? 'bg-emerald-500' : 'bg-gray-600'}`}
              >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showMyFarms ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search farms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 bg-[#1a1a1a]/80 text-emerald-100 placeholder-emerald-300/60 px-4 py-2.5 rounded-full border border-gray-700/70 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
              />
              <svg className="w-4 h-4 text-emerald-300/60 absolute right-4 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </header>

        <div ref={farmListRef} className="max-w-7xl mx-auto">
          <div className="hidden md:grid md:grid-cols-12 gap-x-3 lg:gap-x-4 items-center py-3 px-3 text-xs text-emerald-300/70 border-b border-gray-700/50 mb-1 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
            <span className="col-span-3 lg:col-span-3">Farm</span>
            <span className="col-span-2 lg:col-span-1 text-right">Total APR</span>
            <span className="col-span-1 lg:col-span-1 text-right">Fees APR</span>
            <span className="col-span-2 lg:col-span-1 text-right">Boosted APR</span>
            <span className="col-span-2 lg:col-span-2 text-right">Total Staked</span>
            <span className="col-span-2 lg:col-span-2 text-right">Total Rewards</span>
            <span className="col-span-1 lg:col-span-1 text-right">Users</span>
            <span className="col-span-1 lg:col-span-1 text-center"></span>
          </div>

          {paginatedFarms.length > 0 ? paginatedFarms.map((farm) => {
            const isExpanded = expandedFarm === farm.id;
            return (
              <div key={farm.id} className="md:mb-0 border-b border-gray-800/70 last:border-b-0">
                <div
                  onClick={() => toggleExpand(farm.id)}
                  className={`hover:bg-[#111111] p-3 md:p-0 rounded-lg md:rounded-none transition-all duration-200 cursor-pointer md:grid md:grid-cols-12 md:gap-x-3 lg:gap-x-4 md:items-center md:py-4 md:px-3`}
                >
                  <div className="col-span-3 lg:col-span-3 flex items-center space-x-3">
                    <div className="flex -space-x-2.5">
                      {farm.tokenNames.slice(0, 2).map(name => {
                        const imgSrc = getTokenImage(name);
                        return (
                          <div key={name} className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-800 ring-2 ring-black overflow-hidden shadow-md">
                            {imgSrc ? <img src={imgSrc} alt={name} className="w-full h-full object-cover" /> : <FallbackTokenIcon tokenName={name} />}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-emerald-100 group-hover:text-emerald-50">{farm.tokenPair}</p>
                      <p className="text-xs text-emerald-300/60">{farm.valueUSD}</p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 col-span-2 lg:col-span-1 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Total APR: </span> <span className="text-emerald-200">{farm.totalAPR}</span> </div>
                  <div className="mt-1 md:mt-0 col-span-1 lg:col-span-1 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Fees APR: </span> <span className="text-emerald-200">{farm.feesAPR}</span> </div>
                  <div className="mt-1 md:mt-0 col-span-2 lg:col-span-1 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Boosted APR: </span> <span className="text-emerald-200">{farm.boostedAPR}</span> </div>
                  <div className="mt-1 md:mt-0 col-span-2 lg:col-span-2 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Total Staked: </span> <span className="text-emerald-100 font-medium inline-flex items-center">{farm.totalStakedDisplay} {farm.totalStakedDisplay !== "N/A" && <GreenCheckIcon />}</span> </div>
                  <div className="mt-1 md:mt-0 col-span-2 lg:col-span-2 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Total Rewards: </span> <span className="text-emerald-100">{farm.totalRewardsDisplay}</span> </div>
                  <div className="mt-1 md:mt-0 col-span-1 lg:col-span-1 md:text-right text-sm"> <span className="font-medium text-emerald-300/60 md:hidden">Users: </span> <span className="text-emerald-100">{farm.users}</span> </div>
                  <div className="col-span-1 lg:col-span-1 flex justify-end md:justify-center items-center mt-2 md:mt-0">
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /> </svg>
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key={`expanded-${farm.id}`} variants={expandVariants} initial="hidden" animate="visible" exit="exit"
                      transition={{ duration: 0.3, ease: "circOut" }}
                      className="overflow-hidden bg-[#0d0d0d] md:bg-[#0a0a0a]"
                    >
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm border-t border-gray-800/70">
                        <div className="space-y-1"> <p className="text-emerald-300/70 font-medium">Total Staked</p> <p className="text-emerald-100 text-base font-semibold">{farm.details.totalStakedToken}</p> <p className="text-emerald-300/60 text-xs">{farm.details.totalStakedUSD}</p> </div>
                        <div className="space-y-1"> <p className="text-emerald-300/70 font-medium">Your Staked</p> <p className="text-emerald-100 text-base font-semibold">{farm.details.yourStakedToken}</p> <p className="text-emerald-300/60 text-xs">{farm.details.yourStakedUSD}</p> </div>
                        <div className="space-y-1"> <p className="text-emerald-300/70 font-medium">Total Rewards</p> {farm.details.totalRewardsBreakdown.map(reward => (<p key={reward.token} className="text-emerald-100">{reward.amount} {reward.token}</p>))} </div>
                        <div className="space-y-1"> <p className="text-emerald-300/70 font-medium">Your Rewards</p> {farm.details.yourRewardsBreakdown.map(reward => (<p key={reward.token} className="text-emerald-100">{reward.amount} {reward.token}</p>))} </div>
                        <div className="md:col-span-2 lg:col-span-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3">
                          <button className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-md hover:shadow-emerald-500/30 transition-all duration-200 transform hover:scale-105"> STAKE LP </button>
                          <button className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-md hover:shadow-amber-500/30 transition-all duration-200 transform hover:scale-105"> CLAIM </button>
                          <button className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-red-600/30 transition-all duration-200 transform hover:scale-105"> UNSTAKE </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }) : (
            <div className="text-center py-10 text-emerald-300/70">No farms found.</div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-2 text-sm text-emerald-200">
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> &laquo; </button>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> &lsaquo; </button>
              <span className="px-3 py-1 bg-[#1a1a1a]/70 rounded-md"> Page {currentPage} of {totalPages} </span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> &rsaquo; </button>
              <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> &raquo; </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farms;