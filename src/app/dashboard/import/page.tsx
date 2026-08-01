"use client";
import React, { useState } from 'react';
import { useMock, SWIFT_FEE_USD } from '@/lib/MockContext';
import { FileText, ArrowRight, CheckCircle2, AlertTriangle, Upload, UserPlus } from 'lucide-react';
import Modal from '@/components/Modal';

const PURPOSE_CODES = {
  "Trade & Goods": [
    "P0103 - Advance for Imports",
    "P0104 - Payment for Imports"
  ],
  "Services & Intangibles": [
    "S0102 - Trade in Services",
    "S0802 - Software License",
    "S1011 - Consultancy Fees",
    "S1014 - Engineering Services"
  ]
};

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'SG', name: 'Singapore' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'EU', name: 'European Union' },
  { code: 'IN', name: 'India' }
];

export default function ImportPaymentsPage() {
  const { counterparties, balances, fxRates, deductBalance, addTransaction, addToast, tier, markupMultiplier } = useMock();
  
  const [activeModal, setActiveModal] = useState<'initiate' | null>(null);
  
  // Form State
  const [vendorName, setVendorName] = useState(counterparties[0]?.name || '');
  const [newVendorAccount, setNewVendorAccount] = useState('');
  const [newVendorCountry, setNewVendorCountry] = useState('US');
  
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  // Compliance State
  const [hasTRC, setHasTRC] = useState(true);
  const [has15CB, setHas15CB] = useState(true);

  // Derived State
  const isExistingVendor = counterparties.some(c => c.name === vendorName);
  const invoiceVal = parseFloat(amount) || 0;
  
  // Cross Rate Calculation
  const currencyRateToUSD = fxRates[currency] || 1; 
  const usdEquivalent = invoiceVal / currencyRateToUSD;
  const inrBaseCost = usdEquivalent * (fxRates['INR'] || 83.5);
  const swiftFeeInr = SWIFT_FEE_USD * (fxRates['INR'] || 83.5);
  const totalInrToDebit = (inrBaseCost + swiftFeeInr) * markupMultiplier;

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (invoiceVal <= 0) return;
    
    if (balances.INR < totalInrToDebit) {
      return addToast('Failed', `Insufficient INR balance. You need ₹${totalInrToDebit.toLocaleString(undefined, { maximumFractionDigits: 2 })} to clear this invoice.`, 'error');
    }

    deductBalance('INR', totalInrToDebit);
    addTransaction({ 
      id: `TRX-${Math.floor(Math.random()*10000)}`, 
      type: 'Import', 
      amount: invoiceVal, 
      currency: currency, 
      status: 'Processing', 
      date: 'Just now' 
    });
    addToast('Payment Initiated', `Invoice ${invoiceRef} scheduled for T+0 settlement.`, 'success');
    setActiveModal(null);
    setAmount('');
    setInvoiceRef('');
    setAttachedFile(null);
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

      <Modal isOpen={activeModal === 'initiate'} onClose={() => setActiveModal(null)} title="Initiate Import Payment" width="700px">
        <form onSubmit={handleInitiate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Section 1: Beneficiary */}
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserPlus size={16} className="text-blue" /> Beneficiary Details
            </h4>
            <div className="form-group mb-4">
              <label className="form-label">Beneficiary Name (Select existing or type new)</label>
              <input 
                type="text" 
                list="vendor-list" 
                className="form-input" 
                value={vendorName} 
                onChange={e => setVendorName(e.target.value)} 
                required 
                placeholder="Start typing..."
              />
              <datalist id="vendor-list">
                {counterparties.map(cp => (
                  <option key={cp.id} value={cp.name} />
                ))}
              </datalist>
            </div>

            {!isExistingVendor && vendorName.length > 0 && (
              <div className="animate-fade-in flex gap-4 mt-4 pt-4" style={{ borderTop: '1px dashed var(--border-glass-solid)' }}>
                <div className="form-group" style={{ flex: 2 }}>
                  <label className="form-label">Account Number / IBAN</label>
                  <input type="text" className="form-input" value={newVendorAccount} onChange={e => setNewVendorAccount(e.target.value)} required placeholder="Required for new vendor" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Country</label>
                  <select className="form-select" value={newVendorCountry} onChange={e => setNewVendorCountry(e.target.value)} required>
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Invoice & Payment Type */}
          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Purpose Code</label>
              <select className="form-select" required>
                {Object.entries(PURPOSE_CODES).map(([group, codes]) => (
                  <optgroup key={group} label={group}>
                    {codes.map(code => <option key={code} value={code}>{code}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Invoice Amount</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="form-select" style={{ width: '100px' }} value={currency} onChange={e => setCurrency(e.target.value)}>
                  {Object.keys(balances).filter(c => c !== 'INR').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input type="number" className="form-input" style={{ flex: 1 }} placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
              </div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Invoice Reference</label>
              <input type="text" className="form-input" placeholder="INV-2026-001" value={invoiceRef} onChange={e => setInvoiceRef(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Documents (Invoice, Waybill)</label>
            <div style={{ position: 'relative', border: '1px dashed var(--border-glass-solid)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.01)', cursor: 'pointer' }}>
              <input 
                type="file" 
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
                onChange={(e) => setAttachedFile(e.target.files?.[0] || null)} 
              />
              {attachedFile ? (
                <>
                  <div style={{ width: '36px', height: '36px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{attachedFile.name}</p>
                    <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: 500 }}>Ready for compliance scan</p>
                  </div>
                </>
              ) : (
                <>
                  <Upload size={16} className="text-muted" />
                  <span className="text-muted" style={{ fontSize: '13px' }}>Click to upload files or drag and drop</span>
                </>
              )}
            </div>
          </div>
          
          {/* Section 3: Tax Engine */}
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Withholding Tax & Compliance</h4>
            
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: '13px' }}>Valid Tax Residency Certificate (TRC) & Form 10F on file?</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setHasTRC(true)} className={`badge ${hasTRC ? 'badge-blue' : 'text-muted'}`} style={{ cursor: 'pointer', border: hasTRC ? 'none' : '1px solid #e2e8f0' }}>Yes</button>
                <button type="button" onClick={() => setHasTRC(false)} className={`badge ${!hasTRC ? 'badge-yellow' : 'text-muted'}`} style={{ cursor: 'pointer', border: !hasTRC ? 'none' : '1px solid #e2e8f0' }}>No</button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: '13px' }}>Form 15CB (CA Certificate) uploaded?</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setHas15CB(true)} className={`badge ${has15CB ? 'badge-blue' : 'text-muted'}`} style={{ cursor: 'pointer', border: has15CB ? 'none' : '1px solid #e2e8f0' }}>Yes</button>
                <button type="button" onClick={() => setHas15CB(false)} className={`badge ${!has15CB ? 'badge-yellow' : 'text-muted'}`} style={{ cursor: 'pointer', border: !has15CB ? 'none' : '1px solid #e2e8f0' }}>No</button>
              </div>
            </div>

            {hasTRC && has15CB ? (
               <div className="flex items-center gap-2 text-green" style={{ fontSize: '12px', fontWeight: 500, padding: '10px', background: '#f0fdf4', borderRadius: '6px' }}>
                 <CheckCircle2 size={14} /> DTAA Benefit Claimed (Treaty Rates Apply) & RBI requirements satisfied.
               </div>
            ) : (
               <div className="flex items-center gap-2 text-amber-600" style={{ fontSize: '12px', fontWeight: 500, padding: '10px', background: '#fffbeb', borderRadius: '6px' }}>
                 <AlertTriangle size={14} /> Domestic IT Act Rates & Surcharge Apply. Missing documentation.
               </div>
            )}
          </div>

          {/* Pricing Preview */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cross Rate ({currency}/INR)</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>
                {currencyRateToUSD ? ( (1/currencyRateToUSD) * (fxRates['INR'] || 83.5) ).toFixed(4) : '0.0000'} INR
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Spread ({tier})</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{((markupMultiplier - 1) * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>SWIFT Wire Fee</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>${SWIFT_FEE_USD.toFixed(2)} (₹{swiftFeeInr.toLocaleString(undefined, { maximumFractionDigits: 0 })})</span>
            </div>
            <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid var(--border-glass-solid)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Cost to debit</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-blue)' }}>
                {amount ? `₹${totalInrToDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00'}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">Initiate Payment</button>
        </form>
      </Modal>

    </div>
  );
}
