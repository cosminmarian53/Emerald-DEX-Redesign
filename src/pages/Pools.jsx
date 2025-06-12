import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Pulsating Star Field Component
const PulsatingStarField = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create star arrays
    const stars = [];
    const pulsatingStars = [];
    const shootingStars = [];

    // Initialize stars
    const initStars = () => {
      // Background stars - smaller, more subtle for this UI
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.1,
          opacity: Math.random() * 0.6 + 0.1,
          hue: Math.random() < 0.8 ? 145 : 155, // Emerald color range
        });
      }

      // Pulsating stars - the emerald accent stars
      for (let i = 0; i < 40; i++) {
        pulsatingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.8 + 0.5,
          radius: 0,
          opacity: 0,
          hue: 150, // Emerald green
          saturation: Math.random() * 20 + 80, // 80-100%
          pulse: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize a few shooting stars
      for (let i = 0; i < 2; i++) {
        addShootingStar();
      }
    };

    // Add a new shooting star
    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3), // Start in top third
        length: Math.random() * 80 + 40,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4, // 45-90 degree angle
        speed: Math.random() * 12 + 8,
        opacity: 0,
        hue: 145 + Math.random() * 15, // Emerald hue range
        decay: 0.01 + Math.random() * 0.02,
      });
    };

    // Draw all stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw regular stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`;
        ctx.fill();
      });

      // Draw pulsating stars
      pulsatingStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 65%, ${star.opacity})`;
        ctx.shadowBlur = star.radius * 5;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw shooting stars
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

        // Draw glow effect at head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(145, 100%, 80%, ${star.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(145, 100%, 70%, ${star.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    // Animate the stars
    const animateStars = () => {
      // Animate pulsating stars
      pulsatingStars.forEach(star => {
        star.phase += 0.015;
        star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.6;
        star.opacity = 0.3 + Math.sin(star.phase) * 0.5;
      });

      // Animate shooting stars
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) {
          if (Math.random() < 0.01) { // Only spawn new shooting star rarely
            shootingStars[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * (canvas.height / 3),
              length: Math.random() * 80 + 40,
              angle: Math.random() * Math.PI / 4 + Math.PI / 4,
              speed: Math.random() * 12 + 8,
              opacity: 0,
              hue: 145 + Math.random() * 15,
              decay: 0.01 + Math.random() * 0.02,
            };
          }
          return;
        }

        // Grow opacity at start
        if (star.opacity < 1 && star.x > canvas.width * 0.8) {
          star.opacity += 0.07;
        } else {
          // Move and fade
          star.x -= star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= star.decay;
        }

        // Remove when out of view
        if (star.x < 0 || star.y > canvas.height) {
          star.opacity = 0;
        }
      });

      // Add new shooting stars occasionally
      if (Math.random() < 0.002) {
        addShootingStar();
      }

      drawStars();
      requestAnimationFrame(animateStars);
    };

    // Initialize and start animation
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

// Map token symbols to their images using the provided URLs
const tokenImages = {
  USDC: usdcImg,
  EGLD: egldImg,
  ETH: ethImg,
  BNB: bnbImg,
  BTC: btcImg,
  SOL: solImg,
};

// Sample data
const poolsData = [
  {
    id: 1,
    pair: 'USDC-EGLD',
    poolAssets: [
      { token: 'USDC', contract: '0x123' },
      { token: 'EGLD', contract: '0x456' },
    ],
    liquidity: '$10,000',
    fees: '$100',
    volume24h: '$1,000',
    yourLiquidity: '50 USDC',
    share: '5%',
  },
  {
    id: 2,
    pair: 'ETH-BNB',
    poolAssets: [
      { token: 'ETH', contract: '0x789' },
      { token: 'BNB', contract: '0xabc' },
    ],
    liquidity: '$20,000',
    fees: '$200',
    volume24h: '$2,000',
    yourLiquidity: '1 ETH',
    share: '10%',
  },
  {
    id: 3,
    pair: 'BTC-SOL',
    poolAssets: [
      { token: 'BTC', contract: '0xdef' },
      { token: 'SOL', contract: '0xghi' },
    ],
    liquidity: '$30,000',
    fees: '$300',
    volume24h: '$3,000',
    yourLiquidity: '0.5 BTC',
    share: '15%',
  },
  {
    id: 4,
    pair: 'USDC-BTC',
    poolAssets: [
      { token: 'USDC', contract: '0xjkl' },
      { token: 'BTC', contract: '0xmnop' },
    ],
    liquidity: '$40,000',
    fees: '$400',
    volume24h: '$4,000',
    yourLiquidity: '100 USDC',
    share: '20%',
  },
  {
    id: 5,
    pair: 'EGLD-SOL',
    poolAssets: [
      { token: 'EGLD', contract: '0xqrst' },
      { token: 'SOL', contract: '0xuvw' },
    ],
    liquidity: '$50,000',
    fees: '$500',
    volume24h: '$5,000',
    yourLiquidity: '2 EGLD',
    share: '25%',
  },
  {
    id: 6,
    pair: 'ETH-USDC',
    poolAssets: [
      { token: 'ETH', contract: '0xxyz' },
      { token: 'USDC', contract: '0xabc' },
    ],
    liquidity: '$60,000',
    fees: '$600',
    volume24h: '$6,000',
    yourLiquidity: '0.2 ETH',
    share: '30%',
  }
];

// Framer Motion animation variants for row expansion
const expandVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

const Pools = () => {
  const navigate = useNavigate();
  const [expandedPool, setExpandedPool] = useState(null);
  const [modalData, setModalData] = useState({ type: '', pool: null });

  const headerRef = useRef(null);
  const subHeaderRef = useRef(null);
  const tableRef = useRef(null);
  const newPoolBtnRef = useRef(null);

  // Enhanced GSAP animations
  useEffect(() => {
    // Main content animations
    gsap.fromTo(
      "#header",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );

    gsap.fromTo(
      "#subheader",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
    );

    // Button animations with glow effect
    gsap.fromTo(
      "#newPoolBtn",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 1,
        onComplete: () => {
          // Add pulsing glow after button appears
          gsap.to("#newPoolBtn", {
            boxShadow: "0 0 20px rgba(0, 242, 171, 0.7)",
            repeat: -1,
            yoyo: true,
            duration: 2
          });
        }
      }
    );

    // Table animations with staggered effect
    gsap.fromTo(
      ".pool-item",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.2
      }
    );
  }, []);

  const toggleExpand = (id) => {
    setExpandedPool((prev) => (prev === id ? null : id));
  };

  const handleSwap = () => {
    navigate('/swap');
  };

  const openModal = (type, pool) => {
    setModalData({ type, pool });
  };

  const closeModal = () => {
    setModalData({ type: '', pool: null });
  };

  const renderModalContent = () => {
    if (!modalData.pool) return null;
    const { type, pool } = modalData;
    const [tokenA, tokenB] = pool.poolAssets; // Assuming all pools have at least two assets for 'add'

    if (type === 'add') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#00c58a]">
            Add Liquidity
          </h2>
          {/* Token A Input Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <img
              src={tokenImages[tokenA.token]}
              alt={tokenA.token}
              className="w-8 h-8 object-contain self-start sm:self-center"
            />
            <div className="flex-1 space-y-1">
              <label className="block text-sm text-gray-300">
                {tokenA.token} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring focus:ring-[#00f2ab]/30"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-[#00f2ab] px-2 py-0.5 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Balance: 1000 {tokenA.token} {/* Replace with actual balance */}
              </p>
            </div>
          </div>
          {/* Token B Input Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
            <img
              src={tokenImages[tokenB.token]}
              alt={tokenB.token}
              className="w-8 h-8 object-contain self-start sm:self-center"
            />
            <div className="flex-1 space-y-1">
              <label className="block text-sm text-gray-300">
                {tokenB.token} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring focus:ring-[#00f2ab]/30"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-[#00f2ab] px-2 py-0.5 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Balance: 5 {tokenB.token} {/* Replace with actual balance */}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300">
              Conversion Rate: 1 {tokenB.token} ≈ 350 {tokenA.token} {/* Replace with actual rate */}
            </p>
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded-full text-sm text-white hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal} // Replace with actual confirm logic
              className="px-4 py-2 bg-[#00f2ab] rounded-full text-sm text-black font-semibold hover:bg-[#00a676] transition-all hover:shadow-[0_0_15px_rgba(0,242,171,0.5)]"
            >
              Confirm
            </button>
          </div>
        </div>
      );
    } else if (type === 'remove') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-400">
            Remove Liquidity
          </h2>
          <div>
            <label className="block text-sm text-gray-300">
              Amount to Remove
            </label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring focus:ring-[#00f2ab]/30"
            />
            <p className="text-xs text-gray-400 mt-1">
              Balance: {pool.yourLiquidity}
            </p>
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded-full text-sm text-white hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeModal} // Replace with actual confirm logic
              className="px-4 py-2 bg-[#00f2ab] rounded-full text-sm text-black font-semibold hover:bg-[#00a676] transition-all hover:shadow-[0_0_15px_rgba(0,242,171,0.5)]"
            >
              Confirm
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="w-full min-h-screen bg-black text-[#c4ffc4] py-10 font-sans relative"
      style={{
        backgroundImage: `
          radial-gradient(rgba(0,197,138,0.07) 1px, transparent 1px), 
          radial-gradient(rgba(0,197,138,0.07) 1px, transparent 1px)
        `,
        backgroundPosition: '0 0, 25px 25px',
        backgroundSize: '50px 50px',
      }}
    >
      {/* Pulsating Star Background */}
      <PulsatingStarField />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <header className="max-w-6xl mx-auto text-center mb-12 px-4">
          <h1
            ref={headerRef}
            id="header"
            className="text-5xl section-heading text-spacing-2 md:text-6xl font-extrabold text-[#00c58a] drop-shadow-lg tracking-wide"
            style={{ textShadow: "0 0 15px rgba(0, 197, 138, 0.5)" }}
          >
            Liquidity Pools
          </h1>
          <p ref={subHeaderRef} id="subheader" className="text-white text-sm mt-2">
            Manage and explore decentralized liquidity on{' '}
            <span className="text-[#00f2ab] font-medium">EMERALD DEX</span>.
          </p>
          <button
            ref={newPoolBtnRef}
            id="newPoolBtn"
            className="mt-8 px-6 py-2.5 md:px-8 md:py-3 bg-[#00f2ab] text-black font-semibold rounded-full shadow-lg hover:bg-[#00a676] hover:text-white transition-all transform hover:scale-105"
          >
            + New Pool
          </button>
        </header>

        {/* Pool Items Container */}
        <div id="table" className="max-w-6xl mx-auto px-4" ref={tableRef}>
          {/* Table Header for md+ screens */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-x-3 py-2 text-[#81ffc1] border-b border-[#00f2ab]/30 mb-2 font-medium">
            <span className="md:col-span-3">Pool</span>
            <span className="md:col-span-2">Liquidity</span>
            <span className="md:col-span-2">Fees (24h)</span>
            <span className="md:col-span-2">Volume (24h)</span>
            <span className="md:col-span-3 text-right">Actions</span>
          </div>

          {/* Pool Items (Cards on mobile, Rows on md+) */}
          {poolsData.map((pool) => {
            const isExpanded = expandedPool === pool.id;
            return (
              <div
                key={pool.id}
                className="pool-item bg-[#00281a]/70 rounded-lg shadow-lg mb-4 md:bg-transparent md:shadow-none md:mb-0 md:border-b md:border-[#ffffff1a] transition-colors md:hover:bg-white/5"
              >
                <div
                  onClick={() => toggleExpand(pool.id)}
                  className="p-4 md:p-0 md:grid md:grid-cols-12 md:gap-x-3 md:py-3 md:items-center cursor-pointer"
                >
                  {/* Pool Name & Icons */}
                  <div className="flex items-center space-x-3 md:col-span-3 font-medium">
                    <div className="flex -space-x-2">
                      {pool.poolAssets.map((asset, idx) => (
                        <img
                          key={idx}
                          src={tokenImages[asset.token]}
                          alt={asset.token}
                          className="w-7 h-7 md:w-8 md:h-8 object-contain rounded-full ring-2 ring-black"
                          title={asset.token}
                        />
                      ))}
                    </div>
                    <span className="text-[#e0ffe0] text-base md:text-sm">{pool.pair}</span>
                  </div>

                  {/* Data Points - with labels for mobile */}
                  <div className="mt-3 md:mt-0 md:col-span-2 text-sm">
                    <span className="text-[#7fddb3] md:hidden font-semibold">Liquidity: </span>
                    <span className="text-gray-200 md:text-gray-100">{pool.liquidity}</span>
                  </div>
                  <div className="mt-1.5 md:mt-0 md:col-span-2 text-sm">
                    <span className="text-[#7fddb3] md:hidden font-semibold">Fees (24h): </span>
                    <span className="text-gray-200 md:text-gray-100">{pool.fees}</span>
                  </div>
                  <div className="mt-1.5 md:mt-0 md:col-span-2 text-sm">
                    <span className="text-[#7fddb3] md:hidden font-semibold">Volume (24h): </span>
                    <span className="text-gray-200 md:text-gray-100">{pool.volume24h}</span>
                  </div>

                  {/* Action Buttons - full width & stacked on mobile */}
                  <div className="mt-4 md:mt-0 md:col-span-3 flex flex-col space-y-2 md:flex-row md:justify-end md:space-x-2 md:space-y-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal("add", pool); }}
                      className="w-full md:w-auto border border-[#00f2ab] px-4 py-1.5 rounded-full text-xs font-medium text-[#00f2ab] hover:bg-[#00f2ab] hover:text-black transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal("remove", pool); }}
                      className="w-full md:w-auto border border-red-500 px-4 py-1.5 rounded-full text-xs font-medium text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                    >
                      Remove
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSwap(); }}
                      className="w-full md:w-auto bg-gradient-to-r from-[#00c58a] to-[#00f2ab] px-4 py-1.5 rounded-full text-xs font-semibold text-black hover:from-[#00f2ab] hover:to-[#00a676] transition-transform transform hover:scale-105 hover:shadow-[0_0_10px_rgba(0,242,171,0.5)]"
                    >
                      Swap
                    </button>
                  </div>
                </div>

                {/* Expanded Row Info */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key="expand"
                      variants={expandVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden bg-[#ffffff08] md:bg-[#ffffff0a] rounded-b-lg md:rounded-b-none"
                    >
                      <div className="p-4 flex flex-col md:flex-row md:items-start justify-between text-sm">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-md text-[#00f2ab] font-bold mb-2">
                            Pool Assets:
                          </h3>
                          {pool.poolAssets.map((asset, idx) => (
                            <div key={idx} className="mb-1">
                              <span className="font-semibold text-gray-100">{asset.token}</span>{' '}
                              <span className="text-gray-400">({asset.contract})</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-gray-300">
                            Your Liquidity:{' '}
                            <span className="text-gray-100 font-medium">
                              {pool.yourLiquidity}
                            </span>
                          </p>
                          <p className="text-gray-300 mt-1">
                            Pool Share:{' '}
                            <span className="text-gray-100 font-medium">
                              {pool.share}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal (Add/Remove Liquidity) */}
      <AnimatePresence>
        {modalData.type && (
          <motion.div
            key="modalBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ y: "50px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "50px", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#001a0f] p-5 md:p-6 rounded-xl shadow-2xl max-w-md w-full text-white border border-[#00f2ab]/30 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal particle effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-[#00f2ab]/10"
                    style={{
                      width: Math.random() * 10 + 2 + 'px',
                      height: Math.random() * 10 + 2 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      animation: `floatParticle ${Math.random() * 8 + 5}s linear infinite`
                    }}
                  />
                ))}
              </div>

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default Pools;