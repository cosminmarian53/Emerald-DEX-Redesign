import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence might not be needed if cards are always open
import gsap from 'gsap';

// Enhanced emerald toggle component
const Toggle = memo(({ isOn, onToggle, label, name, isAccent = false }) => {
  const toggleRef = useRef(null);
  useEffect(() => {
    if (!toggleRef.current) return;
    if (isOn && isAccent) {
      gsap.fromTo(toggleRef.current, { boxShadow: '0 0 0px rgba(16, 185, 129, 0)' }, { boxShadow: '0 0 15px rgba(16, 185, 129, 0.7)', duration: 0.3 });
    } else if (!isOn && isAccent && toggleRef.current) {
      gsap.to(toggleRef.current, { boxShadow: '0 0 0px rgba(16, 185, 129, 0)', duration: 0.2 });
    }
  }, [isOn, isAccent]);
  return (
    <div className="flex items-center justify-between h-10">
      <label htmlFor={name} className={`text-base font-medium transition-colors ${isOn && isAccent ? 'text-emerald-300' : 'text-gray-100'}`}> {label} </label>
      <button ref={toggleRef} type="button" className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ${isOn ? (isAccent ? 'bg-emerald-600' : 'bg-gray-500') : 'bg-gray-600'}`} onClick={() => onToggle(!isOn)} role="switch" aria-checked={isOn} id={name} >
        <motion.span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md" animate={{ x: isOn ? 22 : 3, backgroundColor: isOn && isAccent ? "#10ffc4" : "#ffffff", boxShadow: isOn && isAccent ? "0 0 10px rgba(16, 255, 196, 0.7)" : "0 1px 2px rgba(0,0,0,0.2)" }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
      </button>
    </div>
  );
});

// Optimized animated form input
const AnimatedInput = memo(({ label, id, name, value, onChange, placeholder, type = "text" }) => {
  const inputRef = useRef(null); const labelRef = useRef(null);
  useEffect(() => {
    if (!inputRef.current || !labelRef.current) return;
    const input = inputRef.current; const labelEl = labelRef.current;
    const handleFocus = () => { gsap.to(labelEl, { color: '#10b981', y: 0, duration: 0.3 }); gsap.to(input, { borderColor: '#10b981', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.15)', duration: 0.3 }); };
    const handleBlur = () => { gsap.to(labelEl, { color: '#e5e7eb', y: 0, duration: 0.3 }); gsap.to(input, { borderColor: 'rgba(55, 65, 81, 0.7)', boxShadow: '0 0 0 0px rgba(16, 185, 129, 0)', duration: 0.3 }); };
    input.addEventListener('focus', handleFocus); input.addEventListener('blur', handleBlur);
    return () => { input.removeEventListener('focus', handleFocus); input.removeEventListener('blur', handleBlur); };
  }, []);
  return (
    <div className="mb-6 relative">
      <label ref={labelRef} htmlFor={id} className="block text-base font-medium text-gray-100 mb-2 transition-all"> {label} </label>
      <div className="relative">
        <input ref={inputRef} type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-4 py-3 bg-[#181818] border border-gray-600/70 rounded-lg text-gray-50 focus:outline-none transition-all duration-300 placeholder-gray-400" />
      </div>
    </div>
  );
});

// Modified CardHeader: Static, no collapse feature
const CardHeader = memo(({ title }) => {
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-t-xl bg-gradient-to-r from-emerald-900/10 to-transparent"> {/* Removed hover, cursor, onClick */}
      <h2 className="text-2xl font-bold text-white"> {/* Removed motion and textShadow animation */}
        {title}
      </h2>
      {/* Chevron icon removed */}
    </div>
  );
});

// Enhanced emerald star field (Slightly increased star counts)
const EmeraldStarField = memo(() => {
  const starsCanvasRef = useRef(null);
  useEffect(() => {
    if (!starsCanvasRef.current) return;
    const canvas = starsCanvasRef.current; const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; drawStarsFull(); };
    const stars = []; const glowingStars = []; const shootingStars = [];

    const BACKGROUND_STAR_COUNT_SF = 180; // Increased
    const GLOWING_STAR_COUNT_SF = 35;   // Increased
    const INITIAL_SHOOTING_STARS_SF = 3; // Increased

    const initStarsFull = () => {
      stars.length = 0; glowingStars.length = 0; shootingStars.length = 0;
      for (let i = 0; i < BACKGROUND_STAR_COUNT_SF; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 0.9 + 0.1, opacity: Math.random() * 0.7 + 0.15, hue: Math.random() < 0.7 ? 150 : 120 + Math.random() * 60 }); }
      for (let i = 0; i < GLOWING_STAR_COUNT_SF; i++) { glowingStars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, baseRadius: Math.random() * 1.4 + 0.4, radius: 0, opacity: 0, hue: 140 + Math.random() * 20, pulse: Math.random() * 2 + 1, phase: Math.random() * Math.PI * 2 }); }
      for (let i = 0; i < INITIAL_SHOOTING_STARS_SF; i++) { addShootingStarFull(); }
    };
    const addShootingStarFull = () => { shootingStars.push({ x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), length: Math.random() * 75 + 30, angle: Math.random() * Math.PI / 4 + Math.PI / 4, speed: Math.random() * 9 + 6, opacity: 0, hue: 140 + Math.random() * 30, decay: 0.011 + Math.random() * 0.016 }); };
    const drawStarsFull = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => { ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, 80%, 70%, ${star.opacity})`; ctx.fill(); });
      glowingStars.forEach(star => { ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`; ctx.shadowBlur = star.radius * 4; ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, 0.55)`; ctx.fill(); }); ctx.shadowBlur = 0;
      shootingStars.forEach(star => { if (star.opacity <= 0) return; ctx.beginPath(); ctx.moveTo(star.x, star.y); const endX = star.x - Math.cos(star.angle) * star.length; const endY = star.y + Math.sin(star.angle) * star.length; ctx.lineTo(endX, endY); const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY); gradient.addColorStop(0, `hsla(${star.hue}, 100%, 85%, ${star.opacity})`); gradient.addColorStop(1, `hsla(${star.hue}, 100%, 70%, 0)`); ctx.strokeStyle = gradient; ctx.lineWidth = 1.7; ctx.stroke(); ctx.beginPath(); ctx.arc(star.x, star.y, 1.7, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, 100%, 80%, ${star.opacity})`; ctx.shadowBlur = 7; ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, ${star.opacity * 0.7})`; ctx.fill(); }); ctx.shadowBlur = 0;
    };
    const animateStarsFull = () => {
      glowingStars.forEach(star => { star.phase += 0.015; star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.5; star.opacity = 0.2 + Math.sin(star.phase) * 0.65; if (star.opacity < 0) star.opacity = 0; });
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) { if (Math.random() < 0.009 && shootingStars.filter(s => s.opacity > 0).length < INITIAL_SHOOTING_STARS_SF + 2) { shootingStars[index] = { x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), length: Math.random() * 75 + 30, angle: Math.random() * Math.PI / 4 + Math.PI / 4, speed: Math.random() * 9 + 6, opacity: 0, hue: 140 + Math.random() * 30, decay: 0.011 + Math.random() * 0.016 }; } return; }
        if (star.opacity < 1 && star.x > canvas.width * 0.8) { star.opacity += 0.045; } else { star.x -= star.speed; star.y += Math.sin(star.angle) * star.speed; star.opacity -= star.decay; }
        if (star.x < 0 || star.y > canvas.height || star.y < 0) { star.opacity = 0; }
      });
      if (Math.random() < 0.002 && shootingStars.filter(s => s.opacity > 0).length < INITIAL_SHOOTING_STARS_SF + 1) { addShootingStarFull(); }
      drawStarsFull(); animationFrameId = requestAnimationFrame(animateStarsFull);
    };
    let resizeTimeout; const handleResize = () => { clearTimeout(resizeTimeout); cancelAnimationFrame(animationFrameId); resizeTimeout = setTimeout(() => { resizeCanvas(); }, 100); };
    window.addEventListener('resize', handleResize); resizeCanvas(); initStarsFull(); animateStarsFull();
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); clearTimeout(resizeTimeout); };
  }, []);
  return <canvas ref={starsCanvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-90" />;
});

const GlowingButton = memo(({ onClick, children, isSubmitting, className = "" }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    const button = buttonRef.current; if (!button) return;
    const handleMouseMove = (e) => { const rect = button.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; button.style.setProperty('--x', `${x}px`); button.style.setProperty('--y', `${y}px`); };
    button.addEventListener('mousemove', handleMouseMove);
    return () => { button.removeEventListener('mousemove', handleMouseMove); };
  }, []);
  return (
    <button ref={buttonRef} onClick={onClick} disabled={isSubmitting} className={`group relative bg-gradient-to-br from-emerald-600 to-emerald-700 overflow-hidden text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 ${className}`}>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute w-40 h-40 rounded-full pointer-events-none mix-blend-screen glow-spot opacity-0 group-hover:opacity-30" style={{ left: 'var(--x)', top: 'var(--y)', transform: 'translate(-50%, -50%)' }} />
      <span className="relative z-10 block py-4 px-6 min-h-[56px] flex items-center justify-center">
        {isSubmitting && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>)}
        {children}
      </span>
    </button>
  );
});

const Tools = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  // Removed tokenPanelExpanded and brandingPanelExpanded states
  const [isSubmittingIssue, setIsSubmittingIssue] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const [tokenForm, setTokenForm] = useState({ name: '', ticker: '', mintAmount: '', decimals: '18', freezable: false, pauseable: false, changeableOwner: false, wipeable: false, upgradeable: true, canAddSpecialRoles: true });
  const mockTokens = useMemo(() => [{ name: 'Emerald Token', ticker: 'EMT', balance: '10,000', id: 'erd1...3x4f' }, { name: 'Decentralize', ticker: 'DEC', balance: '5,234.23', id: 'erd1...9h2j' }, { name: 'Stellar Coin', ticker: 'STEL', balance: '250,000', id: 'erd1...7k3l' }], []);

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }); // Simpler fade-in
    }
    if (cardRefs.current.length) {
      gsap.fromTo(cardRefs.current.filter(el => el), { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.4 }); // Adjusted timing
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setTokenForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  // Removed toggleTokenPanel and toggleBrandingPanel

  const connectWallet = useCallback(() => {
    if (isConnectingWallet || isWalletConnected) return;
    setIsConnectingWallet(true);
    setTimeout(() => { setIsWalletConnected(true); setIsConnectingWallet(false); }, 1500);
  }, [isConnectingWallet, isWalletConnected]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmittingIssue) return;
    setIsSubmittingIssue(true);
    setTimeout(() => {
      setTokenForm(prev => ({ ...prev, name: '', ticker: '', mintAmount: '' }));
      setIsSubmittingIssue(false);
      const notification = document.createElement('div');
      notification.className = 'fixed top-5 right-5 bg-emerald-500 text-white px-5 py-4 rounded-lg shadow-xl z-[100] flex items-center';
      notification.innerHTML = `<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Token "${tokenForm.name}" (${tokenForm.ticker}) successfully issued!</span>`;
      document.body.appendChild(notification);
      gsap.fromTo(notification, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
      setTimeout(() => { gsap.to(notification, { opacity: 0, y: -20, duration: 0.5, onComplete: () => { if (document.body.contains(notification)) document.body.removeChild(notification); } }); }, 4000);
    }, 2000);
  }, [isSubmittingIssue, tokenForm.name, tokenForm.ticker]);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-black text-gray-100 py-10 px-4 md:px-6 font-sans overflow-hidden">
      <EmeraldStarField />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 ref={titleRef} className="opacity-0 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 mb-14 text-center tracking-wider">
          Tools
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div ref={el => cardRefs.current[0] = el} className="issue-card relative bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-xl overflow-hidden group">
            <div className="absolute inset-0 z-0 border border-emerald-500/20 rounded-xl emerald-pulse-border"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full card-glint"></div>
            <CardHeader title="Issue Token" /> {/* Removed isExpanded and toggleExpand */}
            {/* Content is now always visible */}
            <div className="overflow-hidden p-6 pt-2 space-y-1">
              <form onSubmit={handleSubmit}>
                <AnimatedInput label="Name" id="name" name="name" value={tokenForm.name} onChange={handleInputChange} placeholder="Enter token name" />
                <AnimatedInput label="Ticker" id="ticker" name="ticker" value={tokenForm.ticker} onChange={handleInputChange} placeholder="Enter ticker symbol" />
                <AnimatedInput label="Mint Amount" id="mintAmount" name="mintAmount" value={tokenForm.mintAmount} onChange={handleInputChange} placeholder="Enter amount to mint" />
                <AnimatedInput label="Decimals" id="decimals" name="decimals" value={tokenForm.decimals} onChange={handleInputChange} placeholder="18" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pt-4 toggles-container">
                  <div className="flex flex-col space-y-2">
                    <Toggle isOn={tokenForm.freezable} onToggle={(val) => handleInputChange({ target: { name: 'freezable', type: 'checkbox', checked: val } })} label="Freezable" name="freezable" />
                    <Toggle isOn={tokenForm.pauseable} onToggle={(val) => handleInputChange({ target: { name: 'pauseable', type: 'checkbox', checked: val } })} label="Pauseable" name="pauseable" />
                    <Toggle isOn={tokenForm.changeableOwner} onToggle={(val) => handleInputChange({ target: { name: 'changeableOwner', type: 'checkbox', checked: val } })} label="Changeable Owner" name="changeableOwner" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Toggle isOn={tokenForm.wipeable} onToggle={(val) => handleInputChange({ target: { name: 'wipeable', type: 'checkbox', checked: val } })} label="Wipeable" name="wipeable" />
                    <Toggle isOn={tokenForm.upgradeable} onToggle={(val) => handleInputChange({ target: { name: 'upgradeable', type: 'checkbox', checked: val } })} label="Upgradeable" name="upgradeable" isAccent={true} />
                    <Toggle isOn={tokenForm.canAddSpecialRoles} onToggle={(val) => handleInputChange({ target: { name: 'canAddSpecialRoles', type: 'checkbox', checked: val } })} label="Can Add Special Roles" name="canAddSpecialRoles" isAccent={true} />
                  </div>
                </div>
                <div className="pt-8">
                  <GlowingButton isSubmitting={isSubmittingIssue} className="w-full issue-button">
                    {isSubmittingIssue ? "Processing..." : "Issue Token"}
                  </GlowingButton>
                </div>
              </form>
            </div>
          </div>
          <div ref={el => cardRefs.current[1] = el} className="tool-card-right relative bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 z-0 border border-emerald-500/20 rounded-xl emerald-pulse-border-alt"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tl from-emerald-400/20 to-transparent rounded-full card-glint-alt"></div>
            <CardHeader title="Branding Token" /> {/* Removed isExpanded and toggleExpand */}
            {/* Content is now always visible */}
            <div className="overflow-hidden p-8 pt-4">
              {!isWalletConnected ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <motion.p className="text-gray-100 text-xl mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}> Connect wallet to see your tokens </motion.p>
                  <GlowingButton onClick={connectWallet} isSubmitting={isConnectingWallet} className="w-full connect-button"> {isConnectingWallet ? "Connecting..." : "CONNECT WALLET"} </GlowingButton>
                </div>
              ) : (
                  <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="space-y-8"> {/* Slightly faster stagger */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> </svg> Your Tokens </h3>
                      <button className="text-sm text-emerald-400 hover:text-emerald-300 bg-[#121212] px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition-colors flex items-center gap-1" onClick={() => setIsWalletConnected(false)}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /> </svg> Disconnect </button>
                    </div>
                    <div className="space-y-4 token-list">
                      {mockTokens.map((token) => (
                        <motion.div key={token.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 28 } } }} // Adjusted spring
                          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }} whileTap={{ scale: 0.98 }} className="p-4 bg-gradient-to-r from-[#121212] to-[#0c0c0c] border border-gray-700/40 rounded-lg hover:border-emerald-500/30 transition-all duration-300 cursor-pointer relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                        <div className="flex justify-between items-center relative z-10">
                          <div> <p className="font-medium text-white text-lg group-hover:text-emerald-300 transition-colors">{token.name}</p> <p className="text-xs text-gray-200">{token.id}</p> </div>
                          <div className="text-right"> <p className="text-emerald-400 font-bold text-lg">{token.balance}</p> <p className="text-xs text-gray-200">{token.ticker}</p> </div>
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500/0 group-hover:text-emerald-500/80 transition-all transform translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg> </div>
                      </motion.div>
                    ))}
                    </div>
                  <div className="pt-4"> <GlowingButton className="w-full"> Set Branding Options </GlowingButton> </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Styles remain the same as your previous version */
        .glow-input-effect { box-shadow: 0 0 0 0px rgba(16, 185, 129, 0); transition: opacity 0.3s ease-in-out; }
        input:focus + .glow-input-effect { opacity: 1; box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); }
        .emerald-pulse-border { box-shadow: 0 0 15px rgba(16, 185, 129, 0); animation: pulseBorder 4s infinite alternate; }
        .emerald-pulse-border-alt { box-shadow: 0 0 15px rgba(16, 185, 129, 0); animation: pulseBorder 5s infinite alternate-reverse; }
        .card-glint { opacity: 0.3; animation: glintAnimate 8s infinite linear; }
        .card-glint-alt { opacity: 0.3; animation: glintAnimate 10s infinite linear; }
        .glow-spot { background: radial-gradient(circle, rgba(16, 255, 196, 0.8) 0%, rgba(16, 185, 129, 0.4) 30%, transparent 70%); }
        @keyframes pulseBorder { 0% { opacity: 0.1; border-color: rgba(16, 185, 129, 0.1); } 50% { opacity: 0.4; border-color: rgba(16, 185, 129, 0.4); } 100% { opacity: 0.1; border-color: rgba(16, 185, 129, 0.1); } }
        @keyframes glintAnimate { 0% { transform: rotate(0deg) translateX(0) scale(1); opacity: 0.2; } 25% { opacity: 0.4; } 50% { transform: rotate(180deg) translateX(5px) scale(1.2); opacity: 0.3; } 75% { opacity: 0.2; } 100% { transform: rotate(360deg) translateX(0) scale(1); opacity: 0.2; } }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Tools;