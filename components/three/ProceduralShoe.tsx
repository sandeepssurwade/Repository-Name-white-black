"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A stylized, abstracted sneaker built entirely from primitive geometry
 * and shader-friendly materials. Not a literal shoe model — an editorial
 * silhouette in the house's matte-black / gold language.
 */
export function ProceduralShoe({
  scrollProgress,
}: {
  scrollProgress?: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const sole = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const progress = scrollProgress?.current ?? 0;

    // idle bob + mouse parallax
    group.current.rotation.y =
      Math.PI * 0.18 + Math.sin(t * 0.35) * 0.08 + state.pointer.x * 0.35 - progress * Math.PI * 0.6;
    group.current.rotation.x = state.pointer.y * -0.12 + Math.sin(t * 0.5) * 0.02;
    group.current.position.y = Math.sin(t * 0.8) * 0.08 - progress * 0.6;
    group.current.position.z = -progress * 1.4;
  });

  return (
    <group ref={group} position={[0, 0, 0]} dispose={null}>
      {/* Sole */}
      <mesh ref={sole} position={[0, -0.62, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.62, 1.7, 8, 16]} />
        <meshPhysicalMaterial
          color="#141414"
          roughness={0.55}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>
      <mesh position={[0, -0.32, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.56, 1.9, 24]} />
        <meshPhysicalMaterial color="#e3c17a" roughness={0.3} metalness={0.6} clearcoat={0.6} />
      </mesh>

      {/* Upper body */}
      <mesh position={[0.1, 0.15, 0]} rotation={[0, 0, 0.05]} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 1.5, 10, 20]} />
        <meshPhysicalMaterial
          color="#0b0b0c"
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
          reflectivity={0.6}
        />
      </mesh>

      {/* Toe cap accent */}
      <mesh position={[0.95, 0.02, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshPhysicalMaterial color="#161615" roughness={0.4} metalness={0.2} clearcoat={0.8} />
      </mesh>

      {/* Heel counter */}
      <mesh position={[-1.0, 0.18, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.62, 0.86]} />
        <meshPhysicalMaterial color="#0b0b0c" roughness={0.3} metalness={0.25} clearcoat={0.9} />
      </mesh>

      {/* Gold stitch line across the vamp */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0.4 - i * 0.22, 0.55, 0.3]} rotation={[0.3, 0.2, 0]}>
          <boxGeometry args={[0.03, 0.1, 0.03]} />
          <meshStandardMaterial color="#e3c17a" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Eyelets */}
      {[...Array(5)].map((_, i) => (
        <group key={i}>
          <mesh position={[0.55 - i * 0.24, 0.62, 0.42]}>
            <torusGeometry args={[0.045, 0.014, 8, 16]} />
            <meshStandardMaterial color="#c7c9c6" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.55 - i * 0.24, 0.62, -0.42]}>
            <torusGeometry args={[0.045, 0.014, 8, 16]} />
            <meshStandardMaterial color="#c7c9c6" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Laces */}
      <mesh position={[0.3, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusKnotGeometry args={[0.14, 0.02, 64, 8, 2, 3]} />
        <meshStandardMaterial color="#f6f4ef" roughness={0.6} metalness={0.05} />
      </mesh>
    </group>
  );
}
