"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowLeftRight, CheckCircle2, TrendingUp, ShieldCheck, Zap, Receipt, AlertCircle, Building2 } from 'lucide-react';

export default function ExportReceiptsDecision() {
  const { balances, addBalance, addToast } = useMock();
  const [conversionSplit, setConversionSplit] = useState(40); // % to convert to INR
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const incomingAmount = 15000; // USD
  const inrRate = 83.5;
  const inrYield = (incomingAmount * (conversionSplit / 100)) * inrRate;
  const usdYield = incomingAmount * ((100 - conversionSplit) / 100);

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addBalance('INR', inrYield);
      addBalance('USD', usdYield);
      setIsProcessing(false);
      setIsSuccess(true);
      addToast('Settlement Executed', 'Funds have been credited to your wallets instantly.', 'success');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce-subtle">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Settlement Complete!</h2>
        <p className="text-slate-500 text-xl mb-10 text-center max-w-md">
          Funds have been credited instantly. FIRC auto-generation is in progress.
        </p>
        
        <div className="flex gap-4">
          <button onClick={() => window.location.href='/dashboard/wallets'} className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            View Wallets
          </button>
          <button onClick={() => window.location.href='/dashboard/reports'} className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all">
            Download FIRC
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20 relative">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          Export Receipts
        </h1>
        <p className="text-slate-500 text-lg">Inflow Decision Gate & Auto-FIRC Generation</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Incoming Wire Info */}
        <div className="xl:col-span-1">
          <div className="glass-panel p-8 rounded-[2rem] bg-white/90 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5">
               <TrendingUp className="w-32 h-32" />
             </div>
             
             <div className="flex justify-between items-start mb-8 relative z-10">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-inner">Pending Inbound Wire</span>
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
             </div>
             
             <div className="mb-8 relative z-10">
                <h2 className="text-5xl font-mono font-bold text-slate-900 tracking-tighter">${incomingAmount.toLocaleString()} <span className="text-2xl text-slate-400 font-sans">USD</span></h2>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Cleared AML & Sanctions
                </div>
             </div>
             
             <div className="space-y-5 relative z-10">
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">From</span>
                 <span className="text-slate-900 font-bold text-lg flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400" /> Global Tech Suppliers LLC</span>
               </div>
               <div className="h-px w-full bg-slate-100"></div>
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Origin</span>
                 <span className="text-slate-900 font-bold text-lg">United States</span>
               </div>
               <div className="h-px w-full bg-slate-100"></div>
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Purpose Code (FEMA)</span>
                 <span className="text-slate-900 font-bold text-lg">P0807 (Software)</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right: Decision Engine */}
        <div className="xl:col-span-2">
          <div className="glass-panel p-10 rounded-[2rem] bg-white/90 shadow-2xl shadow-slate-200/60 border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Settlement Strategy</h3>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 font-bold text-sm shadow-sm">
                 <TrendingUp className="w-4 h-4" /> Real-time Yield Optimization
              </div>
            </div>

            {/* Slider */}
            <div className="mb-14 relative z-10">
               <div className="flex justify-between text-sm font-bold mb-4">
                 <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Sprinter (Convert to INR)</span>
                 <span className="text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">Strategist (Park in USD)</span>
               </div>
               <div className="relative h-4 mt-8 px-2 group">
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/80"></div>
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-emerald-400 to-brand-400 rounded-full pointer-events-none shadow-sm transition-all duration-300" style={{ width: `${conversionSplit}%` }}></div>
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   step="10"
                   value={conversionSplit} 
                   onChange={(e) => setConversionSplit(parseInt(e.target.value))}
                   className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-8 opacity-0 cursor-ew-resize z-20"
                 />
                 <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-[3px] border-brand-500 rounded-full shadow-lg shadow-brand-500/30 z-10 pointer-events-none transition-all duration-200 group-hover:scale-110 flex items-center justify-center" style={{ left: `calc(${conversionSplit}% - 16px)` }}>
                    <ArrowLeftRight className="w-3 h-3 text-brand-600" />
                 </div>
               </div>
            </div>

            {/* Strategy Results */}
            <div className="grid grid-cols-2 gap-6 mb-12 relative z-10">
              <div className={`p-8 rounded-[1.5rem] border-2 transition-all duration-500 relative overflow-hidden group ${conversionSplit > 0 ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-400 shadow-[0_8px_30px_rgba(16,185,129,0.15)] scale-[1.02]' : 'bg-slate-50 border-slate-200'}`}>
                {conversionSplit > 0 && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all"></div>}
                <div className="text-xs font-bold uppercase tracking-widest mb-4 transition-colors ${conversionSplit > 0 ? 'text-emerald-700' : 'text-slate-400'}">Convert to INR ({conversionSplit}%)</div>
                <div className={`text-4xl font-mono font-bold tracking-tight transition-colors ${conversionSplit > 0 ? 'text-emerald-700' : 'text-slate-300'}`}>
                  ₹ {inrYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className={`p-8 rounded-[1.5rem] border-2 transition-all duration-500 relative overflow-hidden group ${conversionSplit < 100 ? 'bg-gradient-to-br from-brand-500/10 to-brand-500/5 border-brand-400 shadow-[0_8px_30px_rgba(14,165,233,0.15)] scale-[1.02]' : 'bg-slate-50 border-slate-200'}`}>
                {conversionSplit < 100 && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all"></div>}
                <div className="text-xs font-bold uppercase tracking-widest mb-4 transition-colors ${conversionSplit < 100 ? 'text-brand-700' : 'text-slate-400'}">Park in EEFC ({100 - conversionSplit}%)</div>
                <div className={`text-4xl font-mono font-bold tracking-tight transition-colors ${conversionSplit < 100 ? 'text-brand-700' : 'text-slate-300'}`}>
                  ${usdYield.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Compliance Benefit */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-[1.5rem] p-6 mb-10 flex gap-5 items-start shadow-inner relative z-10 animate-fade-in backdrop-blur-sm">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                  <Receipt className="w-6 h-6 text-emerald-600" />
               </div>
               <div>
                 <h4 className="font-bold text-emerald-900 text-lg mb-1">FIRC Auto-Generation Enabled</h4>
                 <p className="text-sm text-emerald-700/80 font-medium">
                   Foreign Inward Remittance Certificate will be instantly generated upon settlement, unlocking RoDTEP export incentives automatically.
                 </p>
               </div>
            </div>

            <button 
              onClick={handleExecute}
              disabled={isProcessing}
              className="w-full py-5 bg-slate-900 text-white font-bold text-xl rounded-[1.5rem] flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/30 hover:shadow-slate-900/50 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-wait relative z-10 overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              {isProcessing ? (
                <>Processing Settlement <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /></>
              ) : (
                <>Execute Settlement <Zap className="w-6 h-6 fill-current" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
