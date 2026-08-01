"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/Modal';

export default function ExportReceiptsPage() {
  const { counterparties, addTransaction, addToast } = useMock();
  const [activeModal, setActiveModal] = useState<'invoice' | null>(null);
  
  const [amount, setAmount] = useState('');
  const [buyer, setBuyer] = useState(counterparties[0]?.id || '');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    
    addTransaction({ 
      id: `TRX-${Math.floor(Math.random()*10000)}`, 
      type: 'Export', 
      amount: val, 
      currency: 'USD', 
      status: 'Processing', 
      date: 'Just now' 
    });
    addToast('Invoice Created', `Sent virtual collection details to buyer.`, 'success');
    setActiveModal(null);
    setAmount('');
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Export Receipts (A2)</h1>
          <p className="text-muted">Issue virtual accounts and track inbound EEFC settlements.</p>
        </div>
        <button onClick={() => setActiveModal('invoice')} className="btn btn-primary">
          Create Invoice <ArrowLeftRight size={16} />
        </button>
      </header>

      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>No active collections</h3>
        <p className="text-muted" style={{ marginBottom: '24px' }}>Issue a virtual USD account to your buyer to receive payments instantly.</p>
        <button onClick={() => setActiveModal('invoice')} className="btn btn-secondary">Generate Virtual Invoice</button>
      </div>

      <Modal isOpen={activeModal === 'invoice'} onClose={() => setActiveModal(null)} title="Create Export Invoice" width="500px">
        <form onSubmit={handleCreate}>
          <div className="form-group mb-4">
            <label className="form-label">Buyer (Counterparty)</label>
            <select className="form-select" value={buyer} onChange={e => setBuyer(e.target.value)} required>
              {counterparties.map(cp => (
                <option key={cp.id} value={cp.id}>{cp.name} ({cp.country})</option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-4">
            <label className="form-label">Invoice Amount (USD)</label>
            <input type="number" className="form-input" placeholder="$ 5,000" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)', marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Virtual routing details will be embedded in the invoice:</p>
            <div className="flex items-center gap-2 text-green" style={{ fontSize: '12px', fontWeight: 500 }}>
              <CheckCircle2 size={14} /> Auto-reconciliation enabled
            </div>
            <div className="flex items-center gap-2 text-green" style={{ fontSize: '12px', fontWeight: 500 }}>
              <CheckCircle2 size={14} /> EEFC holding enabled
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">Send Invoice</button>
        </form>
      </Modal>
    </div>
  );
}
