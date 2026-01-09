import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FloatingSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.003;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#4f46e5"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
