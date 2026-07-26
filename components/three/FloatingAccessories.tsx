"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingWatch({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.15;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <torusGeometry args={[0.32, 0.06, 16, 32]} />
        <meshPhysicalMaterial color="#e3c17a" metalness={0.85} roughness={0.2} clearcoat={0.6} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.27, 0.27, 0.05, 32]} />
        <meshPhysicalMaterial color="#0b0b0c" metalness={0.4} roughness={0.3} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

function FloatingBottle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25 + position[2];
    ref.current.position.y = position[1] + Math.cos(t * 0.5 + position[0]) * 0.12;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.42, 0.2]} />
        <meshPhysicalMaterial
          color="#8a6a52"
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          transmission={0.4}
        />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.14, 12]} />
        <meshStandardMaterial color="#0b0b0c" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

export function FloatingAccessories() {
  return (
    <>
      <FloatingWatch position={[-2.6, 1.1, -1]} />
      <FloatingWatch position={[2.9, -0.6, -1.6]} />
      <FloatingBottle position={[2.6, 1.3, -0.8]} />
      <FloatingBottle position={[-2.9, -0.9, -1.2]} />
    </>
  );
}
