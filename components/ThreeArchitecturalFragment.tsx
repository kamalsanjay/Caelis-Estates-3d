"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/Meshy_AI_Cliffside_Sky_Villa_0516212452_texture.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Dynamically compute bounding box and normalize scale to fill the screen majestically!
  const normalizedScene = useMemo(() => {
    const cloned = scene.clone(true);
    
    // Compute current bounding dimensions
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Scale model so its dominant dimension is ~7.5 units (prominent, imposing, crystal clear)
    const targetSize = 7.5;
    const autoScale = maxDim > 0 ? targetSize / maxDim : 1;
    cloned.scale.setScalar(autoScale);

    // Re-center geometry at origin
    const centeredBox = new THREE.Box3().setFromObject(cloned);
    const center = centeredBox.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    // Enhance materials for rich architectural realism
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (
            Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
          ) as THREE.MeshStandardMaterial;
          if (mat) {
            mat.roughness = Math.min(Math.max(mat.roughness ?? 0.4, 0.2), 0.75);
            mat.metalness = Math.min(mat.metalness ?? 0.15, 0.45);
            mat.envMapIntensity = 1.6;
            mat.needsUpdate = true;
          }
        }
      }
    });

    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      
      // Target rotation smoothly synced with scroll
      const targetRotationY = scrollY * 0.0015;
      
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.04
      );
      
      // Subtle organic floating motion
      const elapsedTime = state.clock.getElapsedTime();
      modelRef.current.position.y = THREE.MathUtils.lerp(
        modelRef.current.position.y,
        Math.sin(elapsedTime * 0.7) * 0.12,
        0.04
      );
    }
  });

  return (
    <group ref={modelRef} dispose={null} position={[0, 0.2, 0]}>
      <primitive 
        object={normalizedScene} 
        rotation={[0.08, Math.PI / 4.5, 0]} 
      />
    </group>
  );
}

export default function ThreeArchitecturalFragment() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 2.2, 8.8], fov: 42 }}
      >
        {/* Warm luxury studio backdrop */}
        <color attach="background" args={["#F8F3EA"]} />
        <fog attach="fog" args={["#F8F3EA", 14, 26]} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.85} />
        
        {/* Main Sun Key Light */}
        <directionalLight
          position={[10, 16, 10]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        
        {/* Warm Bronze Accent Rim Light */}
        <directionalLight
          position={[-12, 8, -8]}
          intensity={1.2}
          color="#C8A96A"
        />

        {/* Soft Travertine Fill Light */}
        <pointLight position={[0, -4, 5]} intensity={0.65} color="#E8D7BE" />

        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" environmentIntensity={1.3} />
          {/* Grounding Contact Shadow */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.65}
            scale={18}
            blur={2.4}
            far={6}
            color="#2A2016"
          />
        </Suspense>

        {/* Smooth OrbitControls for intuitive exploration */}
        <OrbitControls 
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 4.5}
        />
      </Canvas>
    </div>
  );
}

// Preload to speed up component loading times
useGLTF.preload("/Meshy_AI_Cliffside_Sky_Villa_0516212452_texture.glb");
