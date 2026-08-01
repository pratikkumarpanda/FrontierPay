"use client";
import React, { useState } from 'react';
import { useMock, SWIFT_FEE_USD } from '@/lib/MockContext';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/Modal';

export default function ImportPaymentsPage() {
  const { counterparties, balances, fxRates, deductBalance, addTransaction, addToast, tier, markupMultiplier } = useMock();
  
  const [activeModal, setActiveModal] = useState<'initiate' | null>(null);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [vendor, setVendor] = useState(counterparties[0]?.id || '');
  const [invoiceRef, setInvoiceRef] = useState('');

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    
    // Convert USD invoice to INR equivalent + dynamic tier markup + SWIFT Fee
    const rate = fxRates['INR'] || 83.5;
    const invoicePlusSwift = val + SWIFT_FEE_USD;
    const inrCost = invoicePlusSwift * rate * markupMultiplier;

    if (balances.INR < inrCost) {
      return addToast('Failed', `Insufficient INR balance. You need ₹${inrCost.toLocaleString()} to clear this invoice.`, 'error');
    }

    deductBalance('INR', inrCost);
    addTransaction({ 
      id: `TRX-${Math.floor(Math.random()*10000)}`, 
      type: 'Import', 
      amount: val, 
      currency: 'USD', 
      status: 'Processing', 
      date: 'Just now' 
    });
    addToast('Payment Initiated', `Invoice ${invoiceRef} scheduled for T+0 settlement.`, 'success');
    setActiveModal(null);
    setAmount('');
    setInvoiceRef('');
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Import Payments (A1)</h1>
          <p className="text-muted">Automated DTAA & Form 15CA/CB compliance for outward remittances.</p>
        </div>
        <button onClick={() => setActiveModal('initiate')} className="btn btn-primary">
          Initiate Payment <ArrowRight size={16} />
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Pending Documentation</h3>
          <div style={{ fontSize: '24px', fontWeight: 600 }}>0 <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--primary-green)' }}>Clear</span></div>
        </div>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Average Settlement Time</h3>
          <div style={{ fontSize: '24px', fontWeight: 600 }}>45 mins <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}>T+0</span></div>
        </div>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Active Markup Tier</h3>
          <div style={{ fontSize: '24px', fontWeight: 600 }}>{((markupMultiplier - 1) * 100).toFixed(2)}% <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}>{tier}</span></div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FileText size={48} color="var(--border-glass-solid)" style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>No pending invoices</h3>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Upload your vendor invoices or connect your ERP to automate imports.</p>
        <button onClick={() => setActiveModal('initiate')} className="btn btn-secondary">Create Manual Payment</button>
      </div>

      <Modal isOpen={activeModal === 'initiate'} onClose={() => setActiveModal(null)} title="Initiate Import Payment" width="600px">
        <form onSubmit={handleInitiate}>
          <div className="flex gap-4">
            <div className="form-group mb-4" style={{ flex: 1 }}>
              <label className="form-label">Beneficiary (Vendor)</label>
              <select className="form-select" value={vendor} onChange={e => setVendor(e.target.value)} required>
                {counterparties.map(cp => (
                  <option key={cp.id} value={cp.id}>{cp.name} ({cp.country})</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-4" style={{ flex: 1 }}>
              <label className="form-label">Purpose Code</label>
              <select className="form-select" required>
                <option>S0102 - Trade in Services</option>
                <option>P0103 - Advance for Imports</option>
                <option>S0802 - Software License</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="form-group mb-4" style={{ flex: 1 }}>
              <label className="form-label">Invoice Amount (USD)</label>
              <input type="number" className="form-input" placeholder="$ 10,000" value={amount} onChange={e => setAmount(e.target.value)} required />
            </div>
            <div className="form-group mb-4" style={{ flex: 1 }}>
              <label className="form-label">Invoice Reference</label>
              <input type="text" className="form-input" placeholder="INV-2026-001" value={invoiceRef} onChange={e => setInvoiceRef(e.target.value)} required />
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)', marginBottom: '24px' }}>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Interbank Rate</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{fxRates['INR'] ? fxRates['INR'].toFixed(4) : '83.5000'} INR</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Spread ({tier})</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{((markupMultiplier - 1) * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>SWIFT Wire Fee</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>${SWIFT_FEE_USD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid var(--border-glass-solid)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Cost to debit</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-blue)' }}>
                {amount ? `₹${((parseFloat(amount) + SWIFT_FEE_USD) * (fxRates['INR'] || 83.5) * markupMultiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-green" style={{ fontSize: '12px', fontWeight: 500 }}>
              <CheckCircle2 size={14} /> DTAA & 15CB requirements satisfied
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">Execute Payment</button>
        </form>
      </Modal>

    </div>
  );
}
