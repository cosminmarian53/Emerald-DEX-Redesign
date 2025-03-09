import React, { useRef } from "react";
import { frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#title", {
      scrollTrigger: {
        trigger: "#title",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.from("#subtitle", {
      scrollTrigger: {
        trigger: "#subtitle",
        start: "20% bottom",
      },
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5, // slight delay after the title
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding background-section">
      <div className="screen-max-width">
        <div className="flex flex-col items-center">
          <h2 id="title" className="hiw-title">
            <span style={{ color: "#50C878", letterSpacing: "0.1em" }}>
              EMERALD
            </span>
            <span style={{ color: "#FFFFFF", letterSpacing: "0.1em" }}>
              {" "}
              DEX
            </span>
            <br />
          </h2>

          <p className="hiw-subtitle" id="subtitle">
            Multiversx's fastest exchange with a huge catalog of tokens
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                loop
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p
              className="hiw-text g_fadeIn"
              style={{ letterSpacing: "0.05em" }}
            >
              Emerald DEX is an entirely new class of exchange that delivers our{" "}
              <span className="text-emerald-500">best performance by far</span>.
            </p>

            <p
              className="hiw-text g_fadeIn"
              style={{ letterSpacing: "0.05em" }}
            >
              Experience{" "}
              <span className="text-emerald-500">lightning-fast swaps</span>,
              seamless liquidity, and a massive catalog of tokens for all your
              trading needs.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p
              className="hiw-text"
              style={{ letterSpacing: "0.1em", color: "white" }}
            >
              New
            </p>
            <p
              className="hiw-bigtext"
              style={{ letterSpacing: "0.1em", color: "white" }}
            >
              Pro-Class DEX
            </p>
            <p
              className="hiw-text"
              style={{ letterSpacing: "0.1em", color: "white" }}
            >
              built for speed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
