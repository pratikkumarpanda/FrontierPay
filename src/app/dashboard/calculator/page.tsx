"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { RefreshCw, Calculator, ArrowRight } from 'lucide-react';

export default function FXCalculatorPage() {
  const { fxRates, tier, markupMultiplier } = useMock();
  const markupPercent = ((markupMultiplier - 1) * 100).toFixed(2);
  const [amount, setAmount] = useState('1000');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');

  // Since rates are USD base (1 USD = X INR)
  const calculateRate = (from: string, to: string) => {
    if (from === to) return 1;
    if (from === 'USD') return fxRates[to] || 1;
    if (to === 'USD') return 1 / (fxRates[from] || 1);
    return (1 / (fxRates[from] || 1)) * (fxRates[to] || 1);
  };

  const currentRate = calculateRate(fromCurr, toCurr);
  const spreadMultiplier = 1 - (markupMultiplier - 1); // Worsen the rate by the spread
  const convertedAmount = parseFloat(amount || '0') * currentRate * spreadMultiplier;

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>FX Calculator</h1>
        <p className="text-muted">Get real-time interbank quotes with zero markup.</p>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">You Send</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  className="form-input" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  style={{ flex: 1 }}
                />
                <select className="form-select" value={fromCurr} onChange={e => setFromCurr(e.target.value)} style={{ width: '100px' }}>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="SGD">SGD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div style={{ padding: '8px', background: 'rgba(59,130,246,0.1)', color: 'var(--primary-blue)', borderRadius: '50%' }}>
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Recipient Gets</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="form-input" 
                  value={convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} 
                  disabled
                  style={{ flex: 1, background: 'rgba(0,0,0,0.02)' }}
                />
                <select className="form-select" value={toCurr} onChange={e => setToCurr(e.target.value)} style={{ width: '100px' }}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="SGD">SGD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Interbank Exchange Rate</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>
                1 {fromCurr} = {currentRate.toFixed(4)} {toCurr}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>FrontierPay Spread ({tier})</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-blue)' }}>{markupPercent}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Client Exchange Rate</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-green)' }}>
                1 {fromCurr} = {(currentRate * spreadMultiplier).toFixed(4)} {toCurr}
              </span>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-6" style={{ justifyContent: 'center' }}>
            <Calculator size={16} /> Lock in Rate & Send
          </button>
        </div>
      </div>
    </div>
  );
}
