import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, MeshReflectorMaterial, Float, Html, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARS = [
  { name: 'Ferrari SF90', price: '$507,000', specs: '986 HP | HYBRID V8', file: '/ferrari_sf90.webp', pos: [-30, 2, -15], rot: [0, Math.PI/4, 0] },
  { name: 'Lamborghini Revuelto', price: '$608,000', specs: '1001 HP | V12 HYBRID', file: '/lamborghini_revuelto.webp', pos: [-20, 2, -25], rot: [0, Math.PI/6, 0] },
  { name: 'Porsche 911 Turbo S', price: '$230,000', specs: '640 HP | FLAT-6', file: '/porsche_911_turbo.webp', pos: [-10, 2, -30], rot: [0, Math.PI/12, 0] },
  { name: 'Bugatti Chiron', price: '$3,300,000', specs: '1578 HP | W16 QUAD-TURBO', file: '/bugatti_chiron.webp', pos: [0, 2, -32], rot: [0, 0, 0] },
  { name: 'McLaren 765LT', price: '$382,000', specs: '755 HP | TWIN-TURBO V8', file: '/mclaren_765lt.webp', pos: [10, 2, -30], rot: [0, -Math.PI/12, 0] },
  { name: 'Aston Martin DBS', price: '$333,000', specs: '715 HP | TWIN-TURBO V12', file: '/aston_martin_dbs.webp', pos: [20, 2, -25], rot: [0, -Math.PI/6, 0] },
  { name: 'Rimac Nevera', price: '$2,200,000', specs: '1914 HP | QUAD-MOTOR EV', file: '/rimac_nevera.webp', pos: [30, 2, -15], rot: [0, -Math.PI/4, 0] },
];

function GalleryItem({ car }: { car: typeof CARS[0] }) {
  const texture = useTexture(car.file);
  
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  return (
    <>
      {/* Aesthetic Halo Light on the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <ringGeometry args={[4, 4.05, 64]} />
        <meshBasicMaterial color="#4D7CFF" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial color="#4D7CFF" transparent opacity={0.05} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3} position={car.pos as any} rotation={car.rot as any}>
        {/* Premium Screen Frame */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[8.4, 4.9]} />
          <meshStandardMaterial color="#ffffff" opacity={0.1} transparent metalness={1} roughness={0} />
        </mesh>

        {/* Main Image Display */}
        <mesh castShadow>
          <planeGeometry args={[8, 4.5]} />
          <meshStandardMaterial 
            map={texture} 
            transparent 
            roughness={0} 
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </>
  );
}

function GalleryScene() {
  const cameraRef = useRef<any>(null);
  const baseCameraPos = useRef(new THREE.Vector3(CARS[0].pos[0] + 1, CARS[0].pos[1] + 1, CARS[0].pos[2] + 7));
  const baseTargetPos = useRef(new THREE.Vector3(...CARS[0].pos));
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#gallery-scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        }
      });

      // Starting pos
      baseCameraPos.current.set(CARS[0].pos[0] + 1, CARS[0].pos[1] + 1, CARS[0].pos[2] + 7);
      baseTargetPos.current.set(CARS[0].pos[0], CARS[0].pos[1], CARS[0].pos[2]);
      
      tl.to('.gallery-scroll-indicator', { opacity: 0, duration: 0.5 }, 0.1);
      tl.to('.gallery-intro-text', { opacity: 0.05, duration: 2 }, 0);
      
      const timePerCar = 2;

      CARS.forEach((car, index) => {
        const nextCar = CARS[index + 1];
        const startTime = index * timePerCar;
        
        // 1. Orbit around current car (Sweep)
        tl.to(baseCameraPos.current, { 
          x: car.pos[0] + 9 * Math.sin(car.rot[1] + 0.6), 
          y: car.pos[1] + 1, 
          z: car.pos[2] + 9 * Math.cos(car.rot[1] + 0.6), 
          duration: timePerCar * 0.5, 
          ease: 'power2.inOut' 
        }, startTime);

        if (nextCar) {
           // 2. Dolly zoom + crane to next car
           tl.to(baseCameraPos.current, { 
             x: nextCar.pos[0] + 7 * Math.sin(nextCar.rot[1] - 0.4), 
             y: nextCar.pos[1] + 0.5, 
             z: nextCar.pos[2] + 7 * Math.cos(nextCar.rot[1] - 0.4), 
             duration: timePerCar * 0.5, 
             ease: 'power2.inOut' 
           }, startTime + timePerCar * 0.5);
           tl.to(baseTargetPos.current, { 
             x: nextCar.pos[0], 
             y: nextCar.pos[1], 
             z: nextCar.pos[2], 
             duration: timePerCar * 0.5, 
             ease: 'power2.inOut' 
           }, startTime + timePerCar * 0.5);
        }
      });

      // Final pull back (reveal panorama)
      const finalTime = CARS.length * timePerCar - timePerCar * 0.5; 
      tl.to(baseCameraPos.current, { x: 0, y: 12, z: 22, duration: timePerCar }, finalTime);
      tl.to(baseTargetPos.current, { x: 0, y: 2, z: -25, duration: timePerCar }, finalTime);
      
      // Fade out
      tl.to('.gallery-canvas-wrapper', { opacity: 0, duration: timePerCar * 0.5 }, finalTime + timePerCar * 0.5);
      tl.set('.gallery-canvas-wrapper', { pointerEvents: 'none' });

      return () => tl.kill();
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      mm.revert();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useFrame(() => {
    const targetCamX = baseCameraPos.current.x + mouse.current.x * 0.4;
    const targetCamY = baseCameraPos.current.y + mouse.current.y * 0.4;
    const targetCamZ = baseCameraPos.current.z;

    camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.05);
    camera.lookAt(baseTargetPos.current);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={40} position={[-30, 3, -8]} />
      <color attach="background" args={['#030508']} />
      
      {/* Studio Lighting - Balanced and Professional */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 40, 20]} intensity={2} angle={0.5} penumbra={1} color="#ffffff" />
      
      {/* Dynamic Luxury Rim Lights - Synchronized with CARS */}
      {CARS.map((car, i) => (
         <group key={i} position={car.pos as any}>
            {/* Top Glow */}
            <pointLight position={[0, 6, 0]} intensity={1.5} color="#ffffff" distance={15} />
            {/* Side Accents */}
            <spotLight position={[10, 2, 5]} intensity={2} color="#ffffff" distance={20} angle={0.5} penumbra={1} />
            <spotLight position={[-10, 2, 5]} intensity={2} color="#4D7CFF" distance={20} angle={0.5} penumbra={1} />
         </group>
      ))}

      {/* Clean Reflective Studio Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <MeshReflectorMaterial
          blur={[200, 50]}
          resolution={256}
          mixBlur={1}
          mixStrength={25}
          roughness={0.9}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0f18"
          metalness={0.5}
        />
      </mesh>
      
      <fog attach="fog" args={['#05080c', 20, 70]} />

      {CARS.map((car, i) => (
         <GalleryItem key={i} car={car} />
      ))}
      
      {/* Effect Composer for Subtle Polish */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.4} />
      </EffectComposer>
    </>
  );
}

export default function CarGallery3D() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <section className="py-20 bg-[#010204]">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="font-display font-bold text-4xl text-white uppercase tracking-tighter mb-12">Elite Collection</h2>
           <div className="grid grid-cols-1 gap-16">
             {CARS.map((car, i) => (
               <div key={i} className="flex flex-col items-center">
                 <img src={car.file} alt={car.name} className="w-full rounded-[40px] mb-8 shadow-2xl border border-white/5" />
                 <h3 className="font-display font-bold text-3xl text-white tracking-tight mb-2">{car.name}</h3>
                 <p className="text-primary font-display font-bold text-2xl mb-4">{car.price}</p>
                 <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white/70 text-[10px] uppercase font-bold tracking-[0.3em] border border-white/10">{car.specs}</span>
               </div>
             ))}
           </div>
        </div>
      </section>
    );
  }

  return (
    <div id="gallery-scroll-container" className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#010204] gallery-canvas-wrapper">
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center p-6 opacity-0 gallery-intro-text">
           <h2 className="font-display font-bold text-[8vw] text-white/5 uppercase tracking-tighter mix-blend-overlay">The Collection</h2>
        </div>
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <GalleryScene />
          </Suspense>
        </Canvas>
        
        {/* Helper down arrow */}
        <div className="gallery-scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center animate-bounce z-30 pointer-events-none transition-opacity duration-500">
           <span className="text-[9px] uppercase tracking-[0.3em] font-bold mb-3">Scroll through gallery</span>
           <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </div>
  );
}
