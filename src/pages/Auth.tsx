import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
    }

    // Simulate loading/API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // Store mock user in localStorage
      const displayName = isLogin ? (email.split('@')[0]) : name;
      const mockUser = {
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: email.toLowerCase(),
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));

      // Trigger custom storage event so Navbar updates immediately
      window.dispatchEvent(new Event('storage'));

      // Redirect after success animation
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#03050a] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-white/5 rounded-[32px] md:rounded-[48px] shadow-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] z-10">
        
        {/* Left Visual Side (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/luxury_car.webp" 
              alt="TurboTec Luxury" 
              className="w-full h-full object-cover opacity-35 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090d16]/20 via-[#090d16]/80 to-[#090d16] z-10" />
          </div>

          {/* Logo / Header */}
          <div className="relative z-20">
            <span className="inline-block bg-primary/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-white text-[9px] uppercase tracking-[0.3em] font-extrabold mb-4 border border-primary/30 shadow-[0_0_15px_rgba(77,124,255,0.25)]">
              TURBOTEC CLUB
            </span>
            <h2 className="font-display font-black text-4xl text-white uppercase tracking-tighter leading-none mt-2">
              ACCESS YOUR <br />
              <span className="text-primary italic">GARAGE</span>
            </h2>
          </div>

          {/* Copy */}
          <div className="relative z-20">
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
              Join our elite collective. Track your active rentals, manage customized vehicle configurations, and secure priority booking details.
            </p>
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider">
              <span>Experience speed</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center relative">
          
          <AnimatePresence mode="wait">
            {success ? (
              // Success Animation Screen
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-3xl text-white uppercase tracking-tight mb-2">
                  Access Granted
                </h3>
                <p className="text-white/50 text-sm">
                  Welcome to TurboTec. Initializing configuration deck...
                </p>
              </motion.div>
            ) : (
              // Login/Signup Form
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mode Selectors */}
                <div className="flex items-center space-x-8 mb-10 border-b border-white/5 pb-2">
                  <button 
                    onClick={() => { setIsLogin(true); setError(''); }}
                    className="relative pb-4 font-display font-bold text-sm uppercase tracking-widest outline-none cursor-pointer"
                  >
                    <span className={isLogin ? "text-white" : "text-white/40 hover:text-white/60 transition-colors"}>
                      Login
                    </span>
                    {isLogin && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      />
                    )}
                  </button>
                  <button 
                    onClick={() => { setIsLogin(false); setError(''); }}
                    className="relative pb-4 font-display font-bold text-sm uppercase tracking-widest outline-none cursor-pointer"
                  >
                    <span className={!isLogin ? "text-white" : "text-white/40 hover:text-white/60 transition-colors"}>
                      Register
                    </span>
                    {!isLogin && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      />
                    )}
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold"
                    >
                      {error}
                    </motion.div>
                  )}

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input 
                          type="text" 
                          placeholder="Alex Morgan"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isLoading}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-primary focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        type="email" 
                        placeholder="alex@turbotec.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-primary focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Password</label>
                      {isLogin && (
                        <button type="button" className="text-primary hover:text-blue-400 transition-colors text-[10px] uppercase font-bold tracking-wider">
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm outline-none focus:border-primary focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm outline-none focus:border-primary focus:bg-white/[0.04] transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 mt-4 bg-primary hover:bg-blue-600 active:bg-blue-700 disabled:opacity-55 disabled:cursor-not-allowed rounded-2xl text-white font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_25px_rgba(77,124,255,0.25)] flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>{isLogin ? 'Initialize Session' : 'Create Account'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
