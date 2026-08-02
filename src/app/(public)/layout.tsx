import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowRight, MessageCircle, Globe, Mail } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-brand-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center group">
            <Logo height={36} className="group-hover:scale-105 transition-transform" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/about" className="hover:text-brand-600 transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-brand-600 transition-colors">Pricing</Link>
            <Link href="/developers" className="hover:text-brand-600 transition-colors">Developers</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/login" className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Get Started
            </Link>
          </div>
          
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 pt-20 relative z-10">
        {children}
      </div>

      {/* Premium Footer */}
      <footer className="bg-slate-900 pt-24 pb-12 border-t border-slate-800 text-slate-400 relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center mb-6">
                <Logo height={32} white className="opacity-90 hover:opacity-100 transition-opacity" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
                The financial operating system for modern global businesses. Built for scale, security, and speed.
              </p>
              
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all text-slate-400">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all text-slate-400">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all text-slate-400">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Products</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/dashboard/import" className="hover:text-white transition-colors">Import Payments</Link></li>
                <li><Link href="/dashboard/export" className="hover:text-white transition-colors">Export Receipts</Link></li>
                <li><Link href="/dashboard/wallets" className="hover:text-white transition-colors">EEFC Wallets</Link></li>
                <li><Link href="/dashboard/cards" className="hover:text-white transition-colors">Corporate Cards</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/dtaa" className="hover:text-white transition-colors">DTAA Compliance</Link></li>
              </ul>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2026 FrontierTech Pvt Ltd. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

