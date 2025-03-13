import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({ groupRef, item, isMobile }) => {
  return (
    <View
      index={1}
      id="view1"
      className="w-full h-full absolute"
      style={{ pointerEvents: isMobile ? "none" : "auto" }}
    >
      {/* Basic Lights */}
      <ambientLight intensity={0.3} />
      <Lights />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />

      {/* Render OrbitControls only if not on mobile */}
      {!isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      )}

      {/* 3D Model Group */}
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        rotation={[0.1, Math.PI - 0.2, 0]} // Default "back-facing"
      >
        <Suspense fallback={<Loader />}>
          <IPhone scale={[15, 15, 15]} item={item} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
