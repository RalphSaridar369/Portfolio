import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import "./Mail.scss";

const Mail = ({ scale }) => {
  const mail = useGLTF("./3d/mail/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.35} groundColor="gray" />
      <spotLight
        position={[-20, 30, 15]}
        angle={0.3}
        penumbra={1}
        intensity={1.2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={mail.scene}
        scale={scale}
        position={[0, -10.25, -1.5]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const MailCanvas = () => {
  const [scale, setScale] = useState(20);
  const [position, setPosition] = useState([10, 5, 35]);
  const [fov, setFov] = useState(80);
  const [zoom, setZoom] = useState(1);

  // useEffect(() => {
  //   const mediaQueries = {
  //     greaterThanLaptop: window.matchMedia("(max-width: 1400px)"),
  //     laptop: window.matchMedia("(max-width: 1024px)"),
  //     tablet: window.matchMedia("(max-width: 768px)"),
  //     mobile: window.matchMedia("(max-width: 425px)"),
  //   };

  //   const handleMediaQueryChange = () => {
  //     if (mediaQueries.greaterThanLaptop.matches) {
  //       setScale(20);
  //       setPosition([10, 5, 35]);
  //       setFov(120);
  //       setZoom(0.8);
  //     } else if (mediaQueries.laptop.matches) {
  //       setScale(10);
  //       setPosition([10, 5, 35]);
  //       setFov(120);
  //       setZoom(0.8);
  //     } else if (mediaQueries.tablet.matches) {
  //       setScale(70);
  //       setPosition([10, 5, 35]);
  //       setFov(80);
  //       setZoom(10);
  //     } else if (mediaQueries.mobile.matches) {
  //       setScale(20);
  //       setPosition([10, 5, 35]);
  //       setFov(120);
  //       setZoom(0.8);
  //     }
  //   };

  //   // Add listeners for media query changes
  //   Object.values(mediaQueries).forEach((query) => {
  //     query.addEventListener("change", handleMediaQueryChange);
  //   });

  //   // Initial check
  //   handleMediaQueryChange();

  //   // Cleanup listeners on unmount
  //   return () => {
  //     Object.values(mediaQueries).forEach((query) => {
  //       query.removeEventListener("change", handleMediaQueryChange);
  //     });
  //   };
  // }, []);

  return (
    <div className="mail-canvas">
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: position,
          fov: fov,
          zoom: zoom,
        }}
      >
        <OrbitControls
          autoRotate
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Mail scale={scale} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default MailCanvas;
