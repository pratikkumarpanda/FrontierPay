"use client";
import { useState } from 'react';
import Image from 'next/image';
import logoImg from '../../../../public/logo.png';
import { ArrowRight, Loader2, Key } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Owner' | 'Admin'>('Owner');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save credentials to local storage for the mock context to pick up
    localStorage.setItem('frontier_user_name', name);
    localStorage.setItem('frontier_user_role', role);

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
            <Image
              src={logoImg}
              alt="FrontierPay"
              width={200}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-2">Welcome back</h1>
        <p className="text-slate-500 text-center text-sm mb-8">Enter your corporate credentials to access the treasury.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Your Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium" 
              placeholder="e.g. Rasmita Sahu" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Select Role</label>
            <select 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 font-medium appearance-none cursor-pointer"
              value={role}
              onChange={e => setRole(e.target.value as 'Owner' | 'Admin')}
              required
            >
              <option value="Owner">SME Owner</option>
              <option value="Admin">Platform Admin</option>
            </select>
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
