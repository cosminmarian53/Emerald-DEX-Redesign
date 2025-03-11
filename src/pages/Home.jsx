import Navbar from "../components/Navbar";
import Highlights from "../components/Highlights";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

import * as Sentry from "@sentry/react";

const Home = () => {
  return (
    <main className="bg-black">
      <HowItWorks />
      <Highlights />
      <Features />
    </main>
  );
};

export default Sentry.withProfiler(Home);
