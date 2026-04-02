import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Stars
          radius={100}     // sphere radius
          depth={50}       // depth of stars
          count={5000}     // number of stars
          factor={4}       // size
          saturation={0}
          fade
          speed={1}        // animation speed
        />
      </Canvas>
    </div>
  );
}