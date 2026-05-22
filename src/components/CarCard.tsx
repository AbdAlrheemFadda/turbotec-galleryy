import React from 'react';
import { motion } from 'motion/react';
import { type InventoryItem } from '@/src/constants';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CarCardProps {
  item: InventoryItem;
  type?: 'buy' | 'rent';
}

const CarCard: React.FC<CarCardProps> = ({ item, type = 'buy' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = '/classical.webp'; }}
        />
        {type !== 'rent' && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[12px] font-bold text-navy shadow-sm">
            ${item.price.toLocaleString()}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-navy tracking-tight">{item.name}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">{item.specs.color} | {item.specs.year}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-2 rounded-xl border border-slate-100 flex flex-col items-center">
            <span className="text-slate-400 text-[8px] uppercase tracking-tighter">0-100 KM/H</span>
            <span className="font-display font-bold text-sm">{item.specs.acceleration}</span>
          </div>
          <div className="bg-white p-2 rounded-xl border border-slate-100 flex flex-col items-center">
            <span className="text-slate-400 text-[8px] uppercase tracking-tighter">Horsepower</span>
            <span className="font-display font-bold text-sm">{item.specs.horsepower} HP</span>
          </div>
        </div>

        {type === 'rent' ? (
          <div className="flex flex-col space-y-4 mt-2">
            <div>
              <span className="text-2xl font-display font-bold text-navy">${item.rentPrice} PER DAY</span>
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest space-y-2">
              <p>WEEKLY RATE: $2,800 / wk</p>
              <p>TRANSMISSION: PDK Auto</p>
              <p>{item.specs.color} | {item.specs.year}</p>
            </div>
            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">SELECT DURATION:</p>
              <div className="flex space-x-2">
                {['Daily', 'Weekly', 'Monthly'].map((d, idx) => (
                  <button key={d} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all duration-300 ${idx === 0 ? 'bg-navy text-white shadow-md' : 'border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-navy hover:border-slate-300'}`}>
                    [{d}]
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <Link 
                to="/checkout"
                className="w-full py-4 bg-navy text-white rounded-xl font-bold text-xs hover:bg-primary transition-all text-center block shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)] duration-300 relative overflow-hidden group/btn"
              >
                <span className="relative z-10">[RENT NOW]</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
            </div>
          </div>
        ) : (
          <Link
            to={`/car/${item.id}`}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 hover:bg-primary transition-all group/btn"
          >
            <span>VIEW DETAILS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default CarCard;
