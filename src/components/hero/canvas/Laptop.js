import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import "./Laptop.scss";

const Laptop = ({ scale_state, state_position }) => {
  const laptop = useGLTF("./3d/laptop/scene.gltf");

  useFrame(({ clock }) => {
    const rotation = clock.getElapsedTime() * 0.2;

    laptop.scene.rotation.y = rotation;
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        name="laptop"
        rotation={[0, 0, 0]}
        object={laptop.scene}
        scale={scale_state}
        position={state_position}
      />
    </mesh>
  );
};

const LaptopCanvas = () => {
  const [scale, setScale] = useState(0.7);
  const [position, setPosition] = useState([0, -3.25, -1.5]);
  const [fov, setFov] = useState(80);
  const [zoom, setZoom] = useState(0.9);
  useEffect(() => {
    const greaterThanLaptop = window.matchMedia("(max-width: 1400px)");
    const laptop = window.matchMedia("(max-width: 1024px)");
    const tablet = window.matchMedia("(max-width: 768px)");
    const mobile = window.matchMedia("(max-width: 425px)");

    const handleMediaQueryChange = (event) => {
      if (greaterThanLaptop.matches) {
        setScale(0.95);
        setPosition([0, -3.25, -1.5]);
        setFov(100);
        setZoom(0.8);
      } else if (laptop.matches) {
        setScale(0.7);
        setPosition([0, -3.25, -1.5]);
        setFov(100);
        setZoom(0.8);
      } else if (tablet.matches) {
        setScale(0.6);
        setPosition([0, -3.25, -1.5]);
        setFov(120);
        setZoom(0.6);
      } else if (mobile.matches) {
        setScale(0.4);
        setPosition([0, -4.25, -3.5]);
        setFov(100);
        setZoom(0.4);
      }
    };

    greaterThanLaptop.addEventListener("change", handleMediaQueryChange);
    laptop.addEventListener("change", handleMediaQueryChange);
    tablet.addEventListener("change", handleMediaQueryChange);
    mobile.addEventListener("change", handleMediaQueryChange);

    return () => {
      greaterThanLaptop.removeEventListener("change", handleMediaQueryChange);
      laptop.removeEventListener("change", handleMediaQueryChange);
      tablet.removeEventListener("change", handleMediaQueryChange);
      mobile.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="canvas-container">
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{
          position: [20, 3, 6],
          fov: fov,
          zoom: zoom,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Laptop state_position={position} scale_state={scale} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default LaptopCanvas;
