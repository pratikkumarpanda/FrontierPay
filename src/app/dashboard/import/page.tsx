"use client";
import React, { useState, useEffect } from 'react';
import { useMock, NETWORK_FEE_USD } from '@/lib/MockContext';
import { ArrowRight, CheckCircle2, Upload, Search, Building2, ShieldCheck, Clock } from 'lucide-react';

export default function ImportPaymentWizard() {
  const { balances, addBalance, addTransaction, addToast, fxRates, counterparties } = useMock();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Beneficiary
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBene, setSelectedBene] = useState<any>(null);
  
  // Step 2: Payment
  const [amount, setAmount] = useState('');
  const markupMultiplier = 1.002; // 0.2% markup for demo
  const invoiceVal = parseFloat(amount) || 0;
  const inrBaseCost = invoiceVal * (fxRates['INR'] || 83.5);
  const networkFeeInr = NETWORK_FEE_USD * (fxRates['INR'] || 83.5);
  const totalInrToDebit = (inrBaseCost + networkFeeInr) * markupMultiplier;

  // Step 3: Compliance
  const [purposeCode, setPurposeCode] = useState('P0103 - Advance for Imports');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [fileAttached, setFileAttached] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Success Screen
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredCounterparties = counterparties.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileAttached(true);
    }
  };

  const startRiskScan = () => {
    if (!invoiceVal || !selectedBene || !fileAttached) {
      addToast('Missing Info', 'Please attach required documents and ensure amount is filled.', 'error');
      return;
    }
    
    setIsScanning(true);
    setScanStep(0);
    
    setTimeout(() => setScanStep(1), 800); // OFAC Check
    setTimeout(() => setScanStep(2), 1600); // IBAN Validation
    setTimeout(() => {
      setScanStep(3); // OCR Match
      setIsScanning(false);
      setCurrentStep(4); // Move to Review
    }, 2500);
  };

  const handleConfirmPay = () => {
    const inrBalance = balances['INR'] || 0;
    
    if (inrBalance < totalInrToDebit) {
      addToast('Insufficient INR Balance', `You need ₹${totalInrToDebit.toLocaleString()} to settle this transaction.`, 'error');
      return;
    }
    
    // Deduct INR
    addBalance('INR', -totalInrToDebit);
    
    // Add Transaction record
    addTransaction({
      id: `TX-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      amount: -invoiceVal,
      currency: 'USD',
      status: 'Processing',
      type: 'Import'
    });
    
    setIsSuccess(true);
  };

  // Helper styles for stepper
  const getStepClass = (step: number) => {
    if (currentStep > step) return { bg: '#10b981', text: 'white', border: '#10b981' }; // Completed (Green)
    if (currentStep === step) return { bg: 'var(--primary-blue)', text: 'white', border: 'var(--primary-blue)', shadow: '0 0 0 4px rgba(14,165,233,0.2)' }; // Active
    return { bg: 'white', text: 'var(--text-muted)', border: 'var(--border-glass-solid)' }; // Inactive
  };

  const progressWidth = ((currentStep - 1) / 3) * 100;

  if (isSuccess) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <div style={{ width: '80px', height: '80px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid #a7f3d0' }}>
          <CheckCircle2 size={40} style={{ color: '#10b981' }} />
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Transfer Initiated!</h2>
        <p className="text-muted" style={{ fontSize: '18px', marginBottom: '32px' }}>Transaction ID: <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary-blue)' }}>#OUT-{Math.floor(Math.random() * 10000)}</span></p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => window.location.href='/dashboard'} className="btn" style={{ background: 'white', color: 'var(--text-primary)', border: '1px solid var(--border-glass-solid)' }}>Return to Dashboard</button>
          <button onClick={() => window.location.href='/dashboard/transactions'} className="btn btn-primary">Track Status</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
      
      {/* Header */}
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--primary-blue)' }}><ArrowRight size={24} /></span> New Outflow Transfer
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Available INR Balance</p>
          <p style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'monospace' }}>
            ₹ {(balances['INR'] || 0).toLocaleString()}
          </p>
        </div>
      </header>

      {/* Stepper */}
      <div style={{ maxWidth: '800px', margin: '0 auto 48px auto', position: 'relative' }}>
        {/* Connecting Line */}
        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '2px', background: 'var(--border-glass-solid)', zIndex: 0, transform: 'translateY(-50%)' }} />
        {/* Active Line */}
        <div style={{ position: 'absolute', top: '50%', left: '0', width: `${progressWidth}%`, height: '2px', background: 'var(--primary-blue)', zIndex: 0, transform: 'translateY(-50%)', transition: 'width 0.3s ease' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
          {['Beneficiary', 'Payment', 'Compliance', 'Review'].map((label, i) => {
            const step = i + 1;
            const styles = getStepClass(step);
            return (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: currentStep > step ? 'pointer' : 'default' }} onClick={() => currentStep > step && setCurrentStep(step)}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  background: styles.bg, color: styles.text, border: `2px solid ${styles.border}`,
                  boxShadow: styles.shadow || 'none', fontWeight: 600, transition: 'all 0.3s ease'
                }}>
                  {currentStep > step ? <CheckCircle2 size={20} /> : step}
                </div>
                <p style={{ fontSize: '12px', fontWeight: currentStep === step ? 700 : 500, color: currentStep >= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* STEP 1: BENEFICIARY */}
        {currentStep === 1 && (
          <div className="glass-panel" style={{ padding: '32px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Who are you paying?</h3>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)' }}>
                <button style={{ padding: '4px 12px', fontSize: '12px', fontWeight: 600, background: 'white', color: 'var(--primary-blue)', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Saved</button>
                <button style={{ padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>New</button>
              </div>
            </div>

            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search saved partners by name, country, or IBAN..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1px solid var(--border-glass-solid)', background: '#f8fafc', fontSize: '14px' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {filteredCounterparties.map(c => (
                <div 
                  key={c.name}
                  onClick={() => setSelectedBene(c)}
                  style={{ 
                    padding: '16px', 
                    borderRadius: '12px', 
                    border: `2px solid ${selectedBene?.name === c.name ? 'var(--primary-blue)' : 'var(--border-glass-solid)'}`,
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedBene?.name === c.name ? '0 0 0 4px rgba(14,165,233,0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.country}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last: Never</span>
                    {selectedBene?.name === c.name ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--primary-blue)' }} />
                    ) : (
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--border-glass-solid)' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setCurrentStep(2)} 
                disabled={!selectedBene}
                className="btn btn-primary" 
                style={{ padding: '12px 32px', opacity: selectedBene ? 1 : 0.5 }}
              >
                Continue <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT DETAILS */}
        {currentStep === 2 && (
          <div className="glass-panel" style={{ padding: '32px', animation: 'fadeIn 0.3s ease' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>How much?</h3>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Live Rate (USD/INR)</p>
                <p style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'monospace' }}>{(fxRates['INR'] || 83.5).toFixed(2)} <span style={{ color: '#10b981', fontSize: '12px', background: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>+0.05%</span></p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              {/* Left Column */}
              <div>
                <div style={{ background: 'white', border: '1px solid var(--border-glass-solid)', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                     <span>You Send (USD)</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <span style={{ fontSize: '24px', color: 'var(--text-muted)', fontWeight: 300 }}>$</span>
                     <input 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        style={{ border: 'none', background: 'transparent', fontSize: '36px', fontWeight: 700, width: '100%', outline: 'none' }}
                     />
                   </div>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-glass-solid)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Wholesale Rate</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{(fxRates['INR'] || 83.5).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Platform Fee (0.20%)</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>₹ {((inrBaseCost * 0.002)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Network Wire Fee</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>${NETWORK_FEE_USD.toFixed(2)} (₹ {networkFeeInr.toLocaleString(undefined, { maximumFractionDigits: 0 })})</span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border-glass-solid)', margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                    <span style={{ fontWeight: 700 }}>Total INR to Debit</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary-blue)' }}>
                      ₹ {invoiceVal ? totalInrToDebit.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-glass-solid)', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                     <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rate Trend (24h)</h4>
                     <span style={{ fontSize: '10px', color: '#10b981', background: '#ecfdf5', padding: '4px 8px', borderRadius: '12px', fontWeight: 700 }}>Low Volatility</span>
                  </div>
                  <div style={{ height: '150px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '12px', border: '1px dashed var(--border-glass-solid)' }}>
                     [Chart Rendering]
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}><Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/>Rate is locked for 60 mins upon confirmation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setCurrentStep(1)} className="btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>Back</button>
              <button onClick={() => setCurrentStep(3)} disabled={!invoiceVal} className="btn btn-primary" style={{ padding: '12px 32px', opacity: invoiceVal ? 1 : 0.5 }}>
                Continue <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLIANCE SHIELD */}
        {currentStep === 3 && (
          <div className="glass-panel" style={{ padding: '32px', animation: 'fadeIn 0.3s ease' }}>
             <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Compliance Shield</h3>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
               {/* Inputs */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="form-group">
                    <label className="form-label">Purpose of Payment (FEMA)</label>
                    <select className="form-select" value={purposeCode} onChange={e => setPurposeCode(e.target.value)}>
                      <option>P0103 - Advance for Imports</option>
                      <option>P0102 - Settlement of Imports</option>
                      <option>S1107 - Software Consultancy</option>
                      <option>P0807 - Royalties & License Fees</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Invoice Reference</label>
                    <input type="text" className="form-input" value={invoiceRef} onChange={e => setInvoiceRef(e.target.value)} placeholder="INV-2026-..." />
                  </div>

                  <div 
                    style={{ 
                      border: '2px dashed var(--primary-blue)', 
                      background: '#f0f9ff',
                      borderRadius: '16px', 
                      padding: '32px', 
                      textAlign: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input type="file" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                    {!fileAttached ? (
                      <>
                        <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                          <Upload size={20} style={{ color: 'var(--primary-blue)' }} />
                        </div>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Upload Invoice / Bill of Entry</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>PDF, JPG (Max 5MB)</p>
                      </>
                    ) : (
                      <>
                        <div style={{ width: '48px', height: '48px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                          <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                        </div>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{invoiceRef || 'Invoice'}.pdf</p>
                        <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>Ready for scan</p>
                      </>
                    )}
                  </div>
               </div>

               {/* Risk Scan Simulator */}
               <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid var(--border-glass-solid)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>Real-time Risk Scan</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* OFAC */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>OFAC / Sanctions Check</span>
                        <span style={{ color: scanStep >= 1 ? '#10b981' : 'var(--text-muted)' }}>{scanStep >= 1 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-glass-solid)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#10b981', width: scanStep >= 1 ? '100%' : (isScanning ? '50%' : '0%'), transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                    {/* IBAN */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Beneficiary Bank Validation</span>
                        <span style={{ color: scanStep >= 2 ? '#10b981' : 'var(--text-muted)' }}>{scanStep >= 2 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-glass-solid)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#10b981', width: scanStep >= 2 ? '100%' : (isScanning && scanStep >= 1 ? '50%' : '0%'), transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                    {/* OCR */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Invoice OCR Match</span>
                        <span style={{ color: scanStep >= 3 ? '#10b981' : 'var(--text-muted)' }}>{scanStep >= 3 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-glass-solid)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#10b981', width: scanStep >= 3 ? '100%' : (isScanning && scanStep >= 2 ? '50%' : '0%'), transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  </div>

                  {scanStep >= 3 && (
                    <div style={{ marginTop: '24px', padding: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={16} style={{ color: '#10b981' }} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#047857' }}>All Checks Passed. Ready for execution.</span>
                    </div>
                  )}
               </div>
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setCurrentStep(2)} className="btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)' }}>Back</button>
              <button onClick={startRiskScan} disabled={isScanning} className="btn btn-primary" style={{ padding: '12px 32px', background: '#0f172a' }}>
                {isScanning ? 'Running Checks...' : 'Run Checks & Continue'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {currentStep === 4 && (
          <div className="glass-panel" style={{ padding: '48px 32px', animation: 'fadeIn 0.3s ease' }}>
             <div style={{ textAlign: 'center', marginBottom: '32px' }}>
               <div style={{ width: '64px', height: '64px', background: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid #bae6fd' }}>
                  <Building2 size={24} style={{ color: 'var(--primary-blue)' }} />
               </div>
               <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Confirm Transfer</h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Please review details carefully before authorizing.</p>
             </div>

             <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-glass-solid)', overflow: 'hidden', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-glass-solid)', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Amount to Debit</span>
                  <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace' }}>₹ {totalInrToDebit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>To</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 700 }}>{selectedBene?.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedBene?.account}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Bank</span>
                    <span>{selectedBene?.country} Bank</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Fee Breakdown</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'monospace' }}>${NETWORK_FEE_USD.toFixed(2)} <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>(Fixed)</span></p>
                      <p style={{ fontFamily: 'monospace' }}>0.20% <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>(FX Margin)</span></p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Value Date</span>
                    <span style={{ fontWeight: 700 }}>T+0 (Today)</span>
                  </div>
                </div>
             </div>

             <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button onClick={() => setCurrentStep(3)} className="btn" style={{ background: 'white', border: '1px solid var(--border-glass-solid)', padding: '12px 32px' }}>Edit</button>
                <button onClick={handleConfirmPay} className="btn btn-primary" style={{ background: '#10b981', padding: '12px 32px', width: '250px' }}>
                  Confirm & Pay <CheckCircle2 size={16} style={{ marginLeft: '8px' }} />
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
