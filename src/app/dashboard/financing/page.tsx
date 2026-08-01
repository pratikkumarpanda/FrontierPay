"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Zap, History } from 'lucide-react';
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
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Trade Credit & Financing</h1>
          <p className="text-muted">Instant liquidity for exports and Pay-Later lines for imports.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        
        {/* Invoice Financing Card */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.1 }}>
            <Zap size={64} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Invoice Financing</h3>
          <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px', maxWidth: '80%' }}>
            Get paid instantly for your export invoices. AI underwriting with non-recourse options.
          </p>
          
          <div style={{ marginBottom: '24px' }}>
            <div className="flex justify-between text-[13px] font-medium mb-2">
              <span className="text-slate-500">Available Limit</span>
              <span className="text-blue">${(creditLimits.invoiceFinancing.limit - creditLimits.invoiceFinancing.used).toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                background: 'var(--primary-blue)', 
                width: `${(creditLimits.invoiceFinancing.used / creditLimits.invoiceFinancing.limit) * 100}%` 
              }} />
            </div>
            <div className="text-[12px] text-muted mt-2">
              ${creditLimits.invoiceFinancing.used.toLocaleString()} used of ${creditLimits.invoiceFinancing.limit.toLocaleString()}
            </div>
          </div>
          
          <button onClick={() => setActiveModal('invoice')} className="btn btn-primary w-full">Finance an Invoice</button>
        </div>

        {/* Pay Later Card */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.1 }}>
            <History size={64} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Import Pay-Later (BNPL)</h3>
          <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px', maxWidth: '80%' }}>
            Extend your working capital. Pay your suppliers now and settle with us in 30-90 days.
          </p>
          
          <div style={{ marginBottom: '24px' }}>
            <div className="flex justify-between text-[13px] font-medium mb-2">
              <span className="text-slate-500">Available Limit</span>
              <span className="text-green">${(creditLimits.payLater.limit - creditLimits.payLater.used).toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                background: 'var(--primary-green)', 
                width: `${(creditLimits.payLater.used / creditLimits.payLater.limit) * 100}%` 
              }} />
            </div>
            <div className="text-[12px] text-muted mt-2">
              ${creditLimits.payLater.used.toLocaleString()} used of ${creditLimits.payLater.limit.toLocaleString()}
            </div>
          </div>
          
          <button onClick={() => setActiveModal('paylater')} className="btn btn-primary w-full" style={{ background: 'var(--primary-green)' }}>Draw Credit Line</button>
        </div>
      </div>

      {/* Invoice Modal */}
      <Modal isOpen={activeModal === 'invoice'} onClose={() => setActiveModal(null)} title="Finance Export Invoice" width="500px">
        <form onSubmit={handleInvoiceFinance} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Select Unpaid Invoice</label>
            <select className="form-select">
              <option>INV-2026-102 (Global Tech Suppliers) - $25,000</option>
              <option>INV-2026-105 (Singapore Logistics) - $12,500</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Financing Amount (USD)</label>
            <input type="number" className="form-input" value={invoiceAmount} onChange={e => setInvoiceAmount(e.target.value)} required />
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Discount Fee (2.0%)</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>${(parseFloat(invoiceAmount || '0') * 0.02).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid var(--border-glass-solid)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Net Disbursement</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-blue)' }}>
                ${(parseFloat(invoiceAmount || '0') * 0.98).toFixed(2)}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">Accept & Disburse to USD Wallet</button>
        </form>
      </Modal>

      {/* Pay Later Modal */}
      <Modal isOpen={activeModal === 'paylater'} onClose={() => setActiveModal(null)} title="Draw Pay-Later Credit Line" width="500px">
        <form onSubmit={handlePayLater} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Drawdown Amount (USD)</label>
            <input type="number" className="form-input" value={payLaterAmount} onChange={e => setPayLaterAmount(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Repayment Tenure</label>
            <select className="form-select" value={tenure} onChange={e => setTenure(Number(e.target.value))}>
              <option value={30}>30 Days (1.5% Fee)</option>
              <option value={60}>60 Days (2.8% Fee)</option>
              <option value={90}>90 Days (4.0% Fee)</option>
            </select>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <div className="flex justify-between items-center pt-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Disbursed to USD Wallet</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-green)' }}>
                ${parseFloat(payLaterAmount || '0').toFixed(2)}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ background: 'var(--primary-green)' }}>Draw Funds Now</button>
        </form>
      </Modal>

    </div>
  );
}
