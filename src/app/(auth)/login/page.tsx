"use client";
import { useState } from 'react';
import Logo from '@/components/Logo';
import { ArrowRight, Loader2, Key } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Fake login delay for presentation
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 selection:bg-brand-500/30">
      {/* Background Animated Blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-brand-100/60 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-md p-10 z-10 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center justify-center">
            <Logo height={48} />
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-2">Welcome back</h1>
        <p className="text-slate-500 text-center text-sm mb-8">Enter your corporate credentials to access the treasury.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Corporate Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium" 
              placeholder="founder@company.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-900">Password</label>
              <Link href="#" className="text-brand-600 text-sm font-bold hover:text-brand-700 transition-colors">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium font-mono tracking-widest" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In securely <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
            Protected by bank-grade encryption <Key className="w-3.5 h-3.5" />
          </p>
        </div>
      </div>
    </div>
  );
}
