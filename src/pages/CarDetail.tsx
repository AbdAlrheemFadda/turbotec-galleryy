import { useParams, Link } from 'react-router-dom';
import { INVENTORY } from '@/src/constants';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Shield, ChevronRight } from 'lucide-react';

export default function CarDetail() {
  const { id } = useParams();
  const car = INVENTORY.find(item => item.id === id);

  if (!car) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-navy mb-4">Vehicle Not Found</h2>
        <Link to="/car" className="text-primary font-bold hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header / Nav Back */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/car" className="inline-flex items-center text-slate-400 hover:text-navy transition-colors text-xs font-bold uppercase tracking-widest">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-[16/10] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 group">
             <img 
               src={car.image} 
               alt={car.name} 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
               referrerPolicy="no-referrer"
               onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
             />
          </div>
          <div className="grid grid-cols-3 gap-6">
             {[1, 2, 3].map(i => (
               <div key={i} className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer hover:border-primary transition-colors">
                  <img src={car.image} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="Detail" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = '/classical.webp'; }} />
               </div>
             ))}
          </div>
        </motion.div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
               {car.category.replace('-', ' ')}
            </span>
            <h1 className="font-display font-black text-6xl text-navy uppercase tracking-tighter mb-4 leading-none">
               {car.name}
            </h1>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest italic mb-6">
               {car.specs.color} Edition | Model {car.specs.year}
            </p>
            <div className="text-4xl font-display font-black text-primary">
               ${car.price.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {[
              { label: '0-100 KM/H', value: car.specs.acceleration, icon: Zap },
              { label: 'Horsepower', value: `${car.specs.horsepower} HP`, icon: Shield },
              { label: 'Top Speed', value: '330 KM/H', icon: Zap },
              { label: 'Efficiency', value: '92%', icon: Shield }
            ].map((spec, i) => (
              <div key={i} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200">
                   <spec.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{spec.label}</p>
                   <p className="text-sm font-display font-extrabold text-navy uppercase">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
             <Link to="/checkout" className="w-full py-6 bg-navy text-white rounded-2xl font-display font-black tracking-[0.2em] uppercase hover:bg-primary transition-all shadow-xl shadow-navy/20 flex items-center justify-center space-x-3">
               <span>Acquire Vehicle</span>
               <ChevronRight className="w-5 h-5" />
             </Link>
             <Link to="/checkout" className="w-full py-6 border-2 border-slate-100 text-navy rounded-2xl font-display font-black tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all flex items-center justify-center">
                Configure Order
             </Link>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
             <h4 className="font-display font-bold text-xs uppercase tracking-widest text-navy mb-4">Concierge Notes</h4>
             <p className="text-slate-500 text-xs leading-relaxed italic">
                "Each vehicle in our collection is meticulously inspected and verified by our master technicians. This {car.name} represents the pinnacle of its class, offering uncompromising speed and curated luxury."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
