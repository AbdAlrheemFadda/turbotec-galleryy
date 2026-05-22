import { ASSETS, INVENTORY } from '@/src/constants';
import CarCard from '@/src/components/CarCard';
import { motion } from 'motion/react';

export default function Rent() {
  const scrollToFleet = () => {
    document.getElementById('rent-fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img
            src="/rent_hero.webp"
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero Background"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/20 to-slate-50" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-8 border border-white/20">
              PREMIUM PERFORMANCE FLEET
            </span>
            <h1 className="font-display font-bold text-[10vw] md:text-[7.5rem] leading-[0.85] text-white tracking-tighter mb-8 uppercase">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                  }
                }}
              >
                {"Rent the ".split('').map((char, i) => (
                  <motion.span key={`r-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
                ))}
                <br />
                <span className="inline-flex whitespace-nowrap text-primary italic">
                  {"Extraordinar".split('').map((char, i) => (
                    <motion.span key={`e-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
                  ))}
                  <motion.span 
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, rotate: -1080, scale: 0.5 },
                      visible: { 
                        opacity: 1, 
                        rotate: 0, 
                        scale: 1,
                        transition: { type: "spring", stiffness: 120, damping: 12, mass: 1 }
                      }
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    y
                  </motion.span>
                </span>
              </motion.div>
            </h1>
            <motion.p 
              className="text-white/70 text-lg mb-12 max-w-lg leading-relaxed font-medium"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.02, delayChildren: 1.5 }
                }
              }}
            >
              {"A curated gallery of automotive masterpieces. Where engineering excellence meets unparalleled aesthetic design.".split('').map((char, i) => (
                <motion.span key={`p-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
              ))}
            </motion.p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={scrollToFleet}
                className="px-10 py-5 bg-navy text-white rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-primary hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-primary/40 uppercase"
              >
                [Explore Fleet]
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold text-xs tracking-[0.15em] hover:bg-white hover:text-navy hover:-translate-y-1 transition-all duration-300 border border-white/20 uppercase shadow-lg">
                [View Concierge]
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section id="rent-fleet" className="pt-24 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center mb-16 bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-slate-200/50 rounded-full px-8 py-4 gap-4"
        >
          <div className="flex flex-wrap gap-2">
             {['ALL VEHICLES', 'SPORT', 'EXECUTIVE', 'OFF-ROAD'].map((tab, idx) => (
               <button key={tab} className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all duration-300 ${idx === 0 ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'bg-transparent text-slate-500 hover:bg-white hover:shadow-sm'}`}>
                 {tab}
               </button>
             ))}
          </div>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">SHOWING 24 RESULTS</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {INVENTORY.filter(i => !!i.rentPrice).map((item) => (
            <CarCard key={item.id} item={item} type="rent" />
          ))}
           {INVENTORY.filter(i => !!i.rentPrice).map((item) => (
            <CarCard key={item.id + '_rent_dup'} item={item} type="rent" />
          ))}
        </div>
      </section>

      {/* Why Us section */}
      <section className="mt-32 max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-white/60 backdrop-blur-xl rounded-[60px] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 shadow-2xl shadow-slate-200/50 hover:shadow-[0_40px_100px_rgba(226,232,240,0.8)] transition-shadow duration-700 border border-slate-100/50">
           <div className="md:w-1/2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold text-5xl text-navy uppercase tracking-tighter mb-10"
              >
                Why rent from <br /> the gallery?
              </motion.h2>
              <div className="space-y-12">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="flex items-start space-x-6"
                 >
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-primary" />
                   </div>
                   <div>
                      <h4 className="font-display font-bold text-lg text-navy uppercase mb-1">Full Coverage</h4>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-xs font-medium">Comprehensive premium insurance included with every high-end rental.</p>
                   </div>
                 </motion.div>
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="flex items-start space-x-6"
                 >
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-primary" />
                   </div>
                   <div>
                      <h4 className="font-display font-bold text-lg text-navy uppercase mb-1">Concierge Delivery</h4>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-xs font-medium">We deliver your vehicle to your doorstep or airport terminal.</p>
                   </div>
                 </motion.div>
              </div>
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="md:w-1/2 bg-navy rounded-3xl p-10 shadow-xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <p className="text-white/80 text-sm italic font-medium leading-relaxed mb-12 relative z-10">
                Our vehicles are more than machines — they are curated experiences. Each rental undergoes a 120-point precision check to ensure absolute performance and aesthetic perfection.
              </p>
              <button className="text-white font-display font-bold text-xs border-b border-white/30 uppercase tracking-[0.2em] hover:tracking-[0.3em] hover:border-white transition-all relative z-10">
                [LEARN ABOUT OUR STANDARDS]
              </button>
           </motion.div>
        </div>
      </section>
    </div>
  );
}
