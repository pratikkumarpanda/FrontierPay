"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, Plus, Building2, CreditCard } from 'lucide-react';
import Modal from '@/components/Modal';

export default function WalletsPage() {
  const { balances, addBalance, deductBalance, fxRates, addToast, addTransaction, tier, markupMultiplier } = useMock();
  const markupPercent = ((markupMultiplier - 1) * 100).toFixed(2);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'fund' | 'withdraw' | 'convert' | 'send' | 'receive' | 'add' | null>(null);
  
  // Form States
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<'USD' | 'SGD' | 'EUR' | 'GBP'>('USD');
  
  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    addBalance('INR', val);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Internal', amount: val, currency: 'INR', status: 'Settled', date: 'Just now' });
    addToast('Wallet Funded', `Successfully pulled ₹${val.toLocaleString()} from HDFC Bank.`, 'success');
    setActiveModal(null);
    setAmount('');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > balances.INR) return addToast('Error', 'Insufficient balance', 'error');
    deductBalance('INR', val);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Internal', amount: val, currency: 'INR', status: 'Processing', date: 'Just now' });
    addToast('Withdrawal Initiated', `₹${val.toLocaleString()} is being sent to your HDFC Bank account.`, 'info');
    setActiveModal(null);
    setAmount('');
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > balances[fromCurrency]) return addToast('Error', 'Insufficient balance', 'error');
    
    // Convert logic (USD to INR as example, using fxRates)
    // The fxRates API we use is base USD. So fxRates.INR is the rate for 1 USD to INR.
    // If fromCurrency is not USD, we need to convert it to USD first, then to INR.
    // USD -> INR = val * fxRates.INR
    // SGD -> INR = (val / fxRates.SGD) * fxRates.INR
    const toUSD = fromCurrency === 'USD' ? val : val / fxRates[fromCurrency];
    const interbankINR = toUSD * fxRates['INR'];
    const spreadMultiplier = 1 - (markupMultiplier - 1);
    const convertedINR = interbankINR * spreadMultiplier;
    
    deductBalance(fromCurrency, val);
    addBalance('INR', convertedINR);
    addTransaction({ id: `TRX-${Math.floor(Math.random()*10000)}`, type: 'Conversion', amount: val, currency: fromCurrency, status: 'Settled', date: 'Just now' });
    addToast('Conversion Successful', `Converted ${fromCurrency} ${val.toLocaleString()} to ₹${convertedINR.toLocaleString(undefined, {maximumFractionDigits: 2})}`, 'success');
    setActiveModal(null);
    setAmount('');
  };

  const formatCurrency = (val: number, curr: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: curr }).format(val);
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Multi-Currency Wallets</h1>
          <p className="text-muted">Manage your treasury balances and fund ledgers.</p>
        </div>
        <button onClick={() => setActiveModal('add')} className="btn btn-primary">
          <Plus size={16} /> Add Currency
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        
        {/* INR WALLET */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>₹</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Indian Rupee</h3>
                <span className="badge badge-blue" style={{ marginTop: '4px', fontSize: '10px' }}>Primary Settlement</span>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '36px', fontWeight: 500, marginBottom: '8px' }}>{formatCurrency(balances.INR, 'INR')}</div>
          <p className="text-muted" style={{ fontSize: '13px', marginBottom: '32px' }}>Account ending in 4921 • HDFC Bank</p>
          
          <div className="flex gap-4">
            <button onClick={() => setActiveModal('fund')} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}><ArrowDownLeft size={16} /> Fund Wallet</button>
            <button onClick={() => setActiveModal('withdraw')} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><ArrowUpRight size={16} /> Withdraw</button>
          </div>
        </div>

        {/* USD WALLET */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ecfdf5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>$</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>US Dollar (EEFC)</h3>
                <span className="badge badge-green" style={{ marginTop: '4px', fontSize: '10px' }}>GIFT City Hub</span>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '36px', fontWeight: 500, marginBottom: '8px' }}>{formatCurrency(balances.USD, 'USD')}</div>
          <p className="text-muted" style={{ fontSize: '13px', marginBottom: '32px' }}>~ {formatCurrency(balances.USD * (fxRates.INR || 83), 'INR')} at current rate</p>
          
          <div className="flex gap-4">
            <button onClick={() => {setFromCurrency('USD'); setActiveModal('convert');}} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><RefreshCw size={16} /> Convert to INR</button>
            <button onClick={() => addToast('Not Implemented', 'Send USD flow is in the Import Payments section.', 'info')} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><ArrowUpRight size={16} /> Send USD</button>
          </div>
        </div>

        {/* SGD WALLET */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fefce8', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S$</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Singapore Dollar</h3>
                <span className="badge badge-yellow" style={{ marginTop: '4px', fontSize: '10px', color: '#ca8a04', backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>Standard Wallet</span>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '36px', fontWeight: 500, marginBottom: '8px' }}>{formatCurrency(balances.SGD, 'SGD')}</div>
          <p className="text-muted" style={{ fontSize: '13px', marginBottom: '32px' }}>~ {formatCurrency((balances.SGD / (fxRates.SGD || 1.34)) * (fxRates.INR || 83), 'INR')} at current rate</p>
          
          <div className="flex gap-4">
            <button onClick={() => {setFromCurrency('SGD'); setActiveModal('convert');}} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><RefreshCw size={16} /> Convert to INR</button>
            <button onClick={() => setActiveModal('receive')} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><ArrowDownLeft size={16} /> Receive</button>
          </div>
        </div>

      </div>

      {/* MODALS */}
      <Modal isOpen={activeModal === 'fund'} onClose={() => setActiveModal(null)} title="Fund INR Wallet">
        <form onSubmit={handleFund}>
          <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Building2 size={24} className="text-blue" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>HDFC Bank Ltd</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Linked Account ending in 4921</div>
            </div>
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Amount (INR)</label>
            <input type="number" className="form-input" placeholder="₹ 1,00,000" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Pull Funds</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'withdraw'} onClose={() => setActiveModal(null)} title="Withdraw to Bank">
        <form onSubmit={handleWithdraw}>
          <div className="form-group mb-6">
            <label className="form-label">Amount (INR)</label>
            <input type="number" className="form-input" placeholder={`Max: ₹${balances.INR}`} value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Initiate Withdrawal</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'convert'} onClose={() => setActiveModal(null)} title={`Convert ${fromCurrency} to INR`}>
        <form onSubmit={handleConvert}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Live Interbank Rate</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>1 {fromCurrency} = {((fxRates.INR || 83) / (fromCurrency === 'USD' ? 1 : fxRates[fromCurrency])).toFixed(4)} INR</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Spread ({tier})</div>
              <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--primary-blue)' }}>{markupPercent}%</div>
            </div>
          </div>
          
          <div style={{ padding: '0 16px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Client Conversion Rate</div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--primary-green)' }}>
              1 {fromCurrency} = {(((fxRates.INR || 83) / (fromCurrency === 'USD' ? 1 : fxRates[fromCurrency])) * (1 - (markupMultiplier - 1))).toFixed(4)} INR
            </div>
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Amount to convert ({fromCurrency})</label>
            <input type="number" className="form-input" placeholder={`Max: ${balances[fromCurrency]}`} value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Execute Conversion</button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'receive'} onClose={() => setActiveModal(null)} title="Receive Funds">
        <p className="text-muted" style={{ marginBottom: '24px', fontSize: '14px' }}>Provide these details to your buyer to receive payments.</p>
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-glass-solid)' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>Bank Name</label>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>DBS Bank Ltd</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>Account Name</label>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>Frontier Technologies Pvt Ltd</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>Account Number</label>
            <div style={{ fontWeight: 600, fontSize: '15px', fontFamily: 'monospace' }}>8371920045</div>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>Bank BIC</label>
            <div style={{ fontWeight: 600, fontSize: '15px', fontFamily: 'monospace' }}>DBSSGSG</div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
