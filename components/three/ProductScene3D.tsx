"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Category } from "@/lib/types";
import { ProceduralShoe } from "./ProceduralShoe";

function CategoryMesh({ category, colorA, colorB }: { category: Category; colorA: string; colorB: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y += 0.0025;
  });

  if (category === "shoes") {
    return (
      <group ref={ref} scale={1.1}>
        <ProceduralShoe />
      </group>
    );
  }

  if (category === "watches") {
    return (
      <group ref={ref}>
        <mesh castShadow>
          <torusGeometry args={[0.75, 0.14, 24, 48]} />
          <meshPhysicalMaterial color={colorA} metalness={0.9} roughness={0.18} clearcoat={0.7} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.12, 48]} />
          <meshPhysicalMaterial color={colorB} metalness={0.3} roughness={0.25} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color={colorA} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.95, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.1]} />
          <meshStandardMaterial color={colorA} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  if (category === "perfumes") {
    return (
      <group ref={ref}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 1.4, 0.6]} />
          <meshPhysicalMaterial
            color={colorA}
            transparent
            opacity={0.7}
            roughness={0.08}
            transmission={0.5}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.4, 24]} />
          <meshStandardMaterial color={colorB} roughness={0.35} metalness={0.4} />
        </mesh>
      </group>
    );
  }

  if (category === "belts" || category === "wallets") {
    return (
      <group ref={ref}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.32, 24, 48]} />
          <meshPhysicalMaterial color={colorA} roughness={0.5} metalness={0.15} clearcoat={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.12]} />
          <meshPhysicalMaterial color={colorB} metalness={0.8} roughness={0.2} clearcoat={0.8} />
        </mesh>
      </group>
    );
  }

  // clothes
  return (
    <group ref={ref}>
      <mesh castShadow>
        <capsuleGeometry args={[0.7, 1.4, 12, 24]} />
        <meshPhysicalMaterial color={colorA} roughness={0.7} metalness={0.05} clearcoat={0.2} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.42, 0.12, 16, 32]} />
        <meshPhysicalMaterial color={colorB} roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function ProductScene3D({
  category,
  colorA = "#0b0b0c",
  colorB = "#e3c17a",
}: {
  category: Category;
  colorA?: string;
  colorB?: string;
}) {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0.3, 4.2], fov: 36 }}>
      <color attach="background" args={["#101012"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[3, 4, 3]} angle={0.4} intensity={2} color="#f6e9cf" castShadow />
      <spotLight position={[-3, 1, -2]} intensity={0.6} color="#c7c9c6" />
      <Suspense fallback={null}>
        <CategoryMesh category={category} colorA={colorA} colorB={colorB} />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.2} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
      />
    </Canvas>
  );
}
