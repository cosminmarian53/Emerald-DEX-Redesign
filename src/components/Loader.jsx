import { Html } from "@react-three/drei";
import React from "react";

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">
          <img
            src="https://lh6.googleusercontent.com/proxy/W5KYPvkP9ifLKmpq7yx6Mx_jXhcLc7_YfSFPmpw1T3Jbfi7aVMAzDTrepqp5lu6Q"
            alt="loader"
            className="w-25 h-24 flex items-center justify-center"
          />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
