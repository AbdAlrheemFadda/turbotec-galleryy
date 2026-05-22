import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CarModel from './CarModel';

import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export const carState  = { exploded: 0, color: 0, rotationY: Math.PI - 0.45, opacity: 1, scale: 0.90, annotationFocus: 0 };
export const arcState  = { opacity: 1 };

/**
 * Arc layout matching the reference image (camera looks down -Z):
 *
 *  [Rolls]   [BMW]       [G-Wagon]      [Urus]   [Bentley]
 *   far-L    mid-L       center-back    mid-R    far-R
 *                   [ FERRARI ] ← hero
 */


export default function Scene({ debugParams }: { debugParams?: any }) {
  const cameraRef   = useRef<any>(null);
  const baseCameraPos = useRef(new THREE.Vector3(0, 1.3, 11.5));
  const baseTargetPos = useRef(new THREE.Vector3(0, -2.7, 0.2));
  const mouse       = useRef({ x: 0, y: 0 });
  const carGroup    = useRef<THREE.Group>(null);



  const { camera } = useThree();

  React.useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });

      // Reset coordinates for stationary car presentation
      baseCameraPos.current.set(0, 1.3, 11.5);
      baseTargetPos.current.set(0, -1.6, 0.2); // Raised target further to push car down on screen
      
      // Car is completely stationary: fixed scale, rotation, and color
      carState.exploded  = 0; 
      carState.color = 0; 
      carState.rotationY = Math.PI - 0.15; // Face more straight forward
      carState.opacity   = 0; // Starts invisible, fades in on scroll
      carState.scale = 1.15; // Increased scale for more foreground presence compared to background cars
      carState.annotationFocus = 0; // Will trigger all annotations in disassembly phase

      arcState.opacity = 1;

      // Indicator fades out
      tl.to('.home-scroll-indicator', { opacity: 0, duration: 0.5 }, 0.05);
      tl.to(arcState, { opacity: 0, duration: 1.0 }, 0.2);

      // Fade in the Ferrari as scroll begins
      tl.to(carState, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0.0);

      // Phase 1: Opening (Front) Dolly In [0.0 -> 2.0]
      tl.to(baseCameraPos.current, { x: 0, y: 0.5, z: 8.5, duration: 2.0, ease: 'power3.inOut' }, 0.0);

      // Phase 2: Side Sweep [2.0 -> 4.0]
      // Sweep through a mid-point for an elegant physical crane path
      tl.to(baseCameraPos.current, { x: 4.5, y: 0.4, z: 7.5, duration: 1.0, ease: 'none' }, 2.0);
      tl.to(baseTargetPos.current, { x: 0.0, y: -2.0, z: -0.6, duration: 1.0, ease: 'none' }, 2.0);
      tl.to(baseCameraPos.current, { x: 7.5, y: -0.8, z: 0.2, duration: 1.0, ease: 'power3.inOut' }, 3.0);
      tl.to(baseTargetPos.current, { x: 0.0, y: -2.4, z: -1.5, duration: 1.0, ease: 'power3.inOut' }, 3.0);

      // Phase 3: Top Down View [4.0 -> 6.0]
      tl.to(baseCameraPos.current, { x: 4.5, y: 4.0, z: 0.2, duration: 1.0, ease: 'none' }, 4.0);
      tl.to(baseTargetPos.current, { x: 0.0, y: -1.6, z: 0.2, duration: 1.0, ease: 'power3.inOut' }, 4.0);
      tl.to(baseCameraPos.current, { x: 0.0, y: 8.0, z: 0.2, duration: 1.0, ease: 'power3.inOut' }, 5.0);

      // Phase 4: Rear Angle View [6.0 -> 7.5]
      tl.to(baseCameraPos.current, { x: -1.5, y: 4.5, z: -4.5, duration: 0.75, ease: 'none' }, 6.0);
      tl.to(baseCameraPos.current, { x: -3.5, y: 0.5, z: -7.5, duration: 0.75, ease: 'power3.out' }, 6.75);

      // Phase 5: Disassembly & Arrows [7.5 -> 11.5]
      // Camera is positioned directly above the car (top-down view)
      tl.to(baseCameraPos.current, { x: 0.0, y: 6.8, z: 0.28, duration: 4.0, ease: 'power3.inOut' }, 7.5);
      tl.to(baseTargetPos.current, { x: 0.0, y: -5.3, z: 0.2, duration: 4.0, ease: 'power3.inOut' }, 7.5);
      
      // Trigger disassembly (increased duration for comfortable viewing)
      tl.to(carState, { exploded: 1.0, duration: 4.0, ease: 'power3.inOut' }, 7.5);
      // Trigger annotations display
      tl.to(carState, { annotationFocus: 1, duration: 0.1 }, 8.5);

      // Phase 5 Pause: Fully Exploded view [11.5 -> 15.0]
      // Slow cinematic top-down drift directly above the car
      tl.to(baseCameraPos.current, { x: 0.05, y: 7.0, z: 0.28, duration: 3.5, ease: 'none' }, 11.5);

      // Phase 6: Elegant Reassembly [15.0 -> 18.0]
      tl.to(carState, { exploded: 0.0, duration: 3.0, ease: 'power3.inOut' }, 15.0);
      tl.to(carState, { annotationFocus: 0, duration: 0.5 }, 15.0);
      tl.to(baseCameraPos.current, { x: -3.5, y: 0.8, z: 8.5, duration: 3.0, ease: 'power3.inOut' }, 15.0);
      tl.to(baseTargetPos.current, { x: 1.2, y: -2.0, z: 0.2, duration: 3.0, ease: 'power3.inOut' }, 15.0);

      // Phase 7: Showcase Pause [18.0 -> 20.0]
      tl.to(baseCameraPos.current, { x: -2.8, y: 0.9, z: 9.0, duration: 2.0, ease: 'none' }, 18.0);

      // Phase 8: Smooth Fade Out [20.0 -> 21.0]
      tl.to(carState, { opacity: 0, duration: 1.0, ease: 'power2.out' }, 20.0);

      return () => tl.kill();
    });

    const onMouse = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight)  * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);
    return () => {
      mm.revert();
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  useFrame((state) => {
    const tx = baseCameraPos.current.x + mouse.current.x * 0.30;
    const ty = baseCameraPos.current.y + mouse.current.y * 0.20;
    
    // Slower cinematic lerp for premium physical crane feel
    camera.position.lerp(new THREE.Vector3(tx, ty, baseCameraPos.current.z), 0.025);
    camera.lookAt(baseTargetPos.current);

    if (carGroup.current) {
      if (debugParams) {
        carGroup.current.position.set(debugParams.posX, debugParams.posY, debugParams.posZ);
        carGroup.current.rotation.y = debugParams.rotY;
        carGroup.current.rotation.x = 0; 
        carGroup.current.scale.setScalar(debugParams.scale);
      } else {
        // STRICT REQUIREMENT: Car is absolutely stationary.
        // All motion comes from the camera (and camera mouse parallax).
        carGroup.current.position.set(0, -5.3, 0.2);
        // We lock it to the base rotation defined in carState
        carGroup.current.rotation.y = Math.PI - 0.15;
        carGroup.current.rotation.x = 0.12; // Slight forward tilt to correct camera perspective to match other cars
        carGroup.current.scale.setScalar(carState.scale);
      }
      
      carGroup.current.visible = carState.opacity > 0;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={48} position={[0, 1.3, 11.5]} />

      {/* ── Realistic Environment Lighting ── */}
      <ambientLight intensity={0.6} color="#1e293b" />
      {/* Soft main spotlight casting realistic shadows */}
      <spotLight position={[2, 12, 6]} intensity={0.95} angle={0.7} penumbra={1.0} castShadow color="#ffffff" shadow-mapSize={[2048, 2048]} />
      {/* Warm side fill light to ground the car in the ambient space */}
      <directionalLight position={[-6, 6, 3]} intensity={0.3} color="#ffeedd" />
      {/* Cool rim light from behind for silhouette definition */}
      <directionalLight position={[0, 5, -8]} intensity={1.0} color="#f1f5f9" />

      {/* Dynamic ambient lights to ground the car naturally inside the showroom */}
      <directionalLight position={[-10, 2, 2]} intensity={0.4} color="#f8fafc" />
      <directionalLight position={[10, 2, -2]} intensity={0.3} color="#f1f5f9" />

      {/* Soft neutral floor spotlight under the car that shines through mechanics during disassembly */}
      <pointLight position={[0, -5.0, 0.2]} intensity={0.8} distance={6} color="#ffffff" />

      {/* Cinematic Dual Parallel Showroom Softbox Panels for gorgeous hood/roof highlight strips (moved to z = 0.2) */}
      <mesh position={[-1.2, 4.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.6]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[1.2, 4.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.6]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      <fog attach="fog" args={['#060810', 16, 46]} />



      {/* ── Hero Ferrari GLB (center front, positioned at z = 0.2, grounded at y = -5.3) ── */}
      <group ref={carGroup} position={debugParams ? [debugParams.posX, debugParams.posY, debugParams.posZ] : [0, -5.3, 0.2]}>
        <CarModel />
      </group>

      <Environment preset="city" resolution={512} />

      {/* ── Cinematic Post-Processing ── */}
      <EffectComposer enableNormalPass={false} multisampling={4}>
        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.4} />
      </EffectComposer>
    </>
  );
}
