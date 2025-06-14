import React, { useState, useRef, useEffect, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Optimized Pulsating Star Field Component (using your latest version)
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
          hue: Math.random() < 0.8 ? 145 : 155,
        });
      }

      for (let i = 0; i < PULSATING_STAR_COUNT; i++) {
        pulsatingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.8 + 0.4,
          radius: 0,
          opacity: 0,
          hue: 150,
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
        length: Math.random() * 70 + 40, // Your specified length
        angle: Math.random() * Math.PI / 4 + Math.PI / 4,
        speed: Math.random() * 10,       // Your specified speed
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
            shootingStars[index] = {
              ...star,
              x: Math.random() * canvas.width,
              y: Math.random() * (canvas.height / 3),
              opacity: 0,
            };
          }
          return;
        }
        if (star.opacity < 1 && star.x > canvas.width * 0.8) {
          star.opacity += 0.07;
        } else {
          star.x -= star.speed;
          star.y += Math.sin(star.angle) * star.speed * 0.8;
          star.opacity -= star.decay;
        }
        if (star.x < 0 || star.y > canvas.height || star.y < 0) {
          star.opacity = 0;
        }
      });

      if (Math.random() < 0.002 && shootingStars.filter(s => s.opacity > 0).length < 2) {
        addShootingStar();
      }

      drawStars();
      animationFrameId = requestAnimationFrame(animateStars);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initStars();
        animateStars();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();
    initStars();
    animateStars();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-95" />;
});

const tokens = [
  { symbol: "USDC", logo: usdcImg },
  { symbol: "ETH", logo: ethImg },
  { symbol: "BTC", logo: btcImg },
  { symbol: "BNB", logo: bnbImg },
  { symbol: "SOL", logo: solImg },
  { symbol: "EGLD", logo: egldImg },
];

const mockRates = {
  "USDC-EGLD": 0.025, "EGLD-USDC": 40,
  "USDC-ETH": 0.00028, "ETH-USDC": 3500,
  "ETH-BTC": 0.06, "BTC-ETH": 16.67,
};

export default function Swap() {
  const [address, setAddress] = useState("");
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState("");
  const [swapping, setSwapping] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false); // New state for connect wallet loading
  const swapBtnRef = useRef(null);
  const panelRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo("#heading", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" });
    gsap.fromTo("#swap-panel", { scale: 0.8, opacity: 0, rotateY: 30, transformPerspective: 800 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 });
  }, []);

  useEffect(() => {
    let floatingAnimation;
    if (panelRef.current) {
      floatingAnimation = gsap.to(panelRef.current, { y: "-8px", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    return () => {
      floatingAnimation?.kill();
    }
  }, []);

  const truncate = (addr = "") => addr.length > 10 ? addr.slice(0, 6) + "..." + addr.slice(-4) : addr;

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      const numVal = parseFloat(val);
      setAmount(val === "" ? "" : (numVal < 0 ? "0" : val));
    }
  };

  const fromAmount = parseFloat(amount) || 0;
  const rateKey = `${fromToken.symbol}-${toToken.symbol}`;
  const inverseRateKey = `${toToken.symbol}-${fromToken.symbol}`;
  const rate = mockRates[rateKey] || (mockRates[inverseRateKey] ? 1 / mockRates[inverseRateKey] : 1);
  const toAmountDisplay = (fromAmount * rate).toFixed(fromToken.symbol === "USDC" || toToken.symbol === "USDC" ? 2 : 4);

  const handleConnect = () => {
    setConnectingWallet(true); // Start loading
    gsap.fromTo(".connect-btn",
      { boxShadow: "0 0 20px rgba(0, 255, 153, 0.7)" },
      {
        boxShadow: "0 0 40px rgba(0, 255, 153, 0.9)",
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () => {
          setAddress("0xAbCdEF1234567890GhIjKL7890MnOpQr");
          setConnectingWallet(false); // Stop loading
        }
      }
    );
  };

  const handleArrowSwap = () => {
    gsap.to(".swap-arrow", { rotate: '+=180', duration: 0.5, ease: "back.out(1.7)", onComplete: () => { setFromToken(toToken); setToToken(fromToken); setAmount(""); } });
  };

  const handleSwap = () => {
    if (!address || !parseFloat(amount) > 0) return;
    setSwapping(true);
    gsap.timeline()
      .to(swapBtnRef.current, { boxShadow: "0 0 30px rgba(0, 255, 153, 0.9)", scale: 1.05, duration: 0.3, ease: "power2.out" })
      .to(panelRef.current, { boxShadow: "0 0 40px rgba(0, 255, 153, 0.6)", duration: 0.6, yoyo: true, repeat: 1 })
      .to(swapBtnRef.current, { boxShadow: "0 0 15px rgba(0, 255, 153, 0.7)", scale: 1, duration: 0.3, ease: "power2.in", onComplete: () => { setSwapping(false); setAmount(""); } });
  };

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col relative">
      <PulsatingStarField />
      <section id="hero" className="flex flex-col items-center justify-center text-center px-4 py-16 relative z-10">
        <h1
          id="heading"
          className="section-heading text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff99] to-[#00cc99]" // Your specified header size
          style={{ textShadow: "0 0 20px rgba(0, 255, 153, 0.6)" }}
        >
          Swap tokens like never before.
        </h1>
      </section>
      <section id="swap-section" className="w-full px-4 pb-20 flex justify-center relative z-10">
        <div id="swap-panel" ref={panelRef} className="group w-full max-w-md min-h-[600px] perspective-[1000px]">
          <div className="transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-3">
            <div className="bg-[#000]/90 p-1 rounded-2xl shadow-[0_0_15px_rgba(0,255,153,0.5)] hover:shadow-[0_0_25px_rgba(0,255,153,0.7)] transition-all duration-500">
              <div className="bg-gradient-to-br from-black to-[#071a12] p-6 rounded-2xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-[#00ff99]/10"
                      style={{ width: Math.random() * 6 + 2 + 'px', height: Math.random() * 6 + 2 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animation: `float ${Math.random() * 12 + 12}s linear infinite ${Math.random() * -5}s` }} />
                  ))}
                </div>
                <div className="flex justify-between items-center mb-6 relative">
                  <h1 className="text-2xl font-extrabold text-[#00ff99] drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">EmeraldDEX</h1>
                  {address ? (<span className="text-sm font-medium bg-[#121212] px-3 py-1 rounded-full border border-[#00ff9930]"> {truncate(address)} </span>
                  ) : (
                      <button
                        onClick={handleConnect}
                        disabled={connectingWallet} // Disable button while connecting
                        className="connect-btn px-4 py-2 rounded-full font-semibold bg-[#00ff99] text-black hover:bg-[#00ffaa] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,153,0.4)] flex items-center justify-center min-w-[140px]" // Added min-w for consistent size
                      >
                        {connectingWallet ? (
                          <svg className="w-5 h-5 animate-spin text-black" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="30 150" strokeDashoffset="0">
                              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        ) : (
                          "Connect Wallet"
                        )}
                      </button>
                  )}
                </div>
                <div className="space-y-6 flex-grow">
                  <div className="space-y-1">
                    <label className="text-xs text-[#00ff99]/80">From</label>
                    <div className="flex bg-[#0a120f] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-[inset_0_0_10px_rgba(0,255,153,0.1)] transition-all duration-300 border border-[#00ff9920]">
                      <div className="flex items-center gap-2">
                        <img src={fromToken.logo} alt={fromToken.symbol} className="w-7 h-7" />
                        <select value={fromToken.symbol} onChange={(e) => setFromToken(tokens.find((t) => t.symbol === e.target.value))} className="bg-transparent outline-none text-white font-medium appearance-none cursor-pointer pr-2">
                          {tokens.map((t) => (<option key={t.symbol} className="text-black bg-gray-800">{t.symbol}</option>))}
                        </select>
                      </div>
                      <input type="number" value={amount} onChange={handleAmountChange} placeholder="0.0" className="w-1/2 bg-transparent text-right outline-none text-white font-semibold placeholder-gray-500 focus:placeholder-[#00ff9960] remove-arrow" />
                    </div>
                    {amount && <div className="text-xs text-[#00ff99]/60 text-right pr-1">~ {toAmountDisplay} {toToken.symbol}</div>}
                  </div>
                  <div className="flex justify-center"> <button onClick={handleArrowSwap} className="swap-arrow w-12 h-12 bg-[#071a12] flex items-center justify-center rounded-full transition-all duration-500 hover:bg-[#0a201a] shadow-[0_0_10px_rgba(0,255,153,0.3)] hover:shadow-[0_0_15px_rgba(0,255,153,0.5)]"> <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00ff99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /> </svg> </button> </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#00ff99]/80">To</label>
                    <div className="flex bg-[#0a120f] rounded-lg p-3 items-center justify-between shadow-inner hover:shadow-[inset_0_0_10px_rgba(0,255,153,0.1)] transition-all duration-300 border border-[#00ff9920]">
                      <div className="flex items-center gap-2">
                        <img src={toToken.logo} alt={toToken.symbol} className="w-7 h-7" />
                        <select value={toToken.symbol} onChange={(e) => setToToken(tokens.find((t) => t.symbol === e.target.value))} className="bg-transparent outline-none text-white font-medium appearance-none cursor-pointer pr-2">
                          {tokens.map((t) => (<option key={t.symbol} className="text-black bg-gray-800">{t.symbol}</option>))}
                        </select>
                      </div>
                      <span className="text-white font-semibold">{fromAmount > 0 ? toAmountDisplay : "0.0000"}</span>
                    </div>
                  </div>
                </div>
                <button ref={swapBtnRef} onClick={handleSwap} className="w-full py-4 rounded-full font-bold tracking-wide bg-gradient-to-r from-[#00ff99] to-[#00cc99] text-black shadow-[0_0_15px_rgba(0,255,153,0.4)] hover:shadow-[0_0_20px_rgba(0,255,153,0.6)] transition-all duration-300 mt-6 disabled:opacity-50 flex items-center justify-center" disabled={!(parseFloat(amount) > 0) || !address || swapping}>
                  {swapping ? (<svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" strokeDasharray="30 150" strokeDashoffset="0"> <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" /> </circle> </svg>) : address ? ("Swap") : ("Connect to Swap")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
          25% { transform: translateY(-20px) translateX(10px) rotate(45deg); opacity: 0.7; }
          50% { transform: translateY(-5px) translateX(-10px) rotate(90deg); opacity: 0.3; }
          75% { transform: translateY(-15px) translateX(15px) rotate(135deg); opacity: 0.6; }
          100% { transform: translateY(0px) translateX(0px) rotate(180deg); opacity: 0; }
        }
        .remove-arrow::-webkit-outer-spin-button,
        .remove-arrow::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .remove-arrow {
          -moz-appearance: textfield; 
        }
        select.appearance-none {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
      `}</style>
    </div>
  );
}