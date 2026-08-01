"use client";
import React, { useState } from 'react';
import { useMock, Transaction } from '@/lib/MockContext';
import { Download, Filter, CheckCircle2, Clock, Check, Building2, Globe2 } from 'lucide-react';
import Modal from '@/components/Modal';

export default function TransactionsPage() {
  const { transactions, addToast } = useMock();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const getTimeline = (tx: Transaction) => {
    if (tx.status === 'Settled') {
      return [
        { title: 'Payment Initiated', time: 'T-0 09:00 AM', status: 'done' },
        { title: 'AML & Sanctions Cleared', time: 'T-0 09:05 AM', status: 'done' },
        { title: 'FX Conversion Executed', time: 'T-0 09:12 AM', status: 'done' },
        { title: 'Sent to SWIFT Network', time: 'T-0 09:30 AM', status: 'done' },
        { title: 'Settled to Beneficiary', time: tx.date, status: 'done' }
      ];
    } else if (tx.status === 'Processing') {
      return [
        { title: 'Payment Initiated', time: tx.date, status: 'done' },
        { title: 'AML & Sanctions Cleared', time: 'Just now', status: 'done' },
        { title: 'Executing FX Conversion', time: 'In Progress', status: 'active' },
        { title: 'Awaiting SWIFT Dispatch', time: 'Pending', status: 'pending' },
        { title: 'Settled to Beneficiary', time: 'Pending', status: 'pending' }
      ];
    } else {
      return [
        { title: 'Payment Initiated', time: tx.date, status: 'done' },
        { title: 'Failed Compliance Check', time: 'Just now', status: 'error' }
      ];
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Global Transactions</h1>
          <p className="text-muted">Complete audit trail of all inbound and outbound money movement.</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => addToast('Not Implemented', 'Advanced filtering will be available soon.', 'info')} className="btn btn-secondary"><Filter size={16} /> Filter</button>
          <button 
            onClick={() => {
              addToast('Exporting...', 'CSV download will begin shortly.', 'info');
              let content = `Date,Type,ID,Amount,Currency,Status\n`;
              transactions.forEach(tx => {
                content += `"${tx.date}","${tx.type}","${tx.id}",${tx.amount},"${tx.currency}","${tx.status}"\n`;
              });
              const blob = new Blob([content], { type: 'text/csv' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `FrontierPay_Transactions.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }} 
            className="btn btn-primary"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr 
                key={tx.id} 
                onClick={() => setSelectedTx(tx)}
                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ fontFamily: 'monospace', color: 'var(--primary-blue)', fontWeight: 500 }}>{tx.id}</td>
                <td style={{ fontWeight: 500 }}>{tx.type}</td>
                <td style={{ fontWeight: 600 }}>
                  {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{tx.currency}</td>
                <td>
                  <span className={`badge ${tx.status === 'Settled' ? 'badge-green' : tx.status === 'Processing' ? 'badge-yellow' : 'badge-blue'}`}>
                    {tx.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{tx.date}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title={`Transaction Details`} width="500px">
        {selectedTx && (
          <div>
            <div className="flex justify-between items-start mb-6 pb-6 border-b" style={{ borderBottom: '1px solid var(--border-glass-solid)' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'monospace' }}>{selectedTx.id}</div>
                <div style={{ fontSize: '28px', fontWeight: 600 }}>
                  {selectedTx.currency} {selectedTx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              <span className={`badge ${selectedTx.status === 'Settled' ? 'badge-green' : selectedTx.status === 'Processing' ? 'badge-yellow' : 'badge-blue'}`} style={{ padding: '6px 12px', fontSize: '13px' }}>
                {selectedTx.status}
              </span>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe2 size={16} className="text-muted" /> Audit Trail & Lifecycle
            </h3>
            
            <div style={{ paddingLeft: '8px' }}>
              {getTimeline(selectedTx).map((step, idx, arr) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: idx === arr.length - 1 ? '0' : '20px', position: 'relative' }}>
                  {/* Timeline Line */}
                  {idx !== arr.length - 1 && (
                    <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-20px', width: '2px', background: step.status === 'done' ? 'var(--primary-green)' : 'var(--border-glass-solid)', zIndex: 1 }} />
                  )}
                  
                  {/* Timeline Node */}
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: step.status === 'done' ? 'var(--primary-green)' : step.status === 'active' ? '#ca8a04' : '#f1f5f9',
                    color: step.status === 'pending' ? 'var(--text-muted)' : 'white'
                  }}>
                    {step.status === 'done' && <Check size={14} />}
                    {step.status === 'active' && <Clock size={14} />}
                    {step.status === 'pending' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-focus)' }} />}
                  </div>

                  {/* Timeline Content */}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: step.status === 'active' ? 600 : 500, color: step.status === 'pending' ? 'var(--text-muted)' : 'inherit' }}>{step.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-glass-solid)', display: 'flex', gap: '12px' }}>
              <Building2 size={20} className="text-muted" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>Compliance Guarantee</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>This transaction has been screened against OFAC, UN, and localized AML registries. Automated Form 15CA/CB documentation has been filed.</div>
              </div>
            </div>

            <button 
              onClick={() => {
                addToast('Downloading...', 'Receipt PDF is being generated.', 'info');
                setTimeout(() => {
                  const content = `TRANSACTION RECEIPT\n\nID: ${selectedTx.id}\nDate: ${selectedTx.date}\nType: ${selectedTx.type}\nAmount: ${selectedTx.currency} ${selectedTx.amount}\nStatus: ${selectedTx.status}\n\nGenerated by FrontierPay`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `Receipt_${selectedTx.id}.txt`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  addToast('Download Complete', 'Receipt saved.', 'success');
                }, 1000);
              }} 
              className="btn btn-secondary w-full mt-6" style={{ justifyContent: 'center' }}
            >
              <Download size={16} /> Download Official Receipt
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
}
