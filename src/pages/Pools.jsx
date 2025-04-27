import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { usdcImg, egldImg, ethImg, bnbImg, btcImg, solImg } from "../utils/index";
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
  // Modal state object: type can be "add" or "remove", and pool holds the pool data
  const [modalData, setModalData] = useState({ type: '', pool: null });

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const subHeaderRef = useRef(null);
  const tableRef = useRef(null);

  // GSAP animations on mount
  useEffect(() => {
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
    gsap.fromTo(
      "#newPoolBtn",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
    );
     gsap.fromTo(
      "#table",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1 }
    );
  }, []);

  const toggleExpand = (id) => {
    setExpandedPool((prev) => (prev === id ? null : id));
  };

  const handleSwap = () => {
    navigate('/swap');
  };

  // Open modal with specific type ("add" or "remove") for a given pool
  const openModal = (type, pool) => {
    setModalData({ type, pool });
  };

  // Close modal
  const closeModal = () => {
    setModalData({ type: '', pool: null });
  };

  // Render modal content based on type.
  const renderModalContent = () => {
    if (!modalData.pool) return null;
    const { type, pool } = modalData;
    if (type === 'add') {
      // For Add Liquidity: Show two token inputs and balances, a "MAX" option, and a conversion rate
      const [tokenA, tokenB] = pool.poolAssets;
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#00c58a]">
            Add Liquidity
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src={tokenImages[tokenA.token]}
              alt={tokenA.token}
              className="w-8 h-8 object-contain"
            />
            <div className="flex-1">
              <label className="block text-sm text-gray-300">
                {tokenA.token} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
                />
                <button className="absolute right-2 top-2 text-xs text-[#00f2ab]">
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Balance: 1000 {tokenA.token}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={tokenImages[tokenB.token]}
              alt={tokenB.token}
              className="w-8 h-8 object-contain"
            />
            <div className="flex-1">
              <label className="block text-sm text-gray-300">
                {tokenB.token} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
                />
                <button className="absolute right-2 top-2 text-xs text-[#00f2ab]">
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Balance: 5 {tokenB.token}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300">
              Conversion Rate: 1 {tokenB.token} ≈ 350 {tokenA.token}
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded-full text-sm text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#00f2ab] rounded-full text-sm text-black font-semibold hover:bg-[#00a676]"
            >
              Confirm
            </button>
          </div>
        </div>
      );
    } else if (type === 'remove') {
      // For Remove Liquidity: Show one input for amount and the user balance.
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
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Balance: {pool.yourLiquidity}
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded-full text-sm text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#00f2ab] rounded-full text-sm text-black font-semibold hover:bg-[#00a676]"
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
      className="w-full min-h-screen bg-gradient-to-b from-[#001e12] via-[#00281a] to-[#001e12] text-[#c4ffc4] py-10 font-sans"
      style={{
        backgroundImage: `
          radial-gradient(rgba(0,197,138,0.07) 1px, transparent 1px), 
          radial-gradient(rgba(0,197,138,0.07) 1px, transparent 1px)
        `,
        backgroundPosition: '0 0, 25px 25px',
        backgroundSize: '50px 50px',
      }}
    >
      {/* Header Section */}
      <header className="max-w-6xl mx-auto text-center mb-12 px-4">
        <h1
          ref={headerRef}
          id="header"
          className="text-5xl section-heading text-spacing-2 md:text-6xl font-extrabold text-[#00c58a] drop-shadow-lg tracking-wide"
        >
          Liquidity Pools
        </h1>
        <p ref={subHeaderRef} id="subheader" className="text-white text-sm mt-2">
          Manage and explore decentralized liquidity on{' '}
          <span className="text-[#00f2ab] font-medium">EMERALD DEX</span>.
        </p>
        <button
          id="newPoolBtn"
          className="mt-8 px-8 py-3 bg-[#00f2ab] text-black font-semibold rounded-full shadow-lg hover:bg-[#00a676] hover:text-white transition-all transform hover:scale-105"
        >
          + New Pool
        </button>
      </header>

      {/* Table-like Container */}
      <div id="table" className="max-w-6xl mx-auto px-4" ref={tableRef}>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 py-2 text-[#81ffc1] border-b border-[#00f2ab]/30 mb-2 font-medium">
          <span className="col-span-3">Pool</span>
          <span className="col-span-2">Liquidity</span>
          <span className="col-span-2">Fees (24h)</span>
          <span className="col-span-2">Volume (24h)</span>
          <span className="col-span-3 text-right">Actions</span>
        </div>

        {/* Table Rows */}
        {poolsData.map((pool) => {
          const isExpanded = expandedPool === pool.id;
          return (
            <div key={pool.id}>
              <div
                onClick={() => toggleExpand(pool.id)}
                className="grid grid-cols-12 gap-2 py-3 items-center cursor-pointer border-b border-[#ffffff33] hover:bg-white/5 transition-colors"
              >
                {/* Pool (with token images) */}
                <div className="col-span-3 flex items-center space-x-2 font-medium">
                  {pool.poolAssets.map((asset, idx) => (
                    <img
                      key={idx}
                      src={tokenImages[asset.token]}
                      alt={asset.token}
                      className="w-8 h-8 object-contain"
                      title={asset.token}
                    />
                  ))}
                  <span className="text-[#c4ffc4]">{pool.pair}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-100">{pool.liquidity}</div>
                <div className="col-span-2 text-sm text-gray-100">{pool.fees}</div>
                <div className="col-span-2 text-sm text-gray-100">{pool.volume24h}</div>

                {/* Action Buttons */}
                <div className="col-span-3 flex justify-end space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("add", pool);
                    }}
                    className="border border-[#00f2ab] px-4 py-1 rounded-full text-xs font-medium text-[#00f2ab] hover:bg-[#00f2ab] hover:text-black transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("remove", pool);
                    }}
                    className="border border-red-500 px-4 py-1 rounded-full text-xs font-medium text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSwap();
                    }}
                    className="bg-gradient-to-r from-[#00c58a] to-[#00f2ab] px-4 py-1 rounded-full text-xs font-semibold text-black hover:from-[#00f2ab] hover:to-[#00a676] transition-transform transform hover:scale-105"
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
                    className="overflow-hidden bg-[#ffffff0a] border-b border-white/10"
                  >
                    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-200">
                      {/* Pool Assets Details */}
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-md text-[#00f2ab] font-bold mb-2">
                          Pool Assets:
                        </h3>
                        {pool.poolAssets.map((asset, idx) => (
                          <div key={idx} className="mb-1">
                            <span className="font-semibold">{asset.token}</span>{' '}
                            <span className="text-gray-400">({asset.contract})</span>
                          </div>
                        ))}
                      </div>
                      {/* Your Liquidity & Share */}
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="text-gray-300">
                          Your Liquidity:{' '}
                          <span className="text-gray-100 font-medium">
                            {pool.yourLiquidity}
                          </span>
                        </p>
                        <p className="text-gray-300">
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

      {/* Modal (Add/Remove Liquidity) */}
      <AnimatePresence>
        {modalData.type && (
          <motion.div
            key="modalBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100vh", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#001e12] p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 text-white"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                X
              </button>
              {renderModalContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pools;
