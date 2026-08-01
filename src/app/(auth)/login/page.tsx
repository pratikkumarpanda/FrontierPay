"use client";
import { useState } from 'react';
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'var(--primary-blue)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--primary-green)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%' }}></div>

      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '48px', zIndex: 10, background: 'rgba(255,255,255,0.85)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Link href="/" className="flex items-center gap-3">
            <div style={{ position: 'relative', width: '32px', height: '32px' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M 20 50 Q 30 20 60 20 L 80 20 Q 50 30 50 50 Z" fill="var(--primary-blue)" />
                <path d="M 15 75 Q 25 55 50 55 L 70 55 Q 40 65 40 85 Z" fill="var(--primary-green)" />
              </svg>
            </div>
            <span className="brand-font font-semibold" style={{ fontSize: '24px' }}>FrontierPay</span>
          </Link>
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 600, textAlign: 'center', marginBottom: '8px' }}>Welcome back</h1>
        <p className="text-muted" style={{ textAlign: 'center', fontSize: '14px', marginBottom: '32px' }}>Enter your corporate credentials to access the treasury.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Corporate Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="founder@company.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <div className="flex justify-between">
              <label className="form-label">Password</label>
              <Link href="#" className="text-blue" style={{ fontSize: '13px', fontWeight: 500 }}>Forgot password?</Link>
            </div>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In securely <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', borderTop: '1px solid var(--border-glass-solid)', paddingTop: '24px' }}>
          <p className="text-muted" style={{ fontSize: '13px' }}>
            Protected by bank-grade encryption <Key size={12} style={{ display: 'inline', marginLeft: '4px' }} />
          </p>
        </div>
      </div>
    </div>
  );
}
