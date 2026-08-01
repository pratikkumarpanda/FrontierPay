"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowDownLeft, ArrowUpRight, RefreshCcw, Plus, WalletCards } from 'lucide-react';
import Modal from '@/components/Modal';

export default function WalletsPage() {
  const { balances, addBalance, deductBalance, fxRates, addToast, addTransaction, markupMultiplier } = useMock();
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'fund' | 'withdraw' | 'convert' | null>(null);
  
  // Form States
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<'USD' | 'SGD' | 'EUR' | 'GBP'>('USD');
  
  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    addBalance('INR', val);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Internal', amount: val, currency: 'INR', status: 'Settled', date: 'Just now' });
    addToast('Wallet Funded', `Successfully pulled ₹${val.toLocaleString('en-IN')} from HDFC Bank.`, 'success');
    setActiveModal(null);
    setAmount('');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > balances.INR) return addToast('Error', 'Insufficient balance', 'error');
    deductBalance('INR', val);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Internal', amount: val, currency: 'INR', status: 'Processing', date: 'Just now' });
    addToast('Withdrawal Initiated', `₹${val.toLocaleString('en-IN')} is being sent to your HDFC Bank account.`, 'info');
    setActiveModal(null);
    setAmount('');
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > balances[fromCurrency]) return addToast('Error', 'Insufficient balance', 'error');
    
    const toUSD = fromCurrency === 'USD' ? val : val / (fxRates[fromCurrency] || 1);
    const interbankINR = toUSD * (fxRates['INR'] || 83.5);
    const spreadMultiplier = 1 - (markupMultiplier - 1);
    const convertedINR = interbankINR * spreadMultiplier;
    
    deductBalance(fromCurrency, val);
    addBalance('INR', convertedINR);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Conversion', amount: val, currency: fromCurrency, status: 'Settled', date: 'Just now' });
    addToast('Conversion Successful', `Converted ${fromCurrency} ${val.toLocaleString('en-US')} to ₹${convertedINR.toLocaleString('en-IN', {maximumFractionDigits: 2})}`, 'success');
    setActiveModal(null);
    setAmount('');
  };

  const formatCurrency = (val: number, curr: string) => {
    const locale = curr === 'INR' ? 'en-IN' : 'en-US';
    return new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(val);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-start">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <WalletCards className="w-6 h-6 fill-current" />
            </div>
            Multi-Currency Wallets
          </h1>
          <p className="text-slate-500 text-lg">Manage your treasury balances and fund ledgers.</p>
        </div>
        <button onClick={() => addToast('Coming Soon', 'Additional currencies will be supported soon.', 'info')} className="px-6 py-3 bg-white text-brand-600 font-bold rounded-xl border-2 border-slate-200 shadow-sm hover:border-brand-300 hover:bg-brand-50 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Currency
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* INR WALLET */}
        <div className="glass-panel p-8 rounded-[2rem] bg-white/80 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-brand-500/20"></div>
          
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl font-bold border border-brand-100 shadow-inner">₹</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Indian Rupee</h3>
                <span className="inline-block mt-1 bg-brand-100 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">Primary Settlement</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-10">
            <h2 className="text-4xl font-mono font-bold text-slate-900 tracking-tight mb-2">{formatCurrency(balances.INR, 'INR')}</h2>
            <p className="text-sm font-medium text-slate-500 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">Account ending in 4921 • HDFC Bank</p>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <button onClick={() => setActiveModal('fund')} className="flex-1 py-4 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-5 h-5" /> Fund Wallet
            </button>
            <button onClick={() => setActiveModal('withdraw')} className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <ArrowUpRight className="w-5 h-5" /> Withdraw
            </button>
          </div>
        </div>

        {/* USD WALLET */}
        <div className="glass-panel p-8 rounded-[2rem] bg-white/80 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-emerald-500/20"></div>
          
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-100 shadow-inner">$</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">US Dollar (EEFC)</h3>
                <span className="inline-block mt-1 bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">GIFT City Hub</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-10">
            <h2 className="text-4xl font-mono font-bold text-slate-900 tracking-tight mb-2">{formatCurrency(balances.USD, 'USD')}</h2>
            <p className="text-sm font-medium text-slate-500 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">
               ~₹{(balances.USD * (fxRates['INR'] || 83.5)).toLocaleString('en-IN', {maximumFractionDigits: 2})} at current rate
            </p>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <button onClick={() => { setFromCurrency('USD'); setActiveModal('convert'); }} className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <RefreshCcw className="w-5 h-5" /> Convert to INR
            </button>
            <button onClick={() => addToast('Wire Initiated', 'Transfer flow would open here.', 'info')} className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <ArrowUpRight className="w-5 h-5" /> Send USD
            </button>
          </div>
        </div>

        {/* SGD WALLET */}
        <div className="glass-panel p-8 rounded-[2rem] bg-white/80 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-amber-500/20"></div>
          
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold border border-amber-100 shadow-inner">S$</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Singapore Dollar</h3>
                <span className="inline-block mt-1 bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm">Standard Wallet</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-10">
            <h2 className="text-4xl font-mono font-bold text-slate-900 tracking-tight mb-2">SGD {balances.SGD.toLocaleString('en-SG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            <p className="text-sm font-medium text-slate-500 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">
               ~₹{(balances.SGD * ((fxRates['INR'] || 83.5) / (fxRates['SGD'] || 1.35))).toLocaleString('en-IN', {maximumFractionDigits: 2})} at current rate
            </p>
          </div>
          
          <div className="flex gap-4 relative z-10">
             <button onClick={() => { setFromCurrency('SGD'); setActiveModal('convert'); }} className="flex-1 py-4 bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <RefreshCcw className="w-5 h-5" /> Convert to INR
            </button>
            <button onClick={() => addToast('Feature Coming Soon', '', 'info')} className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-5 h-5" /> Receive
            </button>
          </div>
        </div>

      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === 'fund'} onClose={() => setActiveModal(null)} title="Fund INR Wallet">
        <form onSubmit={handleFund} className="space-y-6">
          <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ArrowDownLeft className="w-6 h-6 text-brand-600" />
             </div>
             <div>
               <p className="text-sm font-bold text-brand-900">Pull from HDFC Bank</p>
               <p className="text-xs font-medium text-brand-700 mt-1">Account ending in 4921</p>
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Amount to pull (₹)</label>
            <input type="number" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl focus:outline-none focus:border-brand-500 font-bold" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="w-full py-4 bg-brand-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-brand-500/30">Confirm Funding</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'withdraw'} onClose={() => setActiveModal(null)} title="Withdraw INR">
        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200">
                <ArrowUpRight className="w-6 h-6 text-slate-600" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-900">Send to HDFC Bank</p>
               <p className="text-xs font-medium text-slate-500 mt-1">Available: ₹{balances.INR.toLocaleString()}</p>
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Amount to withdraw (₹)</label>
            <input type="number" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl focus:outline-none focus:border-slate-400 font-bold" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-lg shadow-slate-900/20">Confirm Withdrawal</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'convert'} onClose={() => setActiveModal(null)} title={`Convert ${fromCurrency} to INR`}>
        <form onSubmit={handleConvert} className="space-y-6">
          <div className={`bg-${fromCurrency === 'USD' ? 'emerald' : 'amber'}-50 p-6 rounded-2xl border border-${fromCurrency === 'USD' ? 'emerald' : 'amber'}-100 flex items-center justify-between`}>
             <div>
               <p className={`text-sm font-bold text-${fromCurrency === 'USD' ? 'emerald' : 'amber'}-900`}>Available {fromCurrency}</p>
               <p className={`text-2xl font-mono font-bold text-${fromCurrency === 'USD' ? 'emerald' : 'amber'}-700 mt-1`}>{formatCurrency(balances[fromCurrency], fromCurrency)}</p>
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Amount to convert ({fromCurrency})</label>
            <input type="number" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl focus:outline-none focus:border-brand-500 font-bold" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="w-full py-4 bg-brand-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
            Execute Conversion <RefreshCcw className="w-5 h-5" />
          </button>
        </form>
      </Modal>

    </div>
  );
}
