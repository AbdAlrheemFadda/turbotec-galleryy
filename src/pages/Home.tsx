import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS, INVENTORY } from '@/src/constants';
import MusicPlayer from '@/src/components/MusicPlayer';

const Home3DExperience = React.lazy(() => import('@/src/components/3d/Home3DExperience'));
const CarGallery3D = React.lazy(() => import('@/src/components/3d/CarGallery3D'));

function TopHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#060810]">
      {/* Background Image - With pleasant lighting enhancement */}
      <img
        src="/hero.webp"
        alt="Hero"
        className="w-full h-full object-cover scale-[1.03] contrast-105 brightness-110 saturate-110"
      />
      {/* Custom luxurious softer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060810]/10 to-[#060810]/90 z-10 pointer-events-none" />

      {/* Static Typography */}
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 pointer-events-none">
        <div className="absolute top-[12%] left-6 w-full max-w-2xl">
          <span className="inline-block bg-primary/35 backdrop-blur-xl px-6 py-2 rounded-full text-white text-[11px] uppercase tracking-[0.4em] font-extrabold mb-6 border border-primary/50 shadow-[0_0_25px_rgba(77,124,255,0.4)]">
            The Pinnacle of Engineering
          </span>
          <h1 className="font-display font-bold text-5xl lg:text-[5.2rem] leading-[0.8] text-white tracking-tighter mb-6 uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            PRECISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">MOTION</span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="home-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-[35] pointer-events-none">
        <span className="text-white/50 text-[9px] uppercase tracking-[0.35em] font-bold mb-3">Scroll to begin</span>
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{ height: '900vh' }} className="relative bg-[#060810]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#060810]" />
    </div>
  );
}

export default function Home() {
  const featuredCar = INVENTORY[5]; // Lamborghini
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thresholds to mount/unmount 3D sections for performance
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const showHero = scrollY < vh * 13.5; // Extended scroll threshold to match the 900vh height
  const showGallery = scrollY > vh * 8.5 && scrollY < vh * 18.5; // Shifted gallery thresholds up to buffer correctly

  return (
    <div className="bg-navy min-h-screen">
      <MusicPlayer />
      <TopHero />
      {showHero ? (
        <Suspense fallback={<LoadingFallback />}>
          <Home3DExperience />
        </Suspense>
      ) : (
        <div style={{ height: '900vh' }} />
      )}

      {/* NEW PREMIUM SPLIT LAYOUT */}
      <section className="relative bg-[#010204] min-h-screen flex items-center overflow-hidden py-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-[#010204] to-purple-900/10 opacity-60" />
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col items-start space-y-8">
            <h2 className="font-display font-bold text-6xl lg:text-8xl text-white uppercase tracking-tighter leading-[0.9]">
              UNLEASH THE <br />
              <span className="text-primary italic">ADRENALINE</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-medium max-w-md">
              When two wheels meet infinite road. Experience the ultimate connection between rider and machine.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                Discover the Ride
              </button>
              <button className="px-8 py-4 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-primary font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(77,124,255,0.15)]">
                Book a Test Ride
              </button>
            </div>
          </div>
          {/* Right Image - 3D Card Flip */}
          <div className="relative aspect-[4/3] w-full group [perspective:2000px]">
            {/* Inner Flip Container */}
            <div className="relative w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 [backface-visibility:hidden]">
                <img 
                  src="/luxury_motorcycle.webp" 
                  alt="Luxury Motorcycle" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-transparent to-transparent opacity-80 pointer-events-none z-10" />
              </div>
              {/* Back Face */}
              <div className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <img 
                  src="/moto_hero.webp" 
                  alt="Moto Hero" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-transparent to-transparent opacity-80 pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showGallery ? (
        <Suspense fallback={<div style={{ height: '500vh', backgroundColor: '#030508' }} />}>
          <CarGallery3D />
        </Suspense>
      ) : (
        <div style={{ height: '500vh' }} />
      )}

      {/* Path Selector */}
      <section className="relative z-10 py-32 bg-white rounded-t-[100px] -mt-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-6xl text-navy uppercase tracking-tighter mb-6">SELECT YOUR PATH</h2>
            <p className="text-slate-400 text-sm uppercase tracking-[0.4em] font-bold">Tailored experiences for every enthusiast</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Buy', sub: 'invest in timeless engineering', img: '/path_left.webp', path: '/car', color: 'from-blue-600/40' },
              { name: 'Rent', sub: 'the thrill, on your terms', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80', path: '/rent', color: 'from-primary/40' },
              { name: 'Motorcycles', sub: 'two wheels, pure adrenaline', img: '/path_right.webp', path: '/motorcycles', color: 'from-purple-600/40' }
            ].map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="group relative aspect-[3/4] rounded-[64px] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:shadow-primary/20"
              >
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={item.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-16 left-12 right-12 text-white">
                  <h3 className="font-display font-bold text-5xl mb-3 italic tracking-tighter leading-none">{item.name}</h3>
                  <p className="text-white/70 text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">{item.sub}</p>
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center group-hover:bg-primary transition-all border border-white/20">
                    <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="relative z-10 py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
            <h2 className="font-display font-bold text-7xl text-navy uppercase tracking-tighter text-center md:text-left">Featured Gallery.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Lg Item */}
            <div className="lg:col-span-8 relative aspect-[16/9] rounded-[64px] overflow-hidden group shadow-3xl">
              <Link to={`/car/${featuredCar.id}`}>
                <img
                  src="/featured_lambo.webp"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Featured Car"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute top-10 right-10">
                  <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-[0.3em] shadow-xl">
                    NEW ARRIVAL
                  </span>
                </div>
                <div className="absolute bottom-16 left-16 text-white">
                  <h3 className="font-display font-bold text-6xl uppercase mb-4 tracking-tighter leading-none">{featuredCar.name}</h3>
                  <div className="flex items-center space-x-8 text-white/60 text-xs font-bold uppercase tracking-[0.25em]">
                    <span className="flex items-center"><Zap className="w-4 h-4 mr-2 text-primary" /> 330 KM/H | ELECTRIC</span>
                    <span className="text-white text-3xl font-display font-black tracking-tighter">${featuredCar.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Card */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <Link
                to="/motorcycles"
                className="bg-white rounded-[64px] p-12 border border-slate-100 flex flex-col group cursor-pointer hover:shadow-3xl transition-all relative overflow-hidden"
              >
                <div className="absolute top-8 right-8 z-10" />
                <div className="aspect-video rounded-[40px] overflow-hidden mb-10 shadow-2xl">
                  <img
                    src="/featured_phantom.webp"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Side motorcycle"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-2xl text-navy uppercase mb-2 tracking-tight">PHANTOM X-Rider</h4>
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-8 italic">Custom built urban performance.</p>
                  <p className="text-primary font-display font-bold text-3xl tracking-tighter">$32,500</p>
                </div>
              </Link>

              <div className="bg-navy rounded-[64px] p-12 flex flex-col justify-center items-center text-center group shadow-2xl flex-grow relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="font-display font-bold text-2xl text-white uppercase mb-4 tracking-tighter relative z-10">VINTAGE PRESTIGE</h4>
                <p className="text-white/50 text-[10px] mb-10 uppercase font-bold tracking-[0.3em] relative z-10">Certified 1968 restorations.</p>
                <Link to="/car" className="relative z-10 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:border-primary transition-all">
                  [VIEW COLLECTION]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
