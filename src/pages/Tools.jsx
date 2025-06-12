import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Emerald-themed animated letter component
const AnimatedLetter = memo(({ letter, index }) => {
  return (
    <motion.span
      className="inline-block relative"
      animate={{
        y: [0, -8, 0],
        filter: [
          'drop-shadow(0 0 5px rgba(16, 185, 129, 0.7))',
          'drop-shadow(0 0 15px rgba(16, 185, 129, 0.9))',
          'drop-shadow(0 0 5px rgba(16, 185, 129, 0.7))'
        ]
      }}
      transition={{
        y: { duration: 1.5 + Math.random(), repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
        filter: { duration: 1.5 + Math.random(), repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
        delay: index * 0.08,
      }}
    >
      {letter === " " ? "\u00A0" : letter}
      <motion.span
        className="absolute left-0 right-0 rounded-full bg-emerald-400"
        animate={{
          opacity: [0, 0.8, 0],
          width: ['0%', '100%', '0%'],
          left: ['50%', '0%', '50%']
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: index * 0.08 + 0.5
        }}
      />
    </motion.span>
  );
});

// Enhanced emerald toggle component
const Toggle = memo(({ isOn, onToggle, label, name, isAccent = false }) => {
  const toggleRef = useRef(null);

  // Toggle effect on state change
  useEffect(() => {
    if (!toggleRef.current) return;

    if (isOn && isAccent) {
      gsap.fromTo(toggleRef.current,
        { boxShadow: '0 0 0px rgba(16, 185, 129, 0)' },
        { boxShadow: '0 0 15px rgba(16, 185, 129, 0.7)', duration: 0.3 }
      );
    }
  }, [isOn, isAccent]);

  return (
    <div className="flex items-center justify-between mb-6">
      <label htmlFor={name} className={`text-base font-medium transition-colors ${isOn && isAccent ? 'text-emerald-400' : 'text-gray-300'}`}>
        {label}
      </label>
      <button
        ref={toggleRef}
        type="button"
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ${isOn ? (isAccent ? 'bg-emerald-600' : 'bg-gray-600') : 'bg-gray-700'}`}
        onClick={() => onToggle(!isOn)}
        role="switch"
        aria-checked={isOn}
        id={name}
      >
        <motion.span
          className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
          animate={{
            x: isOn ? 22 : 3,
            backgroundColor: isOn && isAccent ? "#10ffc4" : "#ffffff",
            boxShadow: isOn && isAccent ? "0 0 10px rgba(16, 255, 196, 0.7)" : "0 1px 2px rgba(0,0,0,0.2)"
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </button>
    </div>
  );
});

// Optimized animated form input
const AnimatedInput = memo(({ label, id, name, value, onChange, placeholder, type = "text" }) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);

  // Focus/blur animations
  useEffect(() => {
    if (!inputRef.current || !labelRef.current) return;

    const input = inputRef.current;
    const labelEl = labelRef.current;

    const handleFocus = () => {
      gsap.to(labelEl, {
        color: '#10b981',
        y: -2,
        duration: 0.3
      });

      gsap.to(input, {
        borderColor: '#10b981',
        boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.15)',
        duration: 0.3
      });
    };

    const handleBlur = () => {
      gsap.to(labelEl, {
        color: '#94a3b8',
        y: 0,
        duration: 0.3
      });

      gsap.to(input, {
        borderColor: 'rgba(75, 85, 99, 0.5)',
        boxShadow: '0 0 0 0px rgba(16, 185, 129, 0)',
        duration: 0.3
      });
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div className="mb-6 relative">
      <label
        ref={labelRef}
        htmlFor={id}
        className="block text-base font-medium text-gray-300 mb-2 transition-all"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-[#121212] border border-gray-700/50 rounded-lg text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-500"
        />
        <div className="absolute inset-0 rounded-lg pointer-events-none glow-input-effect opacity-0"></div>
      </div>
    </div>
  );
});

// Fixed card header component with proper toggling
const CardHeader = memo(({ title, isExpanded, toggleExpand }) => {
  const chevronVariants = {
    up: { rotate: 180, color: '#10b981' },
    down: { rotate: 0, color: '#94a3b8' },
  };

  // Ensure the click handler works correctly
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleExpand();
  };

  return (
    <div
      className="flex items-center justify-between py-4 px-4 cursor-pointer rounded-t-xl hover:bg-gradient-to-r hover:from-emerald-900/10 hover:to-transparent transition-all duration-300"
      onClick={handleClick}
    >
      <motion.h2
        className="text-2xl font-bold text-white"
        animate={{
          textShadow: isExpanded ? '0 0 8px rgba(16, 185, 129, 0.5)' : '0 0 0px rgba(16, 185, 129, 0)'
        }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={chevronVariants}
        animate={isExpanded ? 'up' : 'down'}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );
});

// Enhanced emerald star field
const EmeraldStarField = memo(() => {
  const starsCanvasRef = useRef(null);

  // Draw the emerald star field on component mount
  useEffect(() => {
    if (!starsCanvasRef.current) return;

    const canvas = starsCanvasRef.current;
    const ctx = canvas.getContext('2d');

    // Make canvas full width and height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars(); // Redraw stars when resizing
    };

    // Create star layers
    const stars = [];
    const glowingStars = [];
    const shootingStars = [];

    // Initialize stars
    const initStars = () => {
      // Small background stars
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() < 0.7 ? 150 : 120 + Math.random() * 60, // Mostly emerald with some variation
        });
      }

      // Glowing stars (emerald pulsating ones)
      for (let i = 0; i < 40; i++) {
        glowingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 1.5 + 0.5,
          radius: 0,
          opacity: 0,
          hue: 140 + Math.random() * 20, // Emerald hue range
          pulse: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Shooting stars
      for (let i = 0; i < 3; i++) {
        addShootingStar();
      }
    };

    // Add a new shooting star
    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3), // Start in top third
        length: Math.random() * 80 + 30,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4, // 45-90 degree angle
        speed: Math.random() * 10 + 8,
        opacity: 0,
        hue: 140 + Math.random() * 30, // Emerald hue
        decay: 0.01 + Math.random() * 0.02,
      });
    };

    // Draw the stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw regular stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 80%, 70%, ${star.opacity})`;
        ctx.fill();
      });

      // Draw glowing stars
      glowingStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${star.opacity})`;
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
        gradient.addColorStop(0, `hsla(${star.hue}, 100%, 85%, ${star.opacity})`);
        gradient.addColorStop(1, `hsla(${star.hue}, 100%, 70%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw glow effect
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 100%, 80%, ${star.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 60%, ${star.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    // Animate stars
    const animateStars = () => {
      // Animate glowing stars
      glowingStars.forEach(star => {
        star.phase += 0.015;
        star.radius = star.baseRadius + Math.sin(star.phase) * star.baseRadius * 0.5;
        star.opacity = 0.2 + Math.sin(star.phase) * 0.7;
      });

      // Animate shooting stars
      shootingStars.forEach((star, index) => {
        if (star.opacity <= 0) {
          // Reset shooting star outside the view
          if (Math.random() < 0.01) { // Only spawn new one rarely
            shootingStars[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * (canvas.height / 3), // Start in top third
              length: Math.random() * 80 + 30,
              angle: Math.random() * Math.PI / 4 + Math.PI / 4, // 45-90 degree angle
              speed: Math.random() * 10 + 8,
              opacity: 0,
              hue: 140 + Math.random() * 30, // Emerald hue
              decay: 0.01 + Math.random() * 0.02,
            };
          }
          return;
        }

        // Grow opacity at start
        if (star.opacity < 1 && star.x > canvas.width * 0.8) {
          star.opacity += 0.05;
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

  return <canvas ref={starsCanvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
});

// Button with sophisticated hover effects
const GlowingButton = memo(({ onClick, children, isSubmitting, className }) => {
  const buttonRef = useRef(null);

  // Add mousemove effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    };

    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={isSubmitting}
      className={`group relative bg-gradient-to-br from-emerald-600 to-emerald-700 overflow-hidden text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 ${className}`}
    >
      {/* Hover effect overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Glow spot */}
      <span className="absolute w-40 h-40 rounded-full pointer-events-none mix-blend-screen glow-spot opacity-0 group-hover:opacity-30"
        style={{ left: 'var(--x)', top: 'var(--y)', transform: 'translate(-50%, -50%)' }} />

      {/* Button content */}
      <span className="relative z-10 block py-4 px-6">{children}</span>
    </button>
  );
});

// Main Tools component
const Tools = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tokenPanelExpanded, setTokenPanelExpanded] = useState(true);
  const [brandingPanelExpanded, setBrandingPanelExpanded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state using a single state object to reduce re-renders
  const [tokenForm, setTokenForm] = useState({
    name: '',
    ticker: '',
    mintAmount: '',
    decimals: '18',
    freezable: false,
    pauseable: false,
    changeableOwner: false,
    wipeable: false,
    upgradeable: true,
    canAddSpecialRoles: true
  });

  // Memoized mock token data
  const mockTokens = useMemo(() => [
    { name: 'Emerald Token', ticker: 'EMT', balance: '10,000', id: 'erd1...3x4f' },
    { name: 'Decentralize', ticker: 'DEC', balance: '5,234.23', id: 'erd1...9h2j' },
    { name: 'Stellar Coin', ticker: 'STEL', balance: '250,000', id: 'erd1...7k3l' }
  ], []);

  // Optimized refs
  const pageRef = useRef(null);
  const cardRefs = useRef([]);

  // Set up initial animations
  useEffect(() => {
    // Card entry animations
    if (cardRefs.current.length) {
      gsap.fromTo(cardRefs.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  // Optimized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setTokenForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // Fixed toggle panel functions
  const toggleTokenPanel = () => {
    setTokenPanelExpanded(prevState => !prevState);
  };

  const toggleBrandingPanel = () => {
    setBrandingPanelExpanded(prevState => !prevState);
  };

  // Connect wallet function with animations
  const connectWallet = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Connection animation sequence
    gsap.timeline({
      onComplete: () => {
        setIsWalletConnected(true);
        setIsSubmitting(false);
      }
    })
      .to('.connect-button-content', {
        opacity: 0,
        duration: 0.2
      })
      .to('.connect-button-content', {
        text: "Connecting...",
        opacity: 1,
        duration: 0.3
      })
      .to('.connect-button', {
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
        repeat: 3,
        yoyo: true,
        duration: 0.4
      })
      .to('.connect-button-content', {
        text: "Connected!",
        duration: 0.3
      });
  }, [isSubmitting]);

  // Form submission animation
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Success animation
    gsap.timeline({
      onComplete: () => {
        setTokenForm(prev => ({
          ...prev,
          name: '',
          ticker: '',
          mintAmount: ''
        }));
        setIsSubmitting(false);
      }
    })
      .to('.issue-button-content', {
        opacity: 0,
        duration: 0.2
      })
      .to('.issue-button-content', {
        text: "Processing...",
        opacity: 1,
        duration: 0.3
      })
      .to('.issue-card', {
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
        duration: 0.8,
        repeat: 1,
        yoyo: true
      })
      .to('.issue-button-content', {
        text: "Token Issued!",
        duration: 0.3
      })
      .to('.issue-button-content', {
        text: "Issue Token",
        delay: 1.5,
        duration: 0.3
      })
      .call(() => {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-5 right-5 bg-emerald-500 text-white px-5 py-4 rounded-lg shadow-xl z-50 flex items-center';
        notification.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Token "${tokenForm.name}" (${tokenForm.ticker}) successfully issued!</span>
      `;

        document.body.appendChild(notification);

        // Fade in
        gsap.fromTo(notification,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );

        // Fade out after delay
        setTimeout(() => {
          gsap.to(notification, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
              document.body.removeChild(notification);
            }
          });
        }, 4000);
      });
  }, [isSubmitting, tokenForm.name, tokenForm.ticker]);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-black text-gray-200 py-10 px-4 md:px-6 font-sans overflow-hidden">
      {/* Emerald Star Field */}
      <EmeraldStarField />

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Title with ultra sexy animation */}
        <h1 className="relative text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 mb-14 text-center tracking-wider">
          {"Tools".split('').map((letter, i) => (
            <AnimatedLetter key={i} letter={letter} index={i} />
          ))}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Issue Token Card */}
          <div
            ref={el => cardRefs.current[0] = el}
            className="issue-card relative bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-xl overflow-hidden group"
          >
            {/* Animated border glow effect */}
            <div className="absolute inset-0 z-0 border border-emerald-500/20 rounded-xl emerald-pulse-border"></div>

            {/* Corner glint */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full card-glint"></div>

            <CardHeader
              title="Issue Token"
            />

            <AnimatePresence>
              {tokenPanelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
                    <AnimatedInput
                      label="Name"
                      id="name"
                      name="name"
                      value={tokenForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter token name"
                    />

                    <AnimatedInput
                      label="Ticker"
                      id="ticker"
                      name="ticker"
                      value={tokenForm.ticker}
                      onChange={handleInputChange}
                      placeholder="Enter ticker symbol"
                    />

                    <AnimatedInput
                      label="Mint Amount"
                      id="mintAmount"
                      name="mintAmount"
                      value={tokenForm.mintAmount}
                      onChange={handleInputChange}
                      placeholder="Enter amount to mint"
                    />

                    <AnimatedInput
                      label="Decimals"
                      id="decimals"
                      name="decimals"
                      value={tokenForm.decimals}
                      onChange={handleInputChange}
                      placeholder="18"
                    />

                    {/* Toggles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 text-white gap-x-8 mt-8 toggles-container">
                      <div>
                        <Toggle
                          isOn={tokenForm.freezable}
                          onToggle={(val) => handleInputChange({ target: { name: 'freezable', type: 'checkbox', checked: val } })}
                          label="Freezable"
                          name="freezable"
                        />
                        <Toggle
                          isOn={tokenForm.pauseable}
                          onToggle={(val) => handleInputChange({ target: { name: 'pauseable', type: 'checkbox', checked: val } })}
                          label="Pauseable"
                          name="pauseable"
                        />
                        <Toggle
                          isOn={tokenForm.changeableOwner}
                          onToggle={(val) => handleInputChange({ target: { name: 'changeableOwner', type: 'checkbox', checked: val } })}
                          label="Changeable Owner"
                          name="changeableOwner"
                        />
                      </div>
                      <div className='text-white'>
                        <Toggle
                          isOn={tokenForm.wipeable}
                          onToggle={(val) => handleInputChange({ target: { name: 'wipeable', type: 'checkbox', checked: val } })}
                          label="Wipeable"
                          name="wipeable"
                        />
                        <Toggle
                          isOn={tokenForm.upgradeable}
                          onToggle={(val) => handleInputChange({ target: { name: 'upgradeable', type: 'checkbox', checked: val } })}
                          label="Upgradeable"
                          name="upgradeable"
                          isAccent={true}
                        />
                        <Toggle
                          isOn={tokenForm.canAddSpecialRoles}
                          onToggle={(val) => handleInputChange({ target: { name: 'canAddSpecialRoles', type: 'checkbox', checked: val } })}
                          label="Can Add Special Roles"
                          name="canAddSpecialRoles"
                          isAccent={true}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                      <GlowingButton
                        isSubmitting={isSubmitting}
                        className="w-full issue-button"
                      >
                        <span className="issue-button-content">Issue Token</span>
                      </GlowingButton>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Branding Token Card */}
          <div
            ref={el => cardRefs.current[1] = el}
            className="tool-card-right relative bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Animated border glow effect - different animation */}
            <div className="absolute inset-0 z-0 border border-emerald-500/20 rounded-xl emerald-pulse-border-alt"></div>

            {/* Corner glint - different position */}
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tl from-emerald-400/20 to-transparent rounded-full card-glint-alt"></div>

            <CardHeader
              title="Branding Token"
            />

            <AnimatePresence>
              {brandingPanelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
                  className="overflow-hidden"
                >
                  <div className="p-8 pt-4">
                    {!isWalletConnected ? (
                      <div className="py-12 flex flex-col items-center justify-center">
                        <motion.p
                          className="text-gray-200 text-xl mb-8 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          Connect wallet to see your tokens
                        </motion.p>

                        <GlowingButton
                          onClick={connectWallet}
                          isSubmitting={isSubmitting}
                          className="w-full connect-button"
                        >
                          <span className="connect-button-content">CONNECT WALLET</span>
                        </GlowingButton>
                      </div>
                    ) : (
                      <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                when: "beforeChildren",
                                staggerChildren: 0.2
                              }
                            }
                          }}
                        className="space-y-8"
                      >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              Your Tokens
                            </h3>
                          <button
                              className="text-sm text-emerald-400 hover:text-emerald-300 bg-[#121212] px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition-colors flex items-center gap-1"
                            onClick={() => setIsWalletConnected(false)}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            Disconnect
                          </button>
                        </div>

                          <div className="space-y-4 token-list">
                            {mockTokens.map((token, index) => (
                            <motion.div
                              key={token.id}
                                variants={{
                                  hidden: { y: 20, opacity: 0 },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 20
                                    }
                                  }
                                }}
                              whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
                              }}
                                whileTap={{ scale: 0.98 }}
                                className="p-4 bg-gradient-to-r from-[#121212] to-[#0c0c0c] border border-gray-700/40 rounded-lg hover:border-emerald-500/30 transition-all duration-300 cursor-pointer relative group"
                            >
                                {/* Token hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />

                                {/* Token content */}
                                <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <p className="font-medium text-white text-lg group-hover:text-emerald-300 transition-colors">{token.name}</p>
                                  <p className="text-xs text-gray-400">{token.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-400 font-bold text-lg">{token.balance}</p>
                                  <p className="text-xs text-gray-400">{token.ticker}</p>
                                </div>
                              </div>

                                {/* Subtle icon indicator */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500/0 group-hover:text-emerald-500/80 transition-all transform translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="pt-4">
                            <GlowingButton className="w-full">
                            Set Branding Options
                            </GlowingButton>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        /* Input glow effect animation */
        .glow-input-effect {
          box-shadow: 0 0 0 0px rgba(16, 185, 129, 0);
          transition: opacity 0.3s ease-in-out;
        }
        
        input:focus + .glow-input-effect {
          opacity: 1;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
        }
        
        /* Animated card border effects */
        .emerald-pulse-border {
          box-shadow: 0 0 15px rgba(16, 185, 129, 0);
          animation: pulseBorder 4s infinite alternate;
        }
        
        .emerald-pulse-border-alt {
          box-shadow: 0 0 15px rgba(16, 185, 129, 0);
          animation: pulseBorder 5s infinite alternate-reverse;
        }
        
        /* Card corner glint animations */
        .card-glint {
          opacity: 0.3;
          animation: glintAnimate 8s infinite linear;
        }
        
        .card-glint-alt {
          opacity: 0.3;
          animation: glintAnimate 10s infinite linear;
        }
        
        /* Button glow spot */
        .glow-spot {
          background: radial-gradient(circle, rgba(16, 255, 196, 0.8) 0%, rgba(16, 185, 129, 0.4) 30%, transparent 70%);
        }
        
        /* Keyframe Animations */
        @keyframes pulseBorder {
          0% { opacity: 0.1; border-color: rgba(16, 185, 129, 0.1); }
          50% { opacity: 0.4; border-color: rgba(16, 185, 129, 0.4); }
          100% { opacity: 0.1; border-color: rgba(16, 185, 129, 0.1); }
        }
        
        @keyframes glintAnimate {
          0% { transform: rotate(0deg) translateX(0) scale(1); opacity: 0.2; }
          25% { opacity: 0.4; }
          50% { transform: rotate(180deg) translateX(5px) scale(1.2); opacity: 0.3; }
          75% { opacity: 0.2; }
          100% { transform: rotate(360deg) translateX(0) scale(1); opacity: 0.2; }
        }
        
        /* Remove scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Tools;