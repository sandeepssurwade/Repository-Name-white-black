"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { ProceduralShoe } from "./ProceduralShoe";
import { FloatingAccessories } from "./FloatingAccessories";

function Rig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  useFrame((state) => {
    state.camera.position.lerp(
      { x: state.pointer.x * 0.4, y: 0.4 + state.pointer.y * 0.15, z: 5.4 - scrollProgress.current * 1.2 } as any,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0b0b0c"]} />
      <fog attach="fog" args={["#0b0b0c", 6, 12]} />
      <ambientLight intensity={0.35} />
      <spotLight
        position={[3, 5, 4]}
        angle={0.35}
        penumbra={0.6}
        intensity={2.2}
        color="#f6e9cf"
        castShadow
      />
      <spotLight position={[-4, 2, -3]} angle={0.5} intensity={0.8} color="#c7c9c6" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <ProceduralShoe scrollProgress={scrollProgress} />
        </Float>
        <FloatingAccessories />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.55} scale={8} blur={2.4} far={2} />
      </Suspense>
      <Rig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
