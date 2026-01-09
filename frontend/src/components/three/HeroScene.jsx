import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FloatingSphere from "./FloatingSphere";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ height: "100%", width: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <FloatingSphere />

      <Environment preset="city" />
    </Canvas>
  );
}
