"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Settings2, Download, FileCheck, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/Modal';

export default function ExportReceiptsPage() {
  const { balances, addBalance, addTransaction, addToast, fxRates, markupMultiplier } = useMock();
  const [activeModal, setActiveModal] = useState<'settle' | null>(null);
  const [settleAmount, setSettleAmount] = useState(15000); // Mock inbound USD
  const [inrRatio, setInrRatio] = useState(100); // 100% INR, 0% USD
  const [isSettling, setIsSettling] = useState(false);

  const usdToPark = settleAmount * (1 - inrRatio / 100);
  const usdToConvert = settleAmount * (inrRatio / 100);
  
  const conversionRate = (fxRates['INR'] || 83.5) / markupMultiplier;
  const inrYield = usdToConvert * conversionRate;

  const handleSettle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSettling(true);
    await new Promise(r => setTimeout(r, 1200));

    if (usdToPark > 0) addBalance('USD', usdToPark);
    if (inrYield > 0) addBalance('INR', inrYield);
    
    addTransaction({ 
      id: `TRX-${Math.floor(Math.random()*10000)}`, 
      type: 'Export', 
      amount: settleAmount, 
      currency: 'USD', 
      status: 'Settled', 
      date: 'Just now' 
    });
    
    addToast('Receipt Settled', `Funds routed. FIRC automatically generated.`, 'success');
    setActiveModal(null);
    setIsSettling(false);
    setSettleAmount(0); // clear it so it doesn't show again in demo
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Export Receipts (A2)</h1>
          <p className="text-muted">Inflow Decision Gate & Auto-FIRC generation.</p>
        </div>
      </header>

      {/* Pending Inbounds */}
      {settleAmount > 0 ? (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', borderLeft: '4px solid var(--primary-green)' }}>
          <div className="flex justify-between items-center">
            <div>
              <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Inbound Wire</h3>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>
                ${settleAmount.toLocaleString()} <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-muted)' }}>USD</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>From: Global Tech Suppliers LLC (INV-2026-99)</p>
            </div>
            <button onClick={() => setActiveModal('settle')} className="btn btn-primary" style={{ background: 'var(--primary-green)' }}>
              Settle Funds <Settings2 size={16} />
            </button>
          </div>
        </div>
      ) : (
         <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={48} color="var(--primary-green)" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>All receipts settled</h3>
          <p className="text-muted" style={{ marginBottom: '24px' }}>You have no pending inward remittances.</p>
        </div>
      )}

      {/* Past FIRC */}
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', marginTop: '32px' }}>Recent e-FIRCs (Foreign Inward Remittance Certificates)</h3>
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="w-full text-left" style={{ fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-glass-solid)' }}>
              <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-muted)' }}>Date</th>
              <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-muted)' }}>FIRC Ref</th>
              <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-muted)' }}>Amount</th>
              <th style={{ padding: '12px 24px', fontWeight: 500, color: 'var(--text-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-glass-solid)' }}>
              <td style={{ padding: '16px 24px' }}>Yesterday</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace' }}>FIRC/2026/08912</td>
              <td style={{ padding: '16px 24px' }}>$4,500.00</td>
              <td style={{ padding: '16px 24px' }}><button className="text-blue flex items-center gap-2"><Download size={14}/> Download PDF</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal isOpen={activeModal === 'settle'} onClose={() => !isSettling && setActiveModal(null)} title="Inflow Decision Gate" width="600px">
        <form onSubmit={handleSettle} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: 'var(--primary-blue)', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Inbound Amount</p>
            <h2 style={{ fontSize: '32px', fontWeight: 700 }}>${settleAmount.toLocaleString()} USD</h2>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Settlement Strategy</h4>
              <span className="badge badge-blue">Real-time Yield</span>
            </div>
            
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-glass-solid)' }}>
              <div className="flex justify-between text-[13px] font-medium mb-4">
                <span className={inrRatio === 100 ? 'text-blue' : 'text-slate-500'}>Sprinter (Convert to INR)</span>
                <span className={inrRatio === 0 ? 'text-green' : 'text-slate-500'}>Strategist (Park in USD)</span>
              </div>
              
              <input 
                type="range" 
                min="0" max="100" step="10"
                value={inrRatio} 
                onChange={(e) => setInrRatio(Number(e.target.value))}
                style={{ width: '100%', marginBottom: '24px', cursor: 'pointer', accentColor: 'var(--primary-blue)' }} 
                disabled={isSettling}
              />

              <div className="flex gap-4">
                <div style={{ flex: 1, padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Convert to INR ({inrRatio}%)</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-blue)' }}>₹{inrYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div style={{ flex: 1, padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Park in EEFC ({100 - inrRatio}%)</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-green)' }}>${usdToPark.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', gap: '12px' }}>
            <FileCheck size={20} className="text-green-600 shrink-0" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#166534' }}>FIRC Auto-Generation Enabled</h4>
              <p style={{ fontSize: '13px', color: '#15803d', marginTop: '4px' }}>Foreign Inward Remittance Certificate will be instantly generated upon settlement, unlocking RoDTEP export incentives.</p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ padding: '12px', fontSize: '15px' }} disabled={isSettling}>
            {isSettling ? 'Settling Funds & Generating FIRC...' : 'Execute Settlement'}
          </button>
        </form>
      </Modal>

    </div>
  );
}
