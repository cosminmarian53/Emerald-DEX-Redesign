import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import required images
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
    const BACKGROUND_STAR_COUNT = 100; const PULSATING_STAR_COUNT = 25; const INITIAL_SHOOTING_STARS = 1;

    const initStars = () => {
      stars.length = 0; pulsatingStars.length = 0; shootingStars.length = 0;
      for (let i = 0; i < BACKGROUND_STAR_COUNT; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1 + 0.2, opacity: Math.random() * 0.7 + 0.1, hue: Math.random() < 0.8 ? 145 : 155 }); }
      for (let i = 0; i < PULSATING_STAR_COUNT; i++) { pulsatingStars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, baseRadius: Math.random() * 1.8 + 0.4, radius: 0, opacity: 0, hue: 150, saturation: Math.random() * 20 + 80, pulse: Math.random() * 2 + 1, phase: Math.random() * Math.PI * 2 }); }
      for (let i = 0; i < INITIAL_SHOOTING_STARS; i++) { addShootingStar(); }
    };

    const addShootingStar = () => { shootingStars.push({ x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), length: Math.random() * 70 + 40, angle: Math.random() * Math.PI / 4 + Math.PI / 4, speed: Math.random() * 10, opacity: 0, hue: 145 + Math.random() * 15, decay: 0.015 + Math.random() * 0.02 }); };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => { ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`; ctx.fill(); });
      pulsatingStars.forEach(star => { ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 60%, ${star.opacity})`; ctx.shadowBlur = star.radius * 5; ctx.shadowColor = `hsla(${star.hue}, 100%, 65%, 0.7)`; ctx.fill(); });
      ctx.shadowBlur = 0;
      shootingStars.forEach(star => { if (star.opacity <= 0) return; ctx.beginPath(); ctx.moveTo(star.x, star.y); const endX = star.x - Math.cos(star.angle) * star.length; const endY = star.y + Math.sin(star.angle) * star.length; ctx.lineTo(endX, endY); const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY); gradient.addColorStop(0, `hsla(145, 100%, 70%, ${star.opacity})`); gradient.addColorStop(1, `hsla(145, 100%, 70%, 0)`); ctx.strokeStyle = gradient; ctx.lineWidth = 2.2; ctx.stroke(); ctx.beginPath(); ctx.arc(star.x, star.y, 2.8, 0, Math.PI * 2); ctx.fillStyle = `hsla(145, 100%, 80%, ${star.opacity})`; ctx.shadowBlur = 12; ctx.shadowColor = `hsla(145, 100%, 70%, ${star.opacity * 0.8})`; ctx.fill(); });
      ctx.shadowBlur = 0;
    };

    const animateStars = () => {
      pulsatingStars.forEach(star => { star.phase += 0.015; star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.6; star.opacity = 0.3 + Math.sin(star.phase) * 0.7; if (star.opacity < 0) star.opacity = 0; });
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) { if (Math.random() < 0.008 && shootingStars.filter(s => s.opacity > 0).length < 3) { shootingStars[index] = { ...star, x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 3), opacity: 0 }; } return; }
        if (star.opacity < 1 && star.x > canvas.width * 0.8) { star.opacity += 0.07; } else { star.x -= star.speed; star.y += Math.sin(star.angle) * star.speed * 0.8; star.opacity -= star.decay; }
        if (star.x < 0 || star.y > canvas.height || star.y < 0) { star.opacity = 0; }
      });
      if (Math.random() < 0.002 && shootingStars.filter(s => s.opacity > 0).length < 2) { addShootingStar(); }
      drawStars(); animationFrameId = requestAnimationFrame(animateStars);
    };

    let resizeTimeout;
    const handleResize = () => { clearTimeout(resizeTimeout); cancelAnimationFrame(animationFrameId); resizeTimeout = setTimeout(() => { resizeCanvas(); initStars(); animateStars(); }, 100); };
    window.addEventListener('resize', handleResize); resizeCanvas(); initStars(); animateStars();
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); clearTimeout(resizeTimeout); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none opacity-95" />;
});

// Token image mapping
const tokenImages = {
  USDC: usdcImg, EGLD: egldImg, ETH: ethImg, BNB: bnbImg, BTC: btcImg, SOL: solImg,
  MEX: bnbImg, // Assuming MEX uses BNB image as per your example
  XPRICE: egldImg, // Assuming XPRICE uses EGLD image
  CKET: ethImg, // Placeholder, replace if you have a CKET specific image
};

const getTokenImage = (tokenSymbol) => tokenImages[tokenSymbol?.toUpperCase()] || null;

const FallbackTokenIcon = memo(({ tokenName, size = "w-6 h-6" }) => {
  const colors = ['bg-emerald-600', 'bg-teal-600', 'bg-cyan-600'];
  const charCodeSum = tokenName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (
    <div className={`${size} rounded-full ${colors[charCodeSum % colors.length]} flex items-center justify-center text-white text-xs font-bold ring-1 ring-black/20 shadow-lg shadow-emerald-900/20`}>
      {tokenName.substring(0, 1).toUpperCase()}
    </div>
  );
});

const StatsScrollingBar = memo(({ stats }) => {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return;
    const scroller = scrollerRef.current;
    const content = contentRef.current;

    // Clear previous clones if any (important for HMR or if stats change)
    Array.from(scroller.children).forEach(child => {
      if (child !== content) scroller.removeChild(child);
    });

    const clone = content.cloneNode(true);
    scroller.appendChild(clone);
    const totalWidth = content.offsetWidth;

    if (totalWidth === 0) return; // Avoid division by zero if content not rendered yet

    const duration = totalWidth / 50;
    const animation = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } })
      .to(scroller.children, { x: -totalWidth, duration: duration });

    const pauseAnim = () => animation.pause();
    const playAnim = () => animation.play();
    scroller.addEventListener("mouseenter", pauseAnim);
    scroller.addEventListener("mouseleave", playAnim);

    // Dot click logic (ensure activeDot function is defined if used elsewhere or remove if not needed for this component)
    // For this component, I'm assuming activeDot is a local helper or not strictly needed for the scroll bar itself.
    // If it manipulates global state or parent state, it should be passed as a prop.

    return () => {
      animation.kill();
      scroller.removeEventListener("mouseenter", pauseAnim);
      scroller.removeEventListener("mouseleave", playAnim);
    };
  }, [stats]);

  return (
    <div className="relative w-full overflow-hidden mb-12">
      <div ref={scrollerRef} className="flex w-max" style={{ willChange: 'transform' }}>
        <div ref={contentRef} className="flex">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center mx-8 sm:mx-12 min-w-[100px]">
              <div className="text-emerald-500 mb-2">{stat.icon}</div>
              <p className="text-gray-400 text-sm text-center mb-1">{stat.label}</p>
              <p className="text-emerald-400 text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const ChartCard = memo(({
  title, value, subValue,
  timeFilters = ["24H", "1W", "1M", "FULL"], activeFilter = "24H",
  onFilterChange, chartColor = "emerald"
}) => {
  const [currentFilter, setCurrentFilter] = useState(activeFilter);
  const cardRef = useRef(null);
  const chartRef = useRef(null);

  const handleFilterClick = (filter) => { setCurrentFilter(filter); if (onFilterChange) onFilterChange(filter); };
  const colors = { emerald: { primary: '#10b981', secondary: '#059669' }, blue: { primary: '#3b82f6', secondary: '#2563eb' }, red: { primary: '#ef4444', secondary: '#dc2626' }, purple: { primary: '#8b5cf6', secondary: '#7c3aed' } };
  const { primary, secondary } = colors[chartColor] || colors.emerald;

  useEffect(() => {
    if (!chartRef.current || chartRef.current.clientHeight === 0) return; // Added height check
    let chartAnimation;
    let perpetualAnimation;

    const drawChart = () => {
      while (chartRef.current.firstChild) { chartRef.current.removeChild(chartRef.current.firstChild); }
      const points = []; const pointCount = 48; const height = chartRef.current.clientHeight * 0.7; const width = chartRef.current.clientWidth;
      if (width === 0) return; // Don't draw if no width

      for (let i = 0; i < pointCount; i++) { const x = (width / pointCount) * i; const noise = Math.sin(i * 0.3) * 20 + Math.sin(i * 0.07) * 40 + Math.random() * 15; const y = height * 0.5 + noise; points.push({ x, y }); }
      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) { const cp = { x: (points[i].x + points[i - 1].x) / 2, y: points[i - 1].y }; pathD += ` Q ${cp.x} ${cp.y}, ${points[i].x} ${points[i].y}`; }
      pathD += ` L ${width} ${height} L 0 ${height} Z`;
      const chart = document.createElementNS("http://www.w3.org/2000/svg", "path");
      chart.setAttribute("d", pathD); chart.setAttribute("fill", `url(#gradient-${title.replace(/\s+/g, '-')})`); chart.setAttribute("stroke", primary); chart.setAttribute("stroke-width", "2"); chart.setAttribute("stroke-linecap", "round"); chart.setAttribute("opacity", "0");
      chartRef.current.appendChild(chart);
      chartAnimation = gsap.to(chart, { opacity: 1, duration: 1, ease: "power3.inOut", onComplete: () => { perpetualAnimation = gsap.to(chart, { y: "-=3", repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" }); } });
    };

    drawChart(); // Initial draw

    return () => {
      chartAnimation?.kill();
      perpetualAnimation?.kill();
      // Ensure chart is removed if component unmounts mid-animation
      if (chartRef.current && chartRef.current.firstChild) {
      // chartRef.current.removeChild(chartRef.current.firstChild); // This might be too aggressive if chart is complex
      }
    };
  }, [currentFilter, primary, secondary, title]); // Removed 'value' as it's not used for chart shape

  useEffect(() => {
    if (!cardRef.current) return;
    const st = ScrollTrigger.create({ trigger: cardRef.current, start: "top bottom-=100px", onEnter: () => { gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }); }, once: true });
    return () => st.kill();
  }, []);

  return (<motion.div ref={cardRef} className="bg-[#0A0A0A] rounded-xl shadow-2xl border border-gray-800/70 flex flex-col h-full overflow-hidden" whileHover={{ y: -5, boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px 2px ${primary}30` }} transition={{ type: "spring", stiffness: 150, damping: 20 }}>
    <div className="px-5 py-4 border-b border-gray-800/80">
      <div className="flex justify-between items-center">
        <div> <motion.h3 className="text-md font-semibold text-gray-100" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}> {title} </motion.h3> <motion.p className="text-2xl font-bold text-emerald-400 mt-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}> {value} </motion.p> {subValue && (<motion.p className="text-xs text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}> {subValue} </motion.p>)} </div>
        <motion.div className="flex space-x-1 bg-[#181818] p-0.5 rounded-lg border border-gray-700/50 shadow-inner" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 }}> {timeFilters.map((filter, index) => (<motion.button key={filter} onClick={() => handleFilterClick(filter)} className={`px-2.5 py-1 text-xs rounded-md transition-all ${currentFilter === filter ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700/50'}`} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}> {filter} </motion.button>))} </motion.div>
      </div>
    </div>
    <div className="flex-grow p-4 relative flex items-center justify-center min-h-[150px]"> {/* Added min-h for chart */}
      <svg width="100%" height="100%" ref={chartRef} className="overflow-visible"> <defs> <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%"> <stop offset="0%" stopColor={primary} stopOpacity="0.5" /> <stop offset="100%" stopColor={secondary} stopOpacity="0.05" /> </linearGradient> </defs> </svg>
      <div className="absolute inset-0 pointer-events-none overflow-hidden"> {[...Array(8)].map((_, i) => (<motion.div key={i} className="absolute rounded-full" style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2, backgroundColor: primary, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 + 0.2, }} animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4], }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5, }} />))} </div>
    </div>
  </motion.div>
  );
});

const SectionTitle = memo(({ title, count, children }) => {
  const titleRef = useRef(null);
  useEffect(() => {
    const element = titleRef.current; if (!element) return;
    const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { gsap.fromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }); observer.unobserve(element); } }, { threshold: 0.3 });
    observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);
  return (<motion.div ref={titleRef} initial={{ opacity: 0, y: 20 }} className="flex flex-col md:flex-row justify-between items-center mb-6 mt-14 pt-6 border-t border-gray-800/60">
    <div className="flex items-center"> <div className="h-6 w-1.5 bg-emerald-500 rounded-full mr-3"></div> <h2 className="text-2xl font-semibold text-gray-50 tracking-wide"> {title} {count !== undefined && (<motion.span className="text-gray-500 text-xl" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }}> ({count}) </motion.span>)} </h2> </div>
    <div className="flex items-center space-x-2 mt-3 md:mt-0"> {children} </div>
  </motion.div>
  );
});

const DataTable = memo(({ columns, data, emptyMessage = "No data found" }) => {
  const tableRef = useRef(null);
  useEffect(() => {
    if (!tableRef.current || !data || data.length === 0) return;
    const rows = tableRef.current.querySelectorAll('tbody tr');
    if (rows.length === 0) return;
    const st = gsap.fromTo(rows, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: tableRef.current, start: "top bottom-=100", once: true } });
    return () => { if (st && st.scrollTrigger) st.scrollTrigger.kill(); st.kill(); };
  }, [data]);

  if (!data || data.length === 0) { return (<div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-gray-800/70 shadow-xl"> <motion.div className="flex flex-col items-center justify-center py-16 text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}> <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> <p>{emptyMessage}</p> </motion.div> </div>); }
  return (<div className="overflow-x-auto bg-[#0A0A0A] rounded-xl border border-gray-800/60 shadow-xl">
    <table ref={tableRef} className="min-w-full">
      <thead className="bg-[#121212]"> <tr className="border-b border-gray-700/60"> {columns.map(column => (<th key={column.key} className={`px-5 py-3.5 text-xs font-medium text-gray-400 uppercase tracking-wider ${column.align || 'text-left'}`}> {column.title} </th>))} </tr> </thead>
      <tbody className="divide-y divide-gray-800/40"> {data.map((row, rowIndex) => (<motion.tr key={row.id || rowIndex} className="hover:bg-[#181818]/70 transition-colors" whileHover={{ backgroundColor: "rgba(24, 24, 24, 0.7)" }} initial={{ opacity: 0, y: 15 }} > {columns.map(column => (<td key={`${row.id || rowIndex}-${column.key}`} className={`px-5 py-4 whitespace-nowrap ${column.tdClass || ''} ${column.align || 'text-left'}`}> {column.render ? column.render(row[column.key], row) : row[column.key]} </td>))} </motion.tr>))} </tbody>
    </table>
  </div>
  );
});

const SortControl = memo(({ options, value, onChange, label = "Sort by:" }) => {
  return (<motion.div className="flex items-center space-x-2 bg-[#111111] p-2 rounded-lg border border-gray-700/60" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} whileHover={{ borderColor: "rgba(16, 185, 129, 0.5)" }}>
    <span className="text-xs text-gray-400 pl-1">{label}</span>
    <div className="relative"> <select value={value} onChange={e => onChange(e.target.value)} className="appearance-none bg-transparent text-xs text-emerald-300 pr-8 focus:outline-none cursor-pointer"> {options.map(option => (<option key={option.value} value={option.value} className="bg-[#0F0F0F] text-gray-200 py-1"> {option.label} </option>))} </select> <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center"> <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /> </svg> </div> </div>
    <button className="text-gray-500 hover:text-emerald-400 p-1 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg> </button>
  </motion.div>
  );
});

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  return (<div className="flex items-center justify-end mt-6 space-x-1">
    <motion.button className="p-1.5 rounded-lg bg-[#111111] text-gray-400 hover:bg-[#1a1a1a] hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-[#111111] disabled:hover:text-gray-400" onClick={() => onPageChange(1)} disabled={currentPage === 1} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /> </svg> </motion.button>
    <motion.button className="p-1.5 rounded-lg bg-[#111111] text-gray-400 hover:bg-[#1a1a1a] hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-[#111111] disabled:hover:text-gray-400" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> </svg> </motion.button>
    <div className="px-4 py-1.5 bg-[#151515] text-emerald-300 text-xs font-medium rounded-lg"> Page {currentPage} of {totalPages} </div>
    <motion.button className="p-1.5 rounded-lg bg-[#111111] text-gray-400 hover:bg-[#1a1a1a] hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-[#111111] disabled:hover:text-gray-400" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg> </motion.button>
    <motion.button className="p-1.5 rounded-lg bg-[#111111] text-gray-400 hover:bg-[#1a1a1a] hover:text-emerald-400 disabled:opacity-50 disabled:hover:bg-[#111111] disabled:hover:text-gray-400" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /> </svg> </motion.button>
  </div>
  );
});

// --- Stats Data with Icons (RESTORED) ---
const statsData = [
  { label: "Token CKET", value: "89.5M", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> </svg>) },
  { label: "Minted", value: "100M", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /> </svg>) },
  { label: "Burned", value: "10.5M", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /> </svg>) },
  { label: "Supply", value: "89.5M", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> </svg>) },
  { label: "Holders", value: "124", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>) },
  { label: "Price", value: "$1.34", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>) },
  { label: "Volume 24h", value: "$10,345", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> </svg>) },
  { label: "Liquidity", value: "$100,345", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /> </svg>) },
  { label: "Transactions", value: "10,345", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /> </svg>) },
];

// Table Data (RESTORED)
const tokensData = [
  { id: 1, name: 'LEGLD', tokenSymbol: 'EGLD', price: '$0.00', priceChange24h: '-', priceChange30d: '-', volume24h: '$0', volume30d: '$0', liquidity: '$0' },
  { id: 2, name: 'MEX', tokenSymbol: 'MEX', price: '$0.00', priceChange24h: '-', priceChange30d: '-', volume24h: '$0', volume30d: '$0', liquidity: '$0' },
  { id: 3, name: 'USDC', tokenSymbol: 'USDC', price: '$1.00', priceChange24h: '+0.01%', priceChange30d: '+0.05%', volume24h: '$1.2M', volume30d: '$30.5M', liquidity: '$50.2M' },
  { id: 4, name: 'WBTC', tokenSymbol: 'BTC', price: '$29,504.32', priceChange24h: '-1.5%', priceChange30d: '+5.2%', volume24h: '$5.6M', volume30d: '$150.7M', liquidity: '$120.3M' },
];
const poolsData = [
  { id: 1, tokenNames: ['USDC', 'EGLD'], pairDisplayName: 'USDC/EGLD', liquidity: '$10.5M', volume24h: '$250K', fees24h: '$750', apr: '15.2%' },
  { id: 2, tokenNames: ['BTC', 'ETH'], pairDisplayName: 'WBTC/WETH', liquidity: '$25.2M', volume24h: '$1.1M', fees24h: '$3.3K', apr: '10.5%' },
  { id: 3, tokenNames: ['SOL', 'USDC'], pairDisplayName: 'SOL/USDC', liquidity: '$8.1M', volume24h: '$180K', fees24h: '$540', apr: '12.8%' },
];
const farmsData = [
  { id: 1, tokenNames: ['USDC', 'EGLD'], farmName: 'USDC-EGLD LP', totalAPR: '35.6%', feesAPR: '10.1%', boostedAPR: '25.5%', totalRewards: '$1.2M', totalStaked: '$15.3M', users: 1024 },
  { id: 2, tokenNames: ['BTC'], farmName: 'FARMTKN Staking', totalAPR: '50.1%', feesAPR: 'N/A', boostedAPR: 'N/A', totalRewards: '$500K', totalStaked: '$5.0M', users: 512 },
  { id: 3, tokenNames: ['BTC', 'ETH'], farmName: 'WBTC-WETH LP', totalAPR: '22.0%', feesAPR: '8.0%', boostedAPR: '14.0%', totalRewards: '$800K', totalStaked: '$10.1M', users: 780 },
];

// Table column definitions (RESTORED)
const tokenColumns = [{ key: 'name', title: 'Token', render: (value, row) => (<div className="flex items-center space-x-3"> {getTokenImage(row.tokenSymbol) ? <img src={getTokenImage(row.tokenSymbol)} alt={row.name} className="w-6 h-6 rounded-full object-cover" /> : <FallbackTokenIcon tokenName={row.name} />} <span className="font-medium text-gray-100">{value}</span> </div>), }, { key: 'price', title: 'Price', align: 'text-right', tdClass: 'text-emerald-300 font-medium', }, { key: 'priceChange24h', title: 'Price 24H', align: 'text-right', tdClass: 'hidden sm:table-cell', render: (value) => { if (value === '-') return <span className="text-gray-400">-</span>; const isPositive = value.startsWith('+'); return <span className={isPositive ? "text-green-400" : "text-red-400"}>{value}</span>; } }, { key: 'priceChange30d', title: 'Price 30D', align: 'text-right', tdClass: 'hidden md:table-cell', render: (value) => { if (value === '-') return <span className="text-gray-400">-</span>; const isPositive = value.startsWith('+'); return <span className={isPositive ? "text-green-400" : "text-red-400"}>{value}</span>; } }, { key: 'volume24h', title: 'Volume 24H', align: 'text-right', tdClass: 'hidden sm:table-cell', }, { key: 'volume30d', title: 'Volume 30D', align: 'text-right', tdClass: 'hidden md:table-cell', }, { key: 'liquidity', title: 'Liquidity', align: 'text-right', },];
const poolColumns = [{ key: 'pairDisplayName', title: 'Pool', render: (value, row) => (<div className="flex items-center space-x-3"> <div className="flex -space-x-2"> {row.tokenNames.map(name => { const imgSrc = getTokenImage(name); return (<div key={name} className="w-6 h-6 rounded-full bg-gray-700 ring-1 ring-black overflow-hidden"> {imgSrc ? <img src={imgSrc} alt={name} className="w-full h-full object-cover" /> : <FallbackTokenIcon tokenName={name} size="w-full h-full" />} </div>); })} </div> <span className="font-medium text-gray-100">{value}</span> </div>), }, { key: 'liquidity', title: 'Liquidity', align: 'text-right', }, { key: 'volume24h', title: 'Volume 24H', align: 'text-right', tdClass: 'hidden sm:table-cell', }, { key: 'fees24h', title: 'Fees 24H', align: 'text-right', tdClass: 'hidden md:table-cell', }, { key: 'apr', title: 'APR', align: 'text-right', tdClass: 'text-emerald-300 font-medium', },];
const farmColumns = [{ key: 'farmName', title: 'Farm', render: (value, row) => (<div className="flex items-center space-x-3"> <div className="flex -space-x-2"> {row.tokenNames.map(name => { const imgSrc = getTokenImage(name); return (<div key={name} className="w-6 h-6 rounded-full bg-gray-700 ring-1 ring-black overflow-hidden"> {imgSrc ? <img src={imgSrc} alt={name} className="w-full h-full object-cover" /> : <FallbackTokenIcon tokenName={name} size="w-full h-full" />} </div>); })} </div> <span className="font-medium text-gray-100">{value}</span> </div>), }, { key: 'totalAPR', title: 'Total APR', align: 'text-right', tdClass: 'text-emerald-300 font-medium', }, { key: 'feesAPR', title: 'Fees APR', align: 'text-right', tdClass: 'hidden sm:table-cell', }, { key: 'boostedAPR', title: 'Boosted APR', align: 'text-right', tdClass: 'hidden md:table-cell', }, { key: 'totalStaked', title: 'Total Staked', align: 'text-right', }, { key: 'users', title: 'Users', align: 'text-right', tdClass: 'hidden lg:table-cell', },];


const Analytics = () => {
  const [currentPages, setCurrentPages] = useState({ tokens: 1, pools: 1, farms: 1 });
  const [sortOptions, setSortOptions] = useState({ tokens: 'highest_price', pools: 'highest_liquidity', farms: 'highest_apr' });
  const pageRef = useRef(null); const headerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    const headerAnim = tl.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, onComplete: () => { gsap.to(headerRef.current, { textShadow: "0 0 15px rgba(16, 185, 129, 0.7)", duration: 2, repeat: -1, yoyo: true }); } });
    const stBatchInstances = ScrollTrigger.batch(".analytics-section", { interval: 0.1, batchMax: 3, onEnter: batch => { gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }); }, start: "top bottom-=100px", once: true });
    return () => {
      tl.kill();
      headerAnim.kill();
      // stBatchInstances is an array of ScrollTriggers
      if (stBatchInstances) {
        stBatchInstances.forEach(st => st.kill());
      }
      // Fallback for any other ScrollTriggers if needed
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSortChange = (section, value) => { setSortOptions(prev => ({ ...prev, [section]: value })); };
  const handlePageChange = (section, page) => {
    setCurrentPages(prev => ({ ...prev, [section]: page }));
    const sectionEl = document.getElementById(`${section}-section`);
    if (sectionEl) { const rows = sectionEl.querySelectorAll('tbody tr'); if (rows.length > 0) gsap.fromTo(rows, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 }); }
  };

  const memoizedTokensData = useMemo(() => tokensData, []);
  const memoizedPoolsData = useMemo(() => poolsData, []);
  const memoizedFarmsData = useMemo(() => farmsData, []);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-black text-gray-200 py-10 px-4 md:px-6 font-sans overflow-hidden">
      <PulsatingStarField />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: '-19px -19px', zIndex: 0 }}></div>

      <div className="max-w-7xl mx-auto relative z-[1]">
        <motion.h1 ref={headerRef} className="text-4xl md:text-5xl font-bold text-emerald-400 mb-10 text-center tracking-wider" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          Analytics
        </motion.h1>

        <div className="analytics-section opacity-0 translate-y-4"> <StatsScrollingBar stats={statsData} /> </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 analytics-section opacity-0 translate-y-4"> <ChartCard title="DEX Liquidity" value="$16M" subValue="01 Feb, 2025 20:00" chartColor="emerald" /> <ChartCard title="DEX Volume" value="$6M" subValue="Last 24 hours" chartColor="blue" /> </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 analytics-section opacity-0 translate-y-4"> <ChartCard title="Platform & LP Rewards" value="10.00K XPRICE ($2K)" subValue="Last 24 hours" chartColor="emerald" /> <ChartCard title="Staking Rewards" value="625.00 XPRICE ($125)" subValue="Last 24 hours" chartColor="blue" /> <ChartCard title="Token Burns" value="625.00 XPRICE ($125)" subValue="Last 24 hours" chartColor="red" /> </div>

        <div className="analytics-section opacity-0 translate-y-4" id="tokens-section">
          <SectionTitle title="Tokens" count={memoizedTokensData.length}> <SortControl options={[{ value: 'highest_price', label: 'Highest Price' }, { value: 'lowest_price', label: 'Lowest Price' }, { value: 'highest_volume', label: 'Highest Volume' },]} value={sortOptions.tokens} onChange={(value) => handleSortChange('tokens', value)} /> </SectionTitle>
          <DataTable columns={tokenColumns} data={memoizedTokensData} emptyMessage="No tokens found" />
          <Pagination currentPage={currentPages.tokens} totalPages={Math.max(1, Math.ceil(memoizedTokensData.length / 10))} onPageChange={(page) => handlePageChange('tokens', page)} />
        </div>

        <div className="analytics-section opacity-0 translate-y-4" id="pools-section">
          <SectionTitle title="Pools" count={memoizedPoolsData.length}> <SortControl options={[{ value: 'highest_liquidity', label: 'Highest Liquidity' }, { value: 'highest_volume', label: 'Highest Volume' }, { value: 'highest_apr', label: 'Highest APR' },]} value={sortOptions.pools} onChange={(value) => handleSortChange('pools', value)} /> </SectionTitle>
          <DataTable columns={poolColumns} data={memoizedPoolsData} emptyMessage="No pools found" />
          <Pagination currentPage={currentPages.pools} totalPages={Math.max(1, Math.ceil(memoizedPoolsData.length / 10))} onPageChange={(page) => handlePageChange('pools', page)} />
        </div>

        <div className="analytics-section opacity-0 translate-y-4" id="farms-section">
          <SectionTitle title="Farms" count={memoizedFarmsData.length}> <SortControl options={[{ value: 'highest_apr', label: 'Highest APR' }, { value: 'highest_staked', label: 'Highest Staked' }, { value: 'most_users', label: 'Most Users' },]} value={sortOptions.farms} onChange={(value) => handleSortChange('farms', value)} /> </SectionTitle>
          <DataTable columns={farmColumns} data={memoizedFarmsData} emptyMessage="No farms found" />
          <Pagination currentPage={currentPages.farms} totalPages={Math.max(1, Math.ceil(memoizedFarmsData.length / 10))} onPageChange={(page) => handlePageChange('farms', page)} />
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default Analytics;