import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import { animateWithGsap } from "../utils/animations";

import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    animateWithGsap("#highlights_title", { y: 0, opacity: 1 });
    animateWithGsap(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.5 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="highlights_title" className="section-heading text-white">
            Experience the Future.
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              <a
                href="https://docs.multiversx.com/"
                className=" text-emerald-300"
                target="_blank"
              >
                Explore the Tech
              </a>
              <img
                src={rightImg}
                alt="right"
                className="ml-2  text-emerald-300"
              />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
