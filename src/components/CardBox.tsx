import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const CardBox = ({ state }: { state: "bae" | "vouv" }) => {
  const meshRef = useRef<Mesh>(null);

  // Charger les textures pour chaque face de la boîte
  const [front, back, left, right, top, bottom] = useLoader(TextureLoader, [
    `/textures/${state}/front.jpg`,
    `/textures/${state}/back.jpg`,
    `/textures/${state}/left.jpg`,
    `/textures/${state}/right.jpg`,
    `/textures/${state}/top.jpg`,
    `/textures/${state}/bottom.jpg`,
  ]);

  // Faire tourner le cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Ajustez la vitesse de rotation ici
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2.5, 2.5, 1.5]} /> {/* Dimensions de la boîte */}
      <meshStandardMaterial attach="material-0" map={right} /> {/* Droite */}
      <meshStandardMaterial attach="material-1" map={left} /> {/* Gauche */}
      <meshStandardMaterial attach="material-2" map={top} /> {/* Haut */}
      <meshStandardMaterial attach="material-3" map={bottom} /> {/* Bas */}
      <meshStandardMaterial attach="material-4" map={front} /> {/* Devant */}
      <meshStandardMaterial attach="material-5" map={back} /> {/* Arrière */}
    </mesh>
  );
};

export const ThreeDScene = ({ state }: { state: "bae" | "vouv" }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Résolution adaptative
      style={{ width: "60px", height: "60px", cursor: "pointer" }}
      camera={{ position: [0, 0, 6], fov: 40 }}
    >
      {/* Lumière ambiante */}
      <ambientLight intensity={0.4} />

      {/* Lumière directionnelle */}
      <directionalLight
        intensity={1}
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]} // Ombres haute qualité
      />

      {/* Lumière ponctuelle */}
      <pointLight intensity={0.5} position={[-5, 5, -5]} />

      {/* Environnement HDRI */}

      <CardBox state={state} />

      {/* Contrôles de caméra */}
      <OrbitControls
        enableZoom={false}
        target={[0, 0, 0]}
        minDistance={5}
        maxDistance={5}
        minPolarAngle={Math.PI / 2} // Limite la rotation sur l'axe X
        maxPolarAngle={Math.PI / 2} // Empêche l'inclinaison de la caméra
      />
    </Canvas>
  );
};
