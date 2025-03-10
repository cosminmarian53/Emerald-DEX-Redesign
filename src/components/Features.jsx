import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { egldImg, xImg, exploreVideo, highlightImg } from "../utils";
import gsap from "gsap";

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap("#features_title", { y: 0, opacity: 1 });
    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );
    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-3 w-full">
          <h1 id="features_title" className="section-heading">
            Unleash the Power of DeFi.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden space-y-12">
          {/* Title Section */}
          <div className="mt-32 mb-4 pl-4">
            <h2 className="text-5xl lg:text-7xl font-semibold">Emerald DEX.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Powered by MultiversX.
            </h2>
          </div>

          {/* Main Video Section */}
          <div className="flex-center flex-col sm:px-10 space-y-2">
            <div className="relative h-[60vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                loop
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            {/* Feature Images & Text */}
            <div className="flex flex-col w-full relative space-y-8">
              <div className="feature-video-container space-y-8">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  {/* Replace with your own image */}
                  <img
                    width={100}
                    height={100}
                    src={xImg}
                    alt="High-speed transactions"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  {/* Replace with your own image */}
                  <img
                    src={highlightImg}
                    alt="Expansive token catalog"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              <div className="feature-text-container space-y-8">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Emerald DEX harnesses the power of{" "}
                    <span className="text-white">MultiversX</span>, delivering{" "}
                    <span className="text-white">blazing-fast swaps</span> and a
                    massive catalog of tokens—all under one roof.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Built with{" "}
                    <span className="text-white">
                      state-of-the-art security
                    </span>{" "}
                    and an intuitive interface, Emerald DEX ensures traders of
                    every level can swap confidently and efficiently—no heavy
                    lifting required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features