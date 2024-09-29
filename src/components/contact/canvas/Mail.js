import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import "./Mail.scss";

const Mail = ({ isMobile, ref }) => {
  const mail = useGLTF("./3d/mail/scene.gltf");

  return (
    <mesh ref={ref}>
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
        object={mail.scene}
        scale={isMobile ? 2 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[0.1, 6.5, 0]}
      />
    </mesh>
  );
};

const MailCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  const objectRef = useRef();
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 1400px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="mail-canvas">
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 10]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 200, 0.001], fov: 4 }}
      >
        <OrbitControls
          target={objectRef.current ? objectRef.current.position : [0, 0, 0]}
          zoom={2}
          enableZoom={false}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 2}
        />
        <Mail isMobile={isMobile} ref={objectRef} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default MailCanvas;
