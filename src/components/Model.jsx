import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useState } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";

const Model = () => {
  // Reference to the 3D group for the phone
  const phoneRef = useRef(new THREE.Group());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    /**
     * By default, the group is at rotation = [0.2, Math.PI, 0]
     *   => Slight tilt, facing away (the "back")
     *
     * Animate from y = π  to  y = 0
     * so it ends up facing forward (still with x = 0.2 tilt).
     */

    // Detect mobile on mount
    setIsMobile(window.innerWidth < 768);

    // Animate phone rotation
    const phone = phoneRef.current;
    if (!phone) return;
    gsap.fromTo(
      phone.rotation,
      { y: 0 },
      {
        y: Math.PI - 0.2,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, []);

  // Example heading animation
  useGSAP(() => {
    gsap.fromTo(
      "#heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );
    // now for subheading, with slight delay, so that it appears after heading when scrolling
    gsap.fromTo(
      "#subheading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  // Simple phone data
  const model = {
    title: "",
    color: ["#50C878"],
    img: yellowImg,
  };

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading text-center">
          Swap tokens like never before.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* Single ModelView for the phone */}
            <ModelView groupRef={phoneRef} item={model} isMobile={isMobile} />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
        </div>
        <h3 id="subheading" className="section-subheading text-center">
          And see your gains multiply.
        </h3>
      </div>
    </section>
  );
};

export default Model;
