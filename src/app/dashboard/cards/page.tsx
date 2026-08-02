"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { CreditCard, Plus, ShieldAlert } from 'lucide-react';
import Modal from '@/components/Modal';

export default function CardsPage() {
  const { cards, issueCard, toggleCardStatus, addToast } = useMock();
  const [activeModal, setActiveModal] = useState<'issue' | null>(null);
  
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !limit) return;
    
    issueCard({
      name,
      limit: parseFloat(limit),
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
    });
    addToast('Card Issued', `Virtual corporate card issued for ${name}.`, 'success');
    setActiveModal(null);
    setName('');
    setLimit('');
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Corporate Cards</h1>
          <p className="text-muted">Issue virtual USD cards funded directly from your EEFC wallets.</p>
        </div>
        <button onClick={() => setActiveModal('issue')} className="btn btn-primary">
          <Plus size={16} /> Issue New Card
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {cards.map(card => (
          <div key={card.id} className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60" style={{ opacity: card.status === 'Frozen' ? 0.6 : 1, transition: 'opacity 0.3s' }}>
            <div className="flex justify-between items-start mb-6">
              <CreditCard size={24} color={card.status === 'Frozen' ? 'var(--text-muted)' : 'var(--primary-blue)'} />
              <span className={`badge ${card.status === 'Frozen' ? 'badge-yellow' : 'badge-green'}`}>{card.status}</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px', fontFamily: 'monospace' }}>
              **** **** **** {card.last4}
            </h3>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '16px' }}>{card.name}</p>
            
            <div style={{ marginBottom: '16px' }}>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-muted">Spent</span>
                <span className="font-medium">${card.spent.toLocaleString()} / ${card.limit.toLocaleString()}</span>
              </div>
              <div style={{ height: '4px', background: 'var(--border-glass-solid)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(card.spent / card.limit) * 100}%`, background: 'var(--primary-blue)' }}></div>
              </div>
            </div>

            <button 
              onClick={() => {
                toggleCardStatus(card.id);
                addToast('Card Status Updated', `Card ending in ${card.last4} is now ${card.status === 'Active' ? 'Frozen' : 'Active'}.`, 'info');
              }}
              className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}
            >
              {card.status === 'Active' ? <ShieldAlert size={14} /> : <CreditCard size={14} />} 
              {card.status === 'Active' ? 'Freeze Card' : 'Unfreeze'}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={activeModal === 'issue'} onClose={() => setActiveModal(null)} title="Issue Virtual Card">
        <form onSubmit={handleIssue}>
          <div className="form-group mb-4">
            <label className="form-label">Cardholder / Purpose Name</label>
            <input type="text" className="form-input" placeholder="e.g. AWS & Server Expenses" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Monthly Limit (USD)</label>
            <input type="number" className="form-input" placeholder="$ 5,000" value={limit} onChange={e => setLimit(e.target.value)} required />
          </div>
          <p className="text-muted text-[13px] mb-6">This card will draw directly from your EEFC USD balance, completely avoiding FX markup fees.</p>
          <button type="submit" className="btn btn-primary w-full">Issue Card Instantly</button>
        </form>
      </Modal>
    </div>
  );
}
