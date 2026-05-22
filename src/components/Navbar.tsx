import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Menu, X, ArrowRight, Zap, Car, TrendingUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Car', path: '/car' },
  { name: 'Rent', path: '/rent' },
  { name: 'Motorcycles', path: '/motorcycles' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkUser = () => {
    const saved = localStorage.getItem('mock_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mock_user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHome = location.pathname === '/';
  
  // On home, the first 900vh (400vh Home3D + 500vh Gallery3D) is the dark 3D scene
  const isDarkSection = isHome && (window.scrollY < window.innerHeight * 8.5);

  // Determine text and background colors based on section and scroll
  const navBg = isDarkSection
    ? 'bg-[#020308]/95 border-white/5' 
    : 'bg-white/90 border-slate-100 shadow-sm';
    
  const textColor = isDarkSection ? 'text-white' : 'text-navy';
  const linkColor = isDarkSection ? 'text-white/60' : 'text-slate-500';
  const iconColor = isDarkSection ? 'text-white' : 'text-slate-600';

  return (
    <nav className={cn("fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-500", navBg)}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group -ml-4">
          <img 
            src="/logoha.webp" 
            alt="Turpotic Logo" 
            className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-2xl translate-y-3" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-all hover:text-primary relative py-2",
                location.pathname === link.path ? "text-primary" : linkColor
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className={cn("transition-colors hover:text-primary", iconColor)}
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/checkout" className={cn("transition-colors relative hover:text-primary", iconColor)}>
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
              1
            </span>
          </Link>
          
          {user ? (
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold flex items-center justify-center text-xs uppercase hover:bg-primary/35 transition-all shadow-[0_0_15px_rgba(77,124,255,0.15)] outline-none cursor-pointer"
              >
                {user.name.charAt(0)}
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={cn(
                      "absolute right-0 mt-3 w-48 rounded-2xl border p-2 shadow-xl z-50 backdrop-blur-xl flex flex-col space-y-1",
                      isDarkSection ? "bg-[#090d16]/95 border-white/5" : "bg-white/95 border-slate-100"
                    )}
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className={cn("text-xs font-bold truncate", isDarkSection ? "text-white" : "text-navy")}>{user.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setIsDropdownOpen(false); navigate('/car'); }}
                      className={cn("w-full text-left px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer", isDarkSection ? "text-white/80 hover:text-white" : "text-navy/80 hover:text-navy")}
                    >
                      My Garage
                    </button>
                    <button 
                      onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                      className="w-full text-left px-4 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth" className={cn("hidden sm:block transition-colors hover:text-primary", iconColor)}>
              <User className="w-5 h-5" />
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("md:hidden transition-colors hover:text-primary", iconColor)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 md:hidden z-40 p-6 flex flex-col space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-bold uppercase tracking-widest",
                  location.pathname === link.path ? "text-primary" : "text-navy"
                )}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold flex items-center justify-center text-sm uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                  className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="pt-4 border-t border-slate-100 text-lg font-bold uppercase tracking-widest text-primary flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Login / Register</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto"
            style={{ background: 'radial-gradient(ellipse at 60% 20%, rgba(77,124,255,0.08) 0%, transparent 60%), #020511' }}
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(77,124,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(77,124,255,0.04) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />

            {/* Top bar */}
            <div className="relative flex items-center justify-between px-8 md:px-16 h-20 border-b border-white/5 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Search className="w-3 h-3 text-primary" />
                </div>
                <span className="text-white/40 text-xs uppercase tracking-[0.25em] font-bold">TurboTec Search</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-4"
              >
                <span className="hidden md:flex items-center space-x-1 text-white/20 text-[10px] font-mono">
                  <kbd className="px-2 py-0.5 rounded border border-white/10 bg-white/5">ESC</kbd>
                  <span>to close</span>
                </span>
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* Main search area */}
            <div className="relative flex-1 flex flex-col items-center justify-start px-6 md:px-16 pt-16 pb-16 max-w-5xl mx-auto w-full">
              {/* Glow behind input */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-primary text-[10px] font-extrabold uppercase tracking-[0.4em] mb-6 text-center"
              >
                ⚡ Global Search
              </motion.p>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 22 }}
                className="w-full relative"
              >
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 text-white/20" />
                <input
                  ref={searchInputRef}
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search model, brand, spec..."
                  className="w-full bg-transparent border-b-2 border-white/10 py-6 pl-12 pr-6 text-3xl md:text-5xl text-white font-display font-bold outline-none focus:border-primary transition-all duration-300 placeholder:text-white/10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </motion.div>

              {/* Trending tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-10"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Trending</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Carrera GT', 'Aventador SVJ', 'Electric SUV', 'Mclaren 720S', 'Super Sport', 'AMG GT'].map((tag, i) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.32 + i * 0.04 }}
                      onClick={() => setSearchQuery(tag)}
                      className="group px-4 py-2 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-primary/10 hover:border-primary/30 text-white/40 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
                    >
                      <span className="text-primary/50 group-hover:text-primary transition-colors">#</span>
                      <span>{tag}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.45 }}
                className="w-full h-px bg-white/5 my-10 origin-left"
              />

              {/* Quick-access category cards */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full"
              >
                <div className="flex items-center space-x-2 mb-5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Quick Access</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Car Inventory', sub: 'Browse all vehicles', path: '/car', icon: Car },
                    { label: 'Rent a Car', sub: 'Short & long term rentals', path: '/rent', icon: Zap },
                    { label: 'Motorcycles', sub: 'Performance bikes', path: '/motorcycles', icon: TrendingUp },
                  ].map(({ label, sub, path, icon: Icon }, i) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.52 + i * 0.06 }}
                    >
                      <Link
                        to={path}
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        className="group flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-primary/8 hover:border-primary/20 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-bold">{label}</p>
                            <p className="text-white/30 text-[11px]">{sub}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
