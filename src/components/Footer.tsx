import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-center mb-10">
          <Link to="/" className="group block">
            <img 
              src="/logoha.webp" 
              alt="Turpotic Logo" 
              className="h-24 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
            />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-slate-500 font-bold mb-8">
          <span className="text-navy">SUPPORT</span>
          <span className="text-slate-300">|</span>
          <Link to="/car" className="hover:text-primary transition-colors">Sale</Link>
          <span className="text-slate-300">|</span>
          <button className="hover:text-primary transition-colors uppercase">Contact</button>
        </div>

        <div className="text-center mb-8">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-4">
            © 2026 TURPOTIC GALLERY. PRECISION MOTION DEFINED.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Redefining the automotive experience through curated excellence and technical precision.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-slate-500 font-bold">
          <Link to="/rent" className="hover:text-primary transition-colors">Rent</Link>
          <span className="text-slate-300">|</span>
          <button className="hover:text-primary transition-colors uppercase">Privacy Policy</button>
          <span className="text-slate-300">|</span>
          <Link to="/motorcycles" className="hover:text-primary transition-colors">Motorcycles</Link>
          <span className="text-slate-300">|</span>
          <button className="hover:text-primary transition-colors uppercase">Terms of service</button>
        </div>

      </div>
    </footer>
  );
}
