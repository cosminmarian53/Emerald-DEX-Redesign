// App.jsx (or Routes.jsx)
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Swap from "./pages/Swap";
import Farms from "./pages/Farms";
import Pools from "./pages/Pools";
import Analytics from "./pages/Analytics";
import ConnectWallet from "./pages/ConnectWallet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
export default function App() {
  return (
    <>
      {/* Navigation bar with links */}
      <Navbar />
      {/* Actual routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/pools" element={<Pools />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  );
}
