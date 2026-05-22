import { useState } from 'react';
import { motion } from 'motion/react';
import { MOTORCYCLES } from '@/src/constants';
import CarCard from '@/src/components/CarCard';

const CATEGORIES = ['ALL MODELS', 'SUPER SPORT', 'STREET / NAKED', 'CUSTOM'];

const MOTO_CATEGORIES: Record<string, string> = {
  'm1': 'CUSTOM',
  'm2': 'STREET / NAKED',
  'm3': 'SUPER SPORT',
  'm4': 'STREET / NAKED',
  'm5': 'SUPER SPORT',
  'm6': 'SUPER SPORT',
};

export default function MotorcyclesInventory() {
  const [activeCategory, setActiveCategory] = useState('ALL MODELS');

  const scrollToGrid = () => {
    document.getElementById('moto-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredMotorcycles = activeCategory === 'ALL MODELS'
    ? MOTORCYCLES
    : MOTORCYCLES.filter(item => MOTO_CATEGORIES[item.id] === activeCategory);

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/moto_hero.webp"
            className="w-full h-full object-cover brightness-[0.4] scale-110"
            alt="Hero Background"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-slate-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-8 border border-white/20">
              The Collection
            </span>
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                }
              }}
              className="font-display font-bold text-[8vw] md:text-[5.5rem] leading-[0.85] text-white tracking-tighter mb-8 uppercase"
            >
              <div className="block overflow-hidden">
                {"PRECISION".split('').map((char, i) => (
                  <motion.span 
                    key={`h1-${i}`} 
                    className="inline-block"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="block overflow-hidden text-primary italic whitespace-nowrap">
                {"EXTRAORDINARY".split('').map((char, i) => (
                  <motion.span 
                    key={`h2-${i}`} 
                    className="inline-block"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
            <motion.p 
              className="text-white/70 text-lg mb-12 max-w-lg leading-relaxed font-medium"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 1.5 }
                }
              }}
            >
              {"Curated selection of performance engineering and timeless aesthetics. From Italian speedsters to custom cruisers.".split(' ').map((word, i) => (
                <motion.span 
                  key={`p-${i}`} 
                  className="inline-block mr-[0.25em]"
                  variants={{ hidden: { opacity: 0, y: 10, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } } }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={scrollToGrid}
                className="px-10 py-5 bg-navy text-white rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-primary transition-all shadow-2xl shadow-black/20 uppercase"
              >
                Explore Inventory
              </button>
              <button className="px-10 py-5 bg-white/90 backdrop-blur-md text-navy rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-white transition-all border border-white/20 uppercase">
                Sell your Motorcycle
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section id="moto-grid" className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-slate-200 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                    cat === activeCategory
                    ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
               <span>Brand: All</span>
               <div className="w-px h-4 bg-slate-200" />
               <span>Price: High to Low</span>
               <div className="w-px h-4 bg-slate-200" />
               <span className="text-navy">Showing {filteredMotorcycles.length} Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pt-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMotorcycles.map((item) => (
             <CarCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center">
           <button className="px-10 py-5 bg-white text-navy border border-slate-200 shadow-sm rounded-xl font-bold tracking-[0.15em] text-xs hover:bg-navy hover:text-white transition-all uppercase mb-4">
             Explore More Inventory
           </button>
           <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Page 1 of 1</p>
        </div>
      </section>
    </div>
  );
}
