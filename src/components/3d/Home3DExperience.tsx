import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import Scene, { carState } from './Scene';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center min-w-[300px]">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/10 relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-500 shadow-[0_0_15px_rgba(77,124,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          <p className="text-white text-[10px] font-black tracking-[0.4em] uppercase opacity-80">
            Initializing <span className="text-primary italic">Experience</span> {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </Html>
  );
}

export default function Home3DExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [debugParams, setDebugParams] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    const hasDebugParam = window.location.search.includes('debug');
    const isDev = (import.meta as any).env?.DEV;
    if (hasDebugParam || isDev) {
      setShowDebug(true);
      const saved = localStorage.getItem('car_debug_params');
      if (saved) {
        try {
          setDebugParams(JSON.parse(saved));
        } catch (e) {
          setDebugParams({
            posX: 0,
            posY: -3.2,
            posZ: 0.2,
            scale: 0.90,
            rotY: Math.PI - 0.45,
            shadowPosY: -3.2,
            shadowScale: 14,
            shadowBlur: 1.2,
            shadowOpacity: 1.0
          });
        }
      } else {
        setDebugParams({
          posX: 0,
          posY: -3.2,
          posZ: 0.2,
          scale: 0.90,
          rotY: Math.PI - 0.45,
          shadowPosY: -3.2,
          shadowScale: 14,
          shadowBlur: 1.2,
          shadowOpacity: 1.0
        });
      }
    }
  }, []);

  const handleDebugChange = (key: string, value: number) => {
    const updated = { ...debugParams, [key]: value };
    setDebugParams(updated);
    localStorage.setItem('car_debug_params', JSON.stringify(updated));
  };

  const resetDebugParams = () => {
    const defaults = {
      posX: 0,
      posY: -3.2,
      posZ: 0.2,
      scale: 0.90,
      rotY: Math.PI - 0.45,
      shadowPosY: -3.2,
      shadowScale: 14,
      shadowBlur: 1.2,
      shadowOpacity: 1.0
    };
    setDebugParams(defaults);
    localStorage.setItem('car_debug_params', JSON.stringify(defaults));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      // Ambient background parallax zoom simulation on scroll (Soft zoom for high-fidelity)
      tl.fromTo(bgRef.current, { scale: 1.05 }, { scale: 1.18, duration: 20.0, ease: 'none' }, 0);


      
      // Phase 2 Overlay (Side Profile)
      tl.fromTo('.anim-side', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2);
      tl.to('.anim-side', { opacity: 0, y: -20, duration: 0.5 }, 3.8);
      
      // Phase 5 Overlay (CAD Disassembly)
      tl.fromTo('.anim-disassembly', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 7.5);
      tl.to('.anim-disassembly', { opacity: 0, y: -20, duration: 0.5 }, 14.5);

      // Phase 6 Overlay (Reassembly)
      tl.fromTo('.anim-reassembly', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 15.2);
      tl.to('.anim-reassembly', { opacity: 0, y: -20, duration: 0.5 }, 19.5);

      tl.to('.canvas-wrapper', { opacity: 0, duration: 1.0 }, 20.0);
      tl.set('.canvas-wrapper', { pointerEvents: 'none' }, 21.0);

      // Smooth mouse-parallax translation to sync with 3D scene camera movement
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        if (canvasWrapperRef.current) {
          gsap.to(canvasWrapperRef.current, {
            x: -x * 55,
            y: -y * 35,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });
    return () => mm.revert();
  }, [isMobile]);

  /* ── Mobile fallback ─────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section className="relative h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.webp"
            className="w-full h-full object-cover brightness-[0.4] scale-105"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-white" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/5 backdrop-blur-lg px-5 py-1.5 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-8 border border-white/10 shadow-xl">
              Evolution of Speed
            </span>
            <h1 className="font-display font-bold text-[10vw] leading-[0.85] text-white tracking-tighter mb-8 uppercase">
              PRECISION <br />
              <span className="text-primary italic">MOTION</span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────────────────── */
  return (
    <div id="scroll-container" ref={containerRef} className="relative w-full" style={{ height: '900vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#060810]">



        {/* Cinematic CSS atmosphere on top of the 3D canvas (Soften vignettes completely to make background crystal clear & bright) */}
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {/* Subtle top vignette for text readability */}
          <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-[#060810]/30 to-transparent" />
          {/* Soft side vignettes */}
          <div className="absolute left-0 top-0 bottom-0 w-[4%] bg-gradient-to-r from-[#060810]/25 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[4%] bg-gradient-to-l from-[#060810]/25 to-transparent" />
        </div>

        {/* Three.js canvas (contains arc cars + hero Ferrari) */}
        <div 
          ref={canvasWrapperRef} 
          className="canvas-wrapper absolute inset-0 z-[1] opacity-100"
        >
          {/* Free background for 3D car with parallax ref */}
          <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none opacity-100 transform-gpu bg-[#060810]" style={{ transform: 'scale(1.05)' }}>
            {/* Softest gradient overlay for header/footer blending, center remains 100% clear */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#060810]/10 via-transparent to-[#060810]/5" />
          </div>
          <Canvas shadows dpr={[1, 2]}>
            <Suspense fallback={null}>
              <Scene debugParams={debugParams} />
            </Suspense>
          </Canvas>
          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-navy via-navy/60 to-transparent z-10" />
        </div>

        {/* Overlay text panels */}
        <div className="absolute inset-0 z-[4] pointer-events-none max-w-7xl mx-auto px-6">


          {/* 2. Side Profile */}
          <div className="anim-side absolute top-1/3 right-6 w-full max-w-md opacity-0 text-right">
            <h2 className="font-display font-bold text-5xl text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              Sculpted by <br /><span className="text-primary">Aerodynamics</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed font-medium backdrop-blur-2xl bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              Every surface is engineered to slice through the air with zero resistance. A masterpiece of fluid dynamics and raw power.
            </p>
          </div>

          {/* 3. Disassembly Section */}
          <div className="anim-disassembly absolute top-1/3 left-6 w-full max-w-md opacity-0">
            <span className="inline-block bg-primary/20 backdrop-blur-xl px-5 py-2 rounded-full text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-6 border border-primary/30">
              Exploded CAD View
            </span>
            <h2 className="font-display font-bold text-5xl text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              Engineering <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Dissected</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed font-medium backdrop-blur-2xl bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              Witness the pure internal mechanics. The carbon monocoque chassis, active rear axle, high-output drivetrain, and F1 cockpit separate outwards along physical vectors to showcase the structural core.
            </p>
          </div>

          {/* 4. Reassembly Section */}
          <div className="anim-reassembly absolute top-1/3 right-6 w-full max-w-md opacity-0 text-right">
            <span className="inline-block bg-emerald-500/20 backdrop-blur-xl px-5 py-2 rounded-full text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 border border-emerald-500/30">
              Cohesion & Unity
            </span>
            <h2 className="font-display font-bold text-5xl text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
              Seamless <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Synthesis</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed font-medium backdrop-blur-2xl bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              With absolute structural coherence, the high-performance subassemblies reunite. Witness the convergence of elite carbon dynamics, active thermal sealing, and hybrid synergy back into a singular, flawless envelope.
            </p>
          </div>

        </div>

        {/* Scroll indicator - z-[35] so it is visible in both Phase 1 and Phase 2/3 */}
        <div className="home-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-[35] pointer-events-none transition-opacity duration-1000">
          <span className="text-white/50 text-[9px] uppercase tracking-[0.35em] font-bold mb-3">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

      </div>

    </div>
  );
}
