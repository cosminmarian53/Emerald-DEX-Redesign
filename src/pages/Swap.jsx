import React, { useState, useRef, useEffect, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Pulsating Star Field Component
const PulsatingStarField = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas to full screen
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
      // Background stars
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() < 0.8 ? 145 : 155, // Emerald color range
        });
      }

      // Pulsating stars
      for (let i = 0; i < 35; i++) {
        pulsatingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 2 + 0.5,
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
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 60%, ${star.opacity})`;
        ctx.shadowBlur = star.radius * 6;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 65%, 0.8)`;
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
        star.opacity = 0.3 + Math.sin(star.phase) * 0.7;
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

      // Add new shooting stars rarely
      if (Math.random() < 0.003) {
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
  const panelRef = useRef(null);

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

  // Add subtle floating animation to the swap panel
  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        y: "-10px",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const truncate = (addr = "") => addr.slice(0, 6) + "..." + addr.slice(-4);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount(val < 0 ? 0 : val);
  };

  const rateKey = `${fromToken.symbol}-${toToken.symbol}`;
  const rate = mockRates[rateKey] || 1;
  const mockPrice = (amount * rate).toFixed(4);

  const handleConnect = () => {
    // Connect button animation
    gsap.fromTo(
      ".connect-btn",
      { boxShadow: "0 0 20px rgba(0, 255, 153, 0.7)" },
      {
        boxShadow: "0 0 40px rgba(0, 255, 153, 0.9)",
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () => setAddress("0xAbCdEF1234567890GhIjKL7890MnOpQr")
      }
    );
  };

  const handleArrowSwap = () => {
    // Arrow animation
    gsap.to(".swap-arrow", {
      rotate: 180,
      duration: 0.5,
      ease: "back.out(1.7)",
      onComplete: () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setAmount(0);
      }
    });
  };

  const handleSwap = () => {
    if (!address) return;
    setSwapping(true);

    // Enhanced swap animation
    gsap.timeline()
      .to(swapBtnRef.current, {
        boxShadow: "0 0 30px rgba(0, 255, 153, 0.9)",
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(panelRef.current, {
        boxShadow: "0 0 40px rgba(0, 255, 153, 0.6)",
        duration: 0.6,
        yoyo: true,
        repeat: 1
      })
      .to(swapBtnRef.current, {
        boxShadow: "0 0 15px rgba(0, 255, 153, 0.7)",
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSwapping(false);
          setFromToken(toToken);
          setToToken(fromToken);
          setAmount(0);
        }
      });
  };

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col relative">
      {/* Pulsating Star Background */}
      <PulsatingStarField />

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center px-4 py-12 relative z-10">
        <h1
          id="heading"
          className="section-heading text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00cc99]"
          style={{ textShadow: "0 0 15px rgba(0, 255, 153, 0.5)" }}
        >
          Swap tokens like never before.
        </h1>
      </section>

      {/* Swap Panel */}
      <section id="swap-section" className="w-full px-4 pb-20 flex justify-center relative z-10">
        <div
          id="swap-panel"
          ref={panelRef}
          className="group w-full max-w-md min-h-[600px] perspective-[1000px]"
        >
          <div className="transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-3">
            <div className="bg-[#000]/90 p-1 rounded-2xl shadow-[0_0_15px_rgba(0,255,153,0.5)] hover:shadow-[0_0_25px_rgba(0,255,153,0.7)] transition-all duration-500">
              {/* Glass-like background with particle effect */}
              <div className="bg-gradient-to-br from-black to-[#071a12] p-6 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden">
                {/* Animated particles inside panel */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[#00ff99]/20"
                      style={{
                        width: Math.random() * 8 + 2 + 'px',
                        height: Math.random() * 8 + 2 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`
                      }}
                    />
                  ))}
                </div>

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6 relative">
                  <h1 className="text-2xl font-extrabold text-[#00ff99] drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                    EmeraldDEX
                  </h1>
                  {address ? (
                    <span className="text-sm font-medium bg-[#121212] px-3 py-1 rounded-full border border-[#00ff9930]">
                      {truncate(address)}
                    </span>
                  ) : (
                      <button
                        onClick={handleConnect}
                        className="connect-btn px-4 py-2 rounded-full font-semibold bg-[#00ff99] text-black hover:bg-[#00ffaa] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,153,0.4)]"
                      >
                        Connect Wallet
                      </button>
                  )}
                </div>

                {/* Inputs Section */}
                <div className="space-y-6 flex-grow">
                  {/* From Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-[#00ff99]/80">From</label>
                    <div className="flex bg-[#0a120f] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-[inset_0_0_10px_rgba(0,255,153,0.1)] transition-all duration-300 border border-[#00ff9920]">
                      <div className="flex items-center gap-2">
                        <img src={fromToken.logo} alt={fromToken.symbol} className="w-7 h-7" />
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
                        className="w-1/2 bg-transparent text-right outline-none text-white font-semibold placeholder-gray-500 focus:placeholder-[#00ff9960]"
                      />
                    </div>
                    <div className="text-xs text-[#00ff99]/60">Price: {mockPrice} {toToken.symbol}</div>
                  </div>

                  {/* Arrow Swap */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleArrowSwap}
                      className="swap-arrow w-12 h-12 bg-[#071a12] flex items-center justify-center rounded-full transition-all duration-500 hover:bg-[#0a201a] shadow-[0_0_10px_rgba(0,255,153,0.3)] hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00ff99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* To Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-[#00ff99]/80">To</label>
                    <div className="flex bg-[#0a120f] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-[inset_0_0_10px_rgba(0,255,153,0.1)] transition-all duration-300 border border-[#00ff9920]">
                      <div className="flex items-center gap-2">
                        <img src={toToken.logo} alt={toToken.symbol} className="w-7 h-7" />
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
                      <span className="text-white font-semibold">{mockPrice || "0.0000"}</span>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  ref={swapBtnRef}
                  onClick={handleSwap}
                  className="w-full py-4 rounded-full font-bold tracking-wide bg-gradient-to-r from-[#00ff99] to-[#00cc99] text-black shadow-[0_0_15px_rgba(0,255,153,0.4)] hover:shadow-[0_0_20px_rgba(0,255,153,0.6)] transition-all duration-300 mt-6 disabled:opacity-50 flex items-center justify-center"
                  disabled={!amount || !address || swapping}
                >
                  {swapping ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" strokeDasharray="30 150" strokeDashoffset="0">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 12 12"
                          to="360 12 12"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
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

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(10px); }
        }
      `}</style>
    </div>
  );
}