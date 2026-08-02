"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Zap, History, ArrowRight } from 'lucide-react';
import Modal from '@/components/Modal';

export default function FinancingPage() {
  const { creditLimits, useCredit, addBalance, addToast } = useMock();
  
  const [activeModal, setActiveModal] = useState<'invoice' | 'paylater' | null>(null);
  
  // Invoice Financing State
  const [invoiceAmount, setInvoiceAmount] = useState('');
  
  // Pay Later State
  const [payLaterAmount, setPayLaterAmount] = useState('');
  const [tenure, setTenure] = useState(30);

  const handleInvoiceFinance = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(invoiceAmount);
    if (!amount || amount <= 0) return;
    
    if (amount > creditLimits.invoiceFinancing.limit - creditLimits.invoiceFinancing.used) {
      addToast('Limit Exceeded', 'Amount exceeds available invoice financing limit.', 'error');
      return;
    }
    
    useCredit('invoiceFinancing', amount);
    // Add 98% to balance (2% fee)
    addBalance('USD', amount * 0.98);
    
    addToast('Financing Approved', `$${amount.toLocaleString()} disbursed. 2% fee applied.`, 'success');
    setActiveModal(null);
    setInvoiceAmount('');
  };

  const handlePayLater = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(payLaterAmount);
    if (!amount || amount <= 0) return;
    
    if (amount > creditLimits.payLater.limit - creditLimits.payLater.used) {
      addToast('Limit Exceeded', 'Amount exceeds available Pay-Later limit.', 'error');
      return;
    }

    useCredit('payLater', amount);
    addBalance('USD', amount); // Give them USD to pay their import
    
    addToast('Credit Line Drawn', `$${amount.toLocaleString()} drawn for ${tenure} days.`, 'success');
    setActiveModal(null);
    setPayLaterAmount('');
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
           <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          Trade Credit & Financing
        </h1>
        <p className="text-slate-500 text-lg">Instant liquidity for exports and Pay-Later lines for imports.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Invoice Financing Card */}
        <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-indigo-500/20"></div>
          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
            <Zap className="w-32 h-32 text-indigo-600 fill-current" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3 relative z-10">Invoice Financing</h3>
          <p className="text-slate-500 font-medium text-base mb-10 max-w-[80%] relative z-10">
            Get paid instantly for your export invoices. AI underwriting with non-recourse options.
          </p>
          
          <div className="mb-12 relative z-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              <span>Available Limit</span>
              <span className="text-indigo-600">${(creditLimits.invoiceFinancing.limit - creditLimits.invoiceFinancing.used).toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner mb-3">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${(creditLimits.invoiceFinancing.used / creditLimits.invoiceFinancing.limit) * 100}%` }} 
              />
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
               <span className="text-slate-600"><strong className="text-slate-900">${creditLimits.invoiceFinancing.used.toLocaleString()}</strong> used</span>
               <span className="text-slate-500">Total: ${creditLimits.invoiceFinancing.limit.toLocaleString()}</span>
            </div>
          </div>
          
          <button onClick={() => setActiveModal('invoice')} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 relative z-10">
            Finance an Invoice <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pay Later Card */}
        <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-emerald-500/20"></div>
          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 group-hover:-rotate-12 transition-all duration-500">
            <History className="w-32 h-32 text-emerald-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3 relative z-10">Import Pay-Later (BNPL)</h3>
          <p className="text-slate-500 font-medium text-base mb-10 max-w-[80%] relative z-10">
            Extend your working capital. Pay your suppliers now and settle with us in 30-90 days.
          </p>
          
          <div className="mb-12 relative z-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              <span>Available Limit</span>
              <span className="text-emerald-600">${(creditLimits.payLater.limit - creditLimits.payLater.used).toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner mb-3">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${(creditLimits.payLater.used / creditLimits.payLater.limit) * 100}%` }} 
              />
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
               <span className="text-slate-600"><strong className="text-slate-900">${creditLimits.payLater.used.toLocaleString()}</strong> used</span>
               <span className="text-slate-500">Total: ${creditLimits.payLater.limit.toLocaleString()}</span>
            </div>
          </div>
          
          <button onClick={() => setActiveModal('paylater')} className="w-full py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 relative z-10">
            Draw Credit Line <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Invoice Financing Modal */}
      <Modal isOpen={activeModal === 'invoice'} onClose={() => setActiveModal(null)} title="Finance Export Invoice">
        <form onSubmit={handleInvoiceFinance} className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
             <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-indigo-900">Available Limit</span>
                <span className="text-lg font-mono font-bold text-indigo-700">${(creditLimits.invoiceFinancing.limit - creditLimits.invoiceFinancing.used).toLocaleString()}</span>
             </div>
             <p className="text-xs text-indigo-600/80 font-medium">Funds will be disbursed to your USD EEFC wallet instantly minus a 2% flat discount fee.</p>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Invoice Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-light">$</span>
              <input 
                type="number" 
                className="w-full pl-10 pr-5 py-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-2xl text-xl focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all text-slate-900 font-bold" 
                placeholder="0.00" 
                value={invoiceAmount} 
                onChange={e => setInvoiceAmount(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Upload Invoice (PDF)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 hover:border-brand-400 cursor-pointer transition-colors relative">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
              <div className="font-bold text-slate-700 mb-1">Click or drag file here</div>
              <div className="text-sm text-slate-500">Max 5MB PDF</div>
            </div>
          </div>
          
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all hover:-translate-y-0.5">
            Submit for Financing
          </button>
        </form>
      </Modal>

      {/* Pay Later Modal */}
      <Modal isOpen={activeModal === 'paylater'} onClose={() => setActiveModal(null)} title="Draw Credit Line">
        <form onSubmit={handlePayLater} className="space-y-6">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
             <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-emerald-900">Available Limit</span>
                <span className="text-lg font-mono font-bold text-emerald-700">${(creditLimits.payLater.limit - creditLimits.payLater.used).toLocaleString()}</span>
             </div>
             <p className="text-xs text-emerald-600/80 font-medium">Funds will be added to your USD wallet to settle supplier invoices immediately.</p>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Drawdown Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-light">$</span>
              <input 
                type="number" 
                className="w-full pl-10 pr-5 py-4 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-2xl text-xl focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all text-slate-900 font-bold" 
                placeholder="0.00" 
                value={payLaterAmount} 
                onChange={e => setPayLaterAmount(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tenure (Days)</label>
            <select 
              className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all text-slate-900 font-bold cursor-pointer appearance-none"
              value={tenure} 
              onChange={e => setTenure(Number(e.target.value))}
            >
              <option value={30}>30 Days (1.5% Fee)</option>
              <option value={60}>60 Days (3.0% Fee)</option>
              <option value={90}>90 Days (4.5% Fee)</option>
            </select>
          </div>
          
          <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5">
            Confirm Drawdown
          </button>
        </form>
      </Modal>
    </div>
  );
}
