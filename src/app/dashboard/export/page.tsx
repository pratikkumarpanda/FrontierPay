"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowLeftRight, CheckCircle2, TrendingUp, Wallet, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function ExportReceipts() {
  const { balances, addBalance, addTransaction, addToast, fxRates, markupMultiplier } = useMock();
  const [inboundUsd] = useState(15000); // Mock inbound wire
  const [conversionRatio, setConversionRatio] = useState(40); // 40% INR, 60% USD by default
  const [isSettled, setIsSettled] = useState(false);

  const convertAmount = (inboundUsd * conversionRatio) / 100;
  const parkAmount = inboundUsd - convertAmount;
  
  // Exporters get a slightly better rate (wholesale - markup)
  const effectiveFx = (fxRates['INR'] || 83.5) / markupMultiplier; 
  const inrYield = convertAmount * effectiveFx;

  const handleSettle = () => {
    // Settle amounts
    if (parkAmount > 0) addBalance('USD', parkAmount);
    if (inrYield > 0) addBalance('INR', inrYield);
    
    addTransaction({ 
      id: `TRX-${Math.floor(Math.random()*10000)}`, 
      type: 'Export', 
      amount: inboundUsd, 
      currency: 'USD', 
      status: 'Settled', 
      date: new Date().toISOString().split('T')[0]
    });

    addToast('Funds Settled', `Converted $${convertAmount} to INR, parked $${parkAmount} in EEFC.`, 'success');
    setIsSettled(true);
  };

  if (isSettled) {
      return (
          <div className="animate-fade-in flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-200 shadow-glass">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Settlement Complete</h2>
              <p className="text-slate-500 text-lg mb-8 text-center max-w-md">
                  Your funds have been routed according to your strategy. The e-FIRC has been auto-generated.
              </p>
              
              <div className="flex gap-4">
                <button onClick={() => window.location.href='/dashboard'} className="px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                    Return to Dashboard
                </button>
                <button onClick={() => window.location.href='/dashboard/reports'} className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl shadow-card-hover hover:bg-brand-700 transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Download FIRC
                </button>
              </div>
            </div>
      );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="text-brand-500"><ArrowLeftRight className="w-6 h-6" /></span> 
            Export Receipts
          </h1>
          <p className="text-sm text-slate-500 mt-2">Inflow Decision Gate & Auto-FIRC Generation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Pending Wire */}
            <div className="lg:col-span-1">
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-24 h-24 text-brand-600" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Inbound Wire</p>
                        <h2 className="text-3xl font-mono font-bold text-slate-900 mb-4 flex items-end gap-1">
                            $15,000 <span className="text-lg text-slate-400 font-sans font-medium mb-1">USD</span>
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">From</span>
                                <span className="font-bold text-slate-900">Global Tech Suppliers LLC</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Origin</span>
                                <span className="font-medium text-slate-900">United States</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Purpose</span>
                                <span className="font-medium text-slate-900">P0807 (Software)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Decision Gate */}
            <div className="lg:col-span-2">
                <div className="glass-panel p-8 rounded-2xl bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-slate-900">Settlement Strategy</h3>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Real-time Yield
                        </span>
                    </div>

                    {/* Slider Section */}
                    <div className="mb-10">
                        <div className="flex justify-between text-sm font-bold text-slate-700 mb-4">
                            <span className={conversionRatio > 50 ? 'text-brand-600' : ''}>Sprinter (Convert to INR)</span>
                            <span className={conversionRatio <= 50 ? 'text-brand-600' : ''}>Strategist (Park in USD)</span>
                        </div>
                        
                        <input 
                            type="range" 
                            min="0" max="100" step="10"
                            value={conversionRatio}
                            onChange={(e) => setConversionRatio(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500 mb-6"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`p-5 rounded-xl border-2 transition-all ${conversionRatio > 0 ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-slate-50'}`}>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Convert to INR ({conversionRatio}%)</p>
                                <p className="text-2xl font-mono font-bold text-brand-700">
                                    ₹ {inrYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                            <div className={`p-5 rounded-xl border-2 transition-all ${conversionRatio < 100 ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Park in EEFC ({100 - conversionRatio}%)</p>
                                <p className="text-2xl font-mono font-bold text-emerald-700">
                                    ${parkAmount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3 mb-8">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-emerald-900">FIRC Auto-Generation Enabled</p>
                            <p className="text-xs text-emerald-700 font-medium mt-1">
                                Foreign Inward Remittance Certificate will be instantly generated upon settlement, unlocking RoDTEP export incentives.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSettle}
                        className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl shadow-card-hover hover:bg-brand-700 flex items-center justify-center gap-2 transition-all text-lg"
                    >
                        Execute Settlement <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
