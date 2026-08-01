"use client";
import React, { useState } from 'react';
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
  const markupMultiplier = 1.002; 
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
    
    setTimeout(() => setScanStep(1), 800); 
    setTimeout(() => setScanStep(2), 1600); 
    setTimeout(() => {
      setScanStep(3); 
      setIsScanning(false);
      setCurrentStep(4); 
    }, 2500);
  };

  const handleConfirmPay = () => {
    const inrBalance = balances['INR'] || 0;
    
    if (inrBalance < totalInrToDebit) {
      addToast('Insufficient INR Balance', `You need ₹${totalInrToDebit.toLocaleString()} to settle this transaction.`, 'error');
      return;
    }
    
    addBalance('INR', -totalInrToDebit);
    
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

  const getStepState = (stepNum: number) => {
      if (currentStep > stepNum) return 'step-completed';
      if (currentStep === stepNum) return 'step-active';
      return 'step-inactive';
  };

  const getStepLineState = (stepNum: number) => {
      return currentStep > stepNum ? 'w-full' : (currentStep === stepNum ? 'w-1/2' : 'w-0');
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-200 shadow-glass">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Transfer Initiated!</h2>
        <p className="text-slate-500 text-lg mb-8">
            Transaction ID: <span className="font-mono font-bold text-brand-600">#OUT-{Math.floor(Math.random() * 10000)}</span>
        </p>
        
        <div className="flex gap-4">
          <button onClick={() => window.location.href='/dashboard'} className="px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
              Return to Dashboard
          </button>
          <button onClick={() => window.location.href='/dashboard/transactions'} className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl shadow-card-hover hover:bg-brand-700 transition-colors">
              Track Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="text-brand-500"><ArrowRight className="w-6 h-6" /></span> 
            New Outflow Transfer
          </h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Available INR Balance</p>
          <p className="text-xl font-mono font-bold text-slate-900">
            ₹ {(balances['INR'] || 0).toLocaleString()}
          </p>
        </div>
      </header>

      {/* Tailwind Stepper */}
      <div className="mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
        
        <div className="flex justify-between relative z-10">
            {['Beneficiary', 'Payment', 'Compliance', 'Review'].map((label, i) => {
                const stepNum = i + 1;
                return (
                    <div key={stepNum} className="flex flex-col items-center cursor-pointer group" onClick={() => currentStep > stepNum && setCurrentStep(stepNum)}>
                        <div className={`step-circle mb-2 ${getStepState(stepNum)} group-hover:scale-110 transition-transform`}>
                            {currentStep > stepNum ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                        </div>
                        <span className={`text-xs font-semibold ${currentStep >= stepNum ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                    </div>
                )
            })}
        </div>
      </div>

      <div>
        
        {/* STEP 1: BENEFICIARY */}
        {currentStep === 1 && (
          <div className="glass-panel p-8 rounded-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-900">Who are you paying?</h3>
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
                <button className="px-4 py-1.5 text-xs font-bold bg-white text-brand-600 rounded shadow-sm">Saved</button>
                <button className="px-4 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700">New</button>
              </div>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search saved partners by name, country, or IBAN..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:shadow-input-focus transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filteredCounterparties.map(c => (
                <div 
                  key={c.name}
                  onClick={() => setSelectedBene(c)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedBene?.name === c.name ? 'border-brand-500 bg-brand-50 shadow-input-focus scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-glass'}`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.country}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-3">
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Last: Never</span>
                    {selectedBene?.name === c.name ? (
                      <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button 
                onClick={() => setCurrentStep(2)} 
                disabled={!selectedBene}
                className="px-8 py-3 bg-brand-600 text-white font-medium rounded-xl flex items-center gap-2 shadow-card-hover hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT DETAILS */}
        {currentStep === 2 && (
          <div className="glass-panel p-8 rounded-2xl animate-fade-in">
             <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-900">How much?</h3>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Live Rate (USD/INR)</p>
                <p className="text-xl font-mono font-bold text-slate-900 flex items-center gap-2 justify-end">
                  {(fxRates['INR'] || 83.5).toFixed(2)} 
                  <span className="text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-sans">+0.05%</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm focus-within:shadow-input-focus focus-within:border-brand-500 transition-all">
                   <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                     <span>You Send (USD)</span>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-4xl text-slate-300 font-light">$</span>
                     <input 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent text-4xl font-bold w-full outline-none text-slate-900 placeholder-slate-200"
                     />
                   </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-500 font-medium">Wholesale Rate</span>
                    <span className="font-mono font-medium text-slate-900">{(fxRates['INR'] || 83.5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-500 font-medium">Platform Fee (0.20%)</span>
                    <span className="font-mono font-medium text-slate-900">₹ {((inrBaseCost * 0.002)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-slate-500 font-medium">Network Wire Fee</span>
                    <span className="font-mono font-medium text-slate-900">${NETWORK_FEE_USD.toFixed(2)} <span className="text-slate-400 text-xs ml-1">(₹ {networkFeeInr.toLocaleString(undefined, { maximumFractionDigits: 0 })})</span></span>
                  </div>
                  <div className="h-px bg-slate-200 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total INR to Debit</span>
                    <span className="font-mono font-bold text-lg text-brand-600">
                      ₹ {invoiceVal ? totalInrToDebit.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-white rounded-2xl p-5 border border-slate-200 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rate Trend (24h)</h4>
                     <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-bold border border-emerald-100">Low Volatility</span>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 font-medium">
                     [Chart Rendering]
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3"/> Rate is locked for 60 mins upon confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button onClick={() => setCurrentStep(1)} className="px-6 py-3 text-slate-500 font-medium hover:text-slate-900 transition-colors">Back</button>
              <button onClick={() => setCurrentStep(3)} disabled={!invoiceVal} className="px-8 py-3 bg-brand-600 text-white font-medium rounded-xl flex items-center gap-2 shadow-card-hover hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLIANCE SHIELD */}
        {currentStep === 3 && (
          <div className="glass-panel p-8 rounded-2xl animate-fade-in">
             <h3 className="text-xl font-bold text-slate-900 mb-8">Compliance Shield</h3>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
               {/* Inputs */}
               <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Purpose of Payment (FEMA)</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:shadow-input-focus transition-all text-slate-900 font-medium" value={purposeCode} onChange={e => setPurposeCode(e.target.value)}>
                      <option>P0103 - Advance for Imports</option>
                      <option>P0102 - Settlement of Imports</option>
                      <option>S1107 - Software Consultancy</option>
                      <option>P0807 - Royalties & License Fees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Invoice Reference</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:shadow-input-focus transition-all text-slate-900 font-medium placeholder-slate-300" value={invoiceRef} onChange={e => setInvoiceRef(e.target.value)} placeholder="INV-2026-..." />
                  </div>

                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center relative cursor-pointer transition-all ${fileAttached ? 'border-emerald-500 bg-emerald-50' : 'border-brand-300 bg-brand-50 hover:bg-brand-100/50'}`}>
                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {!fileAttached ? (
                      <>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-brand-600">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-brand-900 text-sm">Upload Invoice / Bill of Entry</p>
                        <p className="text-xs text-brand-600 mt-1 font-medium">PDF, JPG (Max 5MB)</p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-emerald-500">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-emerald-900 text-sm">{invoiceRef || 'Invoice'}.pdf</p>
                        <p className="text-xs text-emerald-600 mt-1 font-bold">Ready for scan</p>
                      </>
                    )}
                  </div>
               </div>

               {/* Risk Scan Simulator */}
               <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-6">Real-time Risk Scan</h4>
                  
                  <div className="flex flex-col gap-5">
                    {/* OFAC */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-slate-500">OFAC / Sanctions Check</span>
                        <span className={scanStep >= 1 ? 'text-emerald-600' : 'text-slate-400'}>{scanStep >= 1 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-emerald-500 transition-all duration-700 ease-out ${scanStep >= 1 ? 'w-full' : (isScanning ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                    {/* IBAN */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-slate-500">Beneficiary Bank Validation</span>
                        <span className={scanStep >= 2 ? 'text-emerald-600' : 'text-slate-400'}>{scanStep >= 2 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-emerald-500 transition-all duration-700 ease-out ${scanStep >= 2 ? 'w-full' : (isScanning && scanStep >= 1 ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                    {/* OCR */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-slate-500">Invoice OCR Match</span>
                        <span className={scanStep >= 3 ? 'text-emerald-600' : 'text-slate-400'}>{scanStep >= 3 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-emerald-500 transition-all duration-700 ease-out ${scanStep >= 3 ? 'w-full' : (isScanning && scanStep >= 2 ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                  </div>

                  {scanStep >= 3 && (
                    <div className="mt-8 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 animate-slide-in">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-800">All Checks Passed. Ready for execution.</span>
                    </div>
                  )}
               </div>
             </div>

             <div className="flex justify-between pt-4 border-t border-slate-100">
              <button onClick={() => setCurrentStep(2)} className="px-6 py-3 text-slate-500 font-medium hover:text-slate-900 transition-colors">Back</button>
              <button onClick={startRiskScan} disabled={isScanning} className="px-8 py-3 bg-slate-900 text-white font-medium rounded-xl shadow-card-hover hover:bg-slate-800 disabled:opacity-50 disabled:cursor-wait transition-all">
                {isScanning ? 'Running Checks...' : 'Run Checks & Continue'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {currentStep === 4 && (
          <div className="glass-panel p-12 rounded-2xl animate-fade-in">
             <div className="text-center mb-10">
               <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100 shadow-sm">
                  <Building2 className="w-7 h-7 text-brand-600" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900">Confirm Transfer</h3>
               <p className="text-slate-500 text-sm mt-2 font-medium">Please review details carefully before authorizing.</p>
             </div>

             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-10 max-w-xl mx-auto shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Amount to Debit</span>
                  <span className="text-2xl font-mono font-bold text-slate-900">₹ {totalInrToDebit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">To</span>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{selectedBene?.name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{selectedBene?.account}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500 font-medium">Bank</span>
                    <span className="font-medium text-slate-900">{selectedBene?.country} Bank</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Fee Breakdown</span>
                    <div className="text-right">
                      <p className="font-mono font-medium text-slate-900">${NETWORK_FEE_USD.toFixed(2)} <span className="text-xs text-slate-400 font-sans ml-1">(Fixed)</span></p>
                      <p className="font-mono font-medium text-slate-900 mt-1">0.20% <span className="text-xs text-slate-400 font-sans ml-1">(FX Margin)</span></p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm items-center pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Value Date</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">T+0 (Today)</span>
                  </div>
                </div>
             </div>

             <div className="flex justify-center gap-4">
                <button onClick={() => setCurrentStep(3)} className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Edit</button>
                <button onClick={handleConfirmPay} className="px-10 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-card-hover hover:bg-emerald-600 flex items-center gap-2 transition-colors">
                  Confirm & Pay <CheckCircle2 className="w-5 h-5" />
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
