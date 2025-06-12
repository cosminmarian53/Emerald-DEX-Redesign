import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Tools = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tokenPanelExpanded, setTokenPanelExpanded] = useState(true);
  const [brandingPanelExpanded, setBrandingPanelExpanded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
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

  // Mock token samples for branding section
  const mockTokens = [
    { name: 'Emerald Token', ticker: 'EMT', balance: '10,000', id: 'erd1...3x4f' },
    { name: 'Decentralize', ticker: 'DEC', balance: '5,234.23', id: 'erd1...9h2j' },
    { name: 'Sample Coin', ticker: 'SMPL', balance: '250,000', id: 'erd1...7k3l' }
  ];

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const borderEffectLeftRef = useRef(null);
  const borderEffectRightRef = useRef(null);
  const formRef = useRef(null);

  // Form change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTokenForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Animate on mount
  useEffect(() => {
    // Page fade in
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Title animation - properly done without breaking React's rendering
    if (titleRef.current) {
      // Main title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            // Add pulsing glow effect
            gsap.to(titleRef.current, {
              textShadow: '0 0 15px rgba(16, 185, 129, 0.7), 0 0 30px rgba(16, 185, 129, 0.4)',
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
    }

    // Animate panels
    gsap.fromTo('.tool-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );

    // Animate border effects
    if (borderEffectLeftRef.current) {
      gsap.to(borderEffectLeftRef.current, {
        backgroundPosition: '200% 0',
        duration: 15,
        ease: 'none',
        repeat: -1
      });
    }

    if (borderEffectRightRef.current) {
      gsap.to(borderEffectRightRef.current, {
        backgroundPosition: '-200% 0',
        duration: 15,
        ease: 'none',
        repeat: -1
      });
    }
  }, []);

  // Mock wallet connect function
  const connectWallet = () => {
    // Disable clicking during animation
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Button animation
    const connectBtn = document.querySelector('.connect-button');

    // Simulate connecting to wallet
    const tl = gsap.timeline({
      onComplete: () => {
        setIsWalletConnected(true);
        setIsSubmitting(false);
      }
    });

    // Button press
    tl.to(connectBtn, {
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Loading state
    tl.to(connectBtn, {
      innerHTML: 'Connecting...',
      duration: 0.2
    });

    // Pulse animation
    tl.to(connectBtn, {
      scale: 0.97,
      duration: 0.4,
      repeat: 3,
      yoyo: true
    });

    // Success state
    tl.to(connectBtn, {
      scale: 1.05,
      backgroundColor: '#10b981',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.7)',
      innerHTML: 'Connected!',
      duration: 0.4,
      ease: 'back.out(1.7)'
    });

    // Success ripple effect
    tl.to('.tool-card-right', {
      boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)',
      duration: 0.8,
      ease: 'sine.out'
    });
  };

  // Mock form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Button animation
    const submitButton = document.querySelector('.issue-button');
    const tl = gsap.timeline({
      onComplete: () => {
        setIsSubmitting(false);

        // Reset form
        setTokenForm({
          ...tokenForm,
          name: '',
          ticker: '',
          mintAmount: ''
        });
      }
    });

    // Initial press
    tl.to(submitButton, {
      scale: 0.95,
      backgroundColor: '#047857',
      duration: 0.2,
    });

    // Loading state
    tl.to(submitButton, {
      innerHTML: 'Processing...',
      duration: 0.3
    });

    // Simulating processing time
    tl.to({}, { duration: 1 });

    // Success pulse
    tl.to(submitButton, {
      scale: 1.05,
      innerHTML: 'Token Issued!',
      backgroundColor: '#10b981',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
      duration: 0.3,
      ease: 'back.out(1.7)'
    });

    // Reset button
    tl.to(submitButton, {
      scale: 1,
      innerHTML: 'Issue Token',
      boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.3)',
      backgroundColor: '#059669',
      duration: 0.3,
      delay: 1
    });

    // Success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg transform translate-y-[-20px] opacity-0 z-50';
    notification.textContent = `Token "${tokenForm.name}" (${tokenForm.ticker}) successfully issued!`;
    document.body.appendChild(notification);

    gsap.to(notification, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      delay: 1
    });

    gsap.to(notification, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      delay: 5,
      onComplete: () => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }
    });
  };

  // Toggle switch component
  const Toggle = ({ isOn, onToggle, label, name, color = "emerald" }) => {
    const bgColor = isOn ?
      (color === "emerald" ? "bg-emerald-500" : "bg-gray-600") :
      "bg-gray-700";

    const labelColor = isOn ?
      (color === "emerald" ? "text-emerald-400" : "text-gray-300") :
      "text-gray-300";

    return (
      <div className="flex items-center justify-between mb-6">
        <label htmlFor={name} className={`${labelColor} text-base font-medium transition-colors`}>
          {label}
        </label>
        <button
          type="button"
          className={`${bgColor} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          onClick={() => onToggle(!isOn)}
          role="switch"
          aria-checked={isOn}
          id={name}
        >
          <motion.span
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md"
            animate={{
              x: isOn ? 20 : 4,
              backgroundColor: "#fff",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    );
  };

  // Card header component
  const CardHeader = ({ title, isExpanded, toggleExpand }) => (
    <div
      className="flex items-center justify-between py-4 px-4 cursor-pointer rounded-t-xl hover:bg-gray-800/30 transition-all duration-300"
      onClick={toggleExpand}
    >
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );

  // Animated input field component
  const AnimatedInput = ({ label, id, name, value, onChange, placeholder, type = "text" }) => {
    return (
      <div className="mb-6">
        <label htmlFor={id} className="block text-base font-medium text-gray-300 mb-1.5">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-[#121212] border border-gray-700/50 rounded-lg text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 placeholder-gray-500"
        />
      </div>
    );
  };

  // Individual animated letters for the title
  const AnimatedLetter = ({ letter, index }) => {
    return (
      <motion.span
        className="inline-block"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: index * 0.08,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    );
  };

  return (
    <div ref={pageRef} className="relative w-full min-h-screen bg-black text-gray-200 py-10 px-4 md:px-6 font-sans">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full filter blur-[80px] animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-900/30 rounded-full filter blur-[60px] animate-pulse" style={{ animationDuration: '7s' }}></div>
      </div>

      {/* Star field background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
        backgroundSize: '25px 25px',
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Title with React-friendly animation approach */}
        <h1 ref={titleRef} className="relative text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-14 text-center tracking-wider">
          {/* Using proper React components for letter animation */}
          {"Tools".split('').map((letter, i) => (
            <AnimatedLetter key={i} letter={letter} index={i} />
          ))}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Issue Token Card */}
          <div className="tool-card bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-2xl overflow-hidden relative">
            {/* Animated border effect */}
            <div ref={borderEffectLeftRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent)',
                backgroundSize: '200% 100%',
              }}
            ></div>

            <CardHeader
              title="Issue Token"
              isExpanded={tokenPanelExpanded}
              toggleExpand={() => setTokenPanelExpanded(!tokenPanelExpanded)}
            />

            <AnimatePresence>
              {tokenPanelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
                  className="overflow-hidden"
                >
                  <form ref={formRef} onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-8">
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
                      <div>
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
                          color="emerald"
                        />
                        <Toggle
                          isOn={tokenForm.canAddSpecialRoles}
                          onToggle={(val) => handleInputChange({ target: { name: 'canAddSpecialRoles', type: 'checkbox', checked: val } })}
                          label="Can Add Special Roles"
                          name="canAddSpecialRoles"
                          color="emerald"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="issue-button w-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        style={{ boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.3)' }}
                      >
                        Issue Token
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Branding Token Card */}
          <div className="tool-card tool-card-right bg-gradient-to-br from-[#0E0E0E] to-[#080808] border border-gray-800/30 rounded-xl shadow-2xl overflow-hidden relative">
            {/* Animated border effect */}
            <div ref={borderEffectRightRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(-90deg, transparent, rgba(16, 185, 129, 0.4), transparent)',
                backgroundSize: '200% 100%',
              }}
            ></div>

            <CardHeader
              title="Branding Token"
              isExpanded={brandingPanelExpanded}
              toggleExpand={() => setBrandingPanelExpanded(!brandingPanelExpanded)}
            />

            <AnimatePresence>
              {brandingPanelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
                  className="overflow-hidden"
                >
                  <div className="p-8 pt-4">
                    {!isWalletConnected ? (
                      <div className="py-12 flex flex-col items-center justify-center">
                        <p className="text-gray-200 text-xl mb-8 text-center">Connect wallet to see your tokens</p>
                        <button
                          onClick={connectWallet}
                          disabled={isSubmitting}
                          className="connect-button w-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                          style={{ boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.3)' }}
                        >
                          CONNECT WALLET
                        </button>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-emerald-300">Your Tokens</h3>
                          <button
                            className="text-sm text-emerald-400 hover:text-emerald-300 bg-[#121212] px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                            onClick={() => setIsWalletConnected(false)}
                          >
                            Disconnect
                          </button>
                        </div>

                        <div className="space-y-4">
                          {mockTokens.map((token) => (
                            <motion.div
                              key={token.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
                              }}
                              className="p-4 bg-[#121212] border border-gray-700/40 rounded-lg hover:border-emerald-500/30 transition-colors cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-white">{token.name}</p>
                                  <p className="text-xs text-gray-400">{token.id}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-emerald-400 font-semibold">{token.balance}</p>
                                  <p className="text-xs text-gray-400">{token.ticker}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="pt-4">
                          <button
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            style={{ boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.3)' }}
                          >
                            Set Branding Options
                          </button>
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
    </div>
  );
};

export default Tools;