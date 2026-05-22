import { useState } from 'react';
import { motion } from 'motion/react';
import { INVENTORY } from '@/src/constants';
import CarCard from '@/src/components/CarCard';

const CATEGORIES = ['ALL MODELS', 'ELECTRIC', 'GRAND TOURING', 'SUPER SPORT', 'LUXURY SUV'];

export default function CarInventory() {
  const [activeCategory, setActiveCategory] = useState('ALL MODELS');

  const filteredInventory = INVENTORY.filter(item => 
    activeCategory === 'ALL MODELS' || item.category === activeCategory.toLowerCase().replace(' ', '-')
  );

  const scrollToModels = () => {
    document.getElementById('inventory-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/inventory_hero.webp"
            className="w-full h-full object-cover brightness-[0.5] scale-110"
            alt="Hero Background"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-slate-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
              className="font-display font-bold text-[10vw] md:text-[7.5rem] leading-[0.85] text-white tracking-tighter mb-8 uppercase"
            >
              <motion.span 
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                Find your
              </motion.span>
              <br />
              <motion.span 
                className="inline-block text-primary"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                Dream
              </motion.span>{" "}
              <motion.span
                className="inline-block text-primary italic"
                variants={{
                  hidden: { opacity: 0, x: 80, skewX: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    skewX: 0, 
                    transition: { type: "spring", stiffness: 80, damping: 12, mass: 1 } 
                  }
                }}
                animate={{
                  scale: [1, 1.04, 0.98, 1.02, 1],
                  x: [0, -3, 3, -1, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut"
                }}
              >
                Car
              </motion.span>
            </motion.h1>
            <div className="mb-8">
              <button className="px-10 py-5 bg-white/90 backdrop-blur-md text-navy rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-white transition-all border border-white/20 uppercase">
                Sell your Car
              </button>
            </div>
            <p className="text-white/70 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              Discover premium vehicles tailored to your lifestyle. Performance, luxury, and reliability — all in one place.
            </p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={scrollToModels}
                className="px-10 py-5 bg-navy text-white rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-primary transition-all shadow-2xl shadow-black/20 uppercase"
              >
                [Get Started]
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section id="inventory-grid" className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-200 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                    activeCategory === cat 
                    ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
               <span>BRAND: ALL</span>
               <div className="w-px h-4 bg-slate-200" />
               <span>PRICE: HIGH TO LOW</span>
               <div className="w-px h-4 bg-slate-200" />
               <span className="text-navy">SHOWING 24 RESULTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pt-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 relative items-start">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredInventory.map((item) => (
                 <CarCard key={item.id} item={item} />
              ))}
              {filteredInventory.map((item) => (
                 <CarCard key={item.id + '_dup'} item={item} />
              ))}
            </div>
          </div>

          <aside className="hidden lg:block w-[340px] shrink-0 sticky top-40 h-[80vh]">
            <div className="w-full h-full rounded-[40px] overflow-hidden relative shadow-2xl group">
              <img 
                src="/nature_inspiration.webp" 
                alt="Nature Inspiration"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-12 left-10 right-10">
                <h3 className="text-white font-display font-bold text-4xl uppercase tracking-tighter mb-4 leading-[0.9]">
                  Inspired By <br/><span className="text-primary italic">Nature</span>
                </h3>
                <div className="w-8 h-1 bg-primary mb-6" />
                <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase leading-relaxed">
                  Experience the raw elements of motion through engineering precision
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-32 flex flex-col items-center">
           <button className="px-10 py-5 bg-white text-navy border border-slate-200 shadow-sm rounded-xl font-bold tracking-[0.15em] text-xs hover:bg-navy hover:text-white transition-all uppercase mb-4">
             EXPLORE MORE INVENTORY
           </button>
           <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">PAGE 1 OF 4</p>
        </div>
      </section>
    </div>
  );
}
