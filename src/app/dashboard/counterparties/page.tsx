"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Users, Plus, MoreVertical } from 'lucide-react';
import Modal from '@/components/Modal';

export default function CounterpartiesPage() {
  const { counterparties, addCounterparty, addToast } = useMock();
  const [activeModal, setActiveModal] = useState<'add' | null>(null);
  
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [account, setAccount] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country || !account) return;
    
    setIsVerifying(true);
    addToast('Verifying Bank BIC...', 'Connecting to global bank network directory...', 'info');
    
    setTimeout(() => {
      addCounterparty({ name, country, account });
      addToast('Counterparty Saved', `${name} has been verified and added to your directory.`, 'success');
      setActiveModal(null);
      setName(''); setCountry(''); setAccount('');
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Counterparties</h1>
          <p className="text-muted">Manage your global vendors and buyers.</p>
        </div>
        <button onClick={() => setActiveModal('add')} className="btn btn-primary">
          <Plus size={16} /> Add Counterparty
        </button>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Entity Name</th>
              <th>Country</th>
              <th>Primary Account</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {counterparties.map(cp => (
              <tr key={cp.id}>
                <td style={{ fontWeight: 500 }}>{cp.name}</td>
                <td>{cp.country}</td>
                <td style={{ fontFamily: 'monospace' }}>{cp.account}</td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '6px' }}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
            {counterparties.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No counterparties saved yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={activeModal === 'add'} onClose={() => setActiveModal(null)} title="Add Counterparty">
        <form onSubmit={handleAdd}>
          <div className="form-group mb-4">
            <label className="form-label">Legal Name</label>
            <input type="text" className="form-input" placeholder="Supplier LLC" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Country of Incorporation</label>
            <input type="text" className="form-input" placeholder="United States" value={country} onChange={e => setCountry(e.target.value)} required />
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Bank Account Number / IBAN</label>
            <input type="text" className="form-input" placeholder="US00..." value={account} onChange={e => setAccount(e.target.value)} required />
          </div>
          <button type="submit" disabled={isVerifying} className="btn btn-primary w-full">
            {isVerifying ? 'Verifying Network...' : 'Save Entity'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
