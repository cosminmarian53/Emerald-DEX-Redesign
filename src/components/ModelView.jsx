import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({ groupRef, item }) => {
  return (
    <View index={1} id="view1" className="w-full h-full absolute">
      {/* Basic Lights */}
      <ambientLight intensity={0.3} />
      <Lights />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />

      {/* OrbitControls - disabled for user rotation */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        // limited rotation
        enableDamping={true}
        enableRotate={true}
      />

      {/*
        Give the group a DEFAULT rotation so that
        it starts back-facing & slightly tilted:
          x = 0.2, y = Math.PI, z = 0
      */}
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        rotation={[0.1, Math.PI - 0.2, 0]} // <--- Default "back-facing"
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={[15, 15, 15]} // scale up as needed
            item={item}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
