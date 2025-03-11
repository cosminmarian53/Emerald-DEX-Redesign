// App.jsx (or Routes.jsx)
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Swap from "./pages/Swap";
import Farms from "./pages/Farms";
import Pools from "./pages/Pools";
import Analytics from "./pages/Analytics";
import ConnectWallet from "./pages/ConnectWallet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      {/* Navigation bar with links */}
      <Navbar />
      {/* Actual routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/pools" element={<Pools />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
      </Routes>
      <Footer />
    </>
  );
}
