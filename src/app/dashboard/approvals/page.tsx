"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { ShieldCheck, Check, X, Clock } from 'lucide-react';

export default function ApprovalsPage() {
  const { transactions, setTransactions, addToast } = useMock();

  const pendingTxs = transactions.filter(tx => tx.status === 'Pending Approval');

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return { ...tx, status: 'Processing' as const, timestamp: Date.now() };
      }
      return tx;
    }));
    addToast('Payment Authorized', `Transaction ${id} has been approved and is now processing.`, 'success');
  };

  const handleReject = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return { ...tx, status: 'Failed' as const };
      }
      return tx;
    }));
    addToast('Payment Rejected', `Transaction ${id} was rejected.`, 'error');
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Approval Queue</h1>
        <p className="text-muted">Review and authorize pending high-value corporate transfers.</p>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass-solid)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={20} className="text-blue" />
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Action Required</h2>
          <span className="badge badge-yellow">{pendingTxs.length} Pending</span>
        </div>
        
        {pendingTxs.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '50%', marginBottom: '16px' }}>
              <Check size={32} className="text-green" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px' }}>You're all caught up!</h3>
            <p>There are no transactions waiting for your authorization.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Initiated By</th>
                <th>Time</th>
                <th style={{ textAlign: 'right' }}>Authorization</th>
              </tr>
            </thead>
            <tbody>
              {pendingTxs.map(tx => (
                <tr key={tx.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-blue)', fontWeight: 500 }}>{tx.id}</td>
                  <td style={{ fontWeight: 500 }}>{tx.type}</td>
                  <td style={{ fontWeight: 600 }}>
                    {tx.currency === 'USD' ? '$' : tx.currency === 'INR' ? '₹' : ''}
                    {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {tx.currency}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>finance@frontiertech.com</td>
                  <td style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {tx.date}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleReject(tx.id)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--error)' }}>
                        <X size={14} /> Reject
                      </button>
                      <button onClick={() => handleApprove(tx.id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        <Check size={14} /> Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
