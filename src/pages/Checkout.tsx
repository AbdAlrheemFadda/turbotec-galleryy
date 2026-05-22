import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, CheckCircle, Banknote, Wallet } from 'lucide-react';
import { ASSETS } from '@/src/constants';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-12 text-center border border-slate-100 shadow-2xl shadow-slate-200"
        >
          <div className="w-24 h-24 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-8">
             <CheckCircle className="w-12 h-12 text-navy" />
          </div>
          <h2 className="font-display font-bold text-4xl text-navy uppercase tracking-tighter mb-4">Payment Success</h2>
          <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
            Your transaction has been processed. A concierge representative will contact you within the next 24 hours to finalize delivery.
          </p>
          <Link to="/" className="inline-block w-full py-5 bg-navy text-white rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all text-xs">
            Return to Gallery
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-2">Secure Checkout</p>
          <h1 className="font-display font-bold text-6xl text-navy uppercase tracking-tighter">Confirm Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div className="flex items-center space-x-4 mb-10 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <Lock className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-navy">Secure Encryption</h4>
                  <p className="text-slate-500 text-[10px]">Your payment data is protected by bank-level SSL encryption.</p>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'Credit Card', icon: CreditCard },
                      { id: 'Debit Card', icon: Wallet },
                      { id: 'Cash', icon: Banknote }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                          paymentMethod === method.id 
                          ? 'border-navy bg-navy/5 text-navy' 
                          : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <method.icon className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{method.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payment Amount</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-grow">
                      <input 
                        type="text" 
                        defaultValue="147,420.00"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-lg font-bold text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all font-mono"
                      />
                    </div>
                    <select className="bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-bold text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all uppercase appearance-none">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>

                {paymentMethod !== 'Cash' && (
                  <div className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cardholder Name</label>
                      <input 
                        type="text" 
                        placeholder="ALEXANDER KINETIC"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 2531"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all font-mono"
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM / YY"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">CVV / CVC</label>
                        <input 
                          type="password" 
                          placeholder="***"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button className="w-full py-6 bg-navy text-white rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all shadow-xl shadow-navy/20 text-xs mt-8">
                  Confirm order
                </button>
              </form>
              
              <p className="text-center mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Transaction processed by PRECISION SECURE SYSTEMS INC.
              </p>
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-32">
              <div className="aspect-[4/3] relative">
                 <img src={ASSETS.carHero} className="w-full h-full object-cover" alt="Selected Car" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = '/classical.webp'; }} />
                 <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-navy text-[8px] font-bold uppercase tracking-[0.2em] shadow-sm">
                      Premium Fleet
                    </span>
                 </div>
              </div>
              <div className="p-10">
                <h3 className="font-display font-bold text-3xl text-navy uppercase mb-1 tracking-tighter">RS E-TRON GT</h3>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-10 italic">Heritage Silver | 2024</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Vehicle Base Price</span>
                    <span className="text-navy">$124,500.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Carbon Package Upgrade</span>
                    <span className="text-navy">$12,000.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Estimated Tax (8%)</span>
                    <span className="text-navy">$10,920.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Shipping & Handling</span>
                    <span className="text-primary">Free</span>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-end">
                   <div>
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Total Investment</p>
                      <h2 className="text-4xl font-display font-bold tracking-tighter text-navy">$147,420.00</h2>
                   </div>
                   <div className="bg-navy text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest">
                     USD
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
