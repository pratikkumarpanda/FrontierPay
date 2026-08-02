"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMock, NETWORK_FEE_USD } from '@/lib/MockContext';
import { ArrowRight, CheckCircle2, Upload, Search, Building2, ShieldCheck, Clock, Activity, Loader2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const rateData = [
  { time: '00:00', rate: 83.42 },
  { time: '04:00', rate: 83.45 },
  { time: '08:00', rate: 83.40 },
  { time: '12:00', rate: 83.48 },
  { time: '16:00', rate: 83.51 },
  { time: '20:00', rate: 83.49 },
  { time: '24:00', rate: 83.50 },
];

export default function ImportPaymentWizard() {
  const router = useRouter();
  const { balances, addBalance, addTransaction, addToast, fxRates, counterparties } = useMock();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Beneficiary
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBene, setSelectedBene] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'saved' | 'new'>('saved');

  // New Beneficiary Form state
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newBank, setNewBank] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newSwift, setNewSwift] = useState('');
  const [newFormError, setNewFormError] = useState('');
  
  // Step 2: Payment
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const markupMultiplier = 1.002; 
  const invoiceVal = parseFloat(amount) || 0;
  
  const getRateForCurrency = (curr: string) => {
    if (curr === 'USD') return fxRates['INR'] || 83.5;
    const currRate = fxRates[curr] || 1;
    const inrRate = fxRates['INR'] || 83.5;
    return inrRate / currRate;
  }
  
  const currentRate = getRateForCurrency(currency);
  const inrBaseCost = invoiceVal * currentRate;
  const networkFeeInr = NETWORK_FEE_USD * (fxRates['INR'] || 83.5);
  const totalInrToDebit = (inrBaseCost + networkFeeInr) * markupMultiplier;

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      case 'SGD': return 'S$';
      default: return '$';
    }
  }

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

  const handleAddNewBeneficiary = () => {
    if (!newName.trim()) {
      setNewFormError('Beneficiary name is required.');
      return;
    }
    if (!newCountry.trim()) {
      setNewFormError('Country is required.');
      return;
    }
    if (!newAccount.trim()) {
      setNewFormError('Account / IBAN is required.');
      return;
    }
    setNewFormError('');
    const created = {
      name: newName.trim(),
      country: newCountry.trim(),
      account: newAccount.trim(),
      bank: newBank.trim() || `${newCountry.trim()} Bank`,
      swift: newSwift.trim(),
    };
    setSelectedBene(created);
    addToast('Beneficiary Added', `"${created.name}" has been set as your beneficiary.`, 'success');
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
      currency: currency,
      status: 'Processing',
      type: 'Import'
    });
    
    setIsSuccess(true);
  };

  const getStepState = (stepNum: number) => {
      if (currentStep > stepNum) return 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-400';
      if (currentStep === stepNum) return 'bg-brand-600 text-white shadow-[0_0_20px_rgba(2,132,199,0.6)] border-brand-400 ring-4 ring-brand-500/20';
      return 'bg-white text-slate-400 border-slate-200';
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce-subtle">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Transfer Initiated!</h2>
        <p className="text-slate-500 text-xl mb-10 text-center max-w-md">
            Transaction ID: <span className="font-mono font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg border border-brand-100">#OUT-{Math.floor(Math.random() * 10000)}</span>
        </p>
        
        <div className="flex gap-4">
          <button onClick={() => router.push('/dashboard')} className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              Return to Dashboard
          </button>
          <button onClick={() => router.push('/dashboard/transactions')} className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all">
              Track Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20 relative">
      
      {/* Premium Header */}
      <header className="mb-12 flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <ArrowRight className="w-6 h-6" />
            </div>
            New Outflow Transfer
          </h1>
        </div>
        <div className="text-right bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/40 shadow-sm">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Available INR Balance</p>
          <p className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            ₹ {(balances['INR'] || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </header>

      {/* Premium Stepper */}
      <div className="mb-14 relative px-8 z-10">
        <div className="absolute top-1/2 left-8 right-8 h-1.5 bg-slate-200 -translate-y-1/2 z-0 rounded-full overflow-hidden">
           <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700 ease-in-out rounded-full" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
        </div>
        
        <div className="flex justify-between relative z-10">
            {['Beneficiary', 'Payment', 'Compliance', 'Review'].map((label, i) => {
                const stepNum = i + 1;
                return (
                    <div key={stepNum} className="flex flex-col items-center cursor-pointer group" onClick={() => currentStep > stepNum && setCurrentStep(stepNum)}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 mb-3 relative group-hover:scale-110 ${getStepState(stepNum)}`}>
                            {currentStep > stepNum ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${currentStep >= stepNum ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
                    </div>
                )
            })}
        </div>
      </div>

      <div className="relative z-10">
        
        {/* STEP 1: BENEFICIARY */}
        {currentStep === 1 && (
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 animate-slide-in">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Who are you paying?</h3>
                <p className="text-slate-500 font-medium">Select an existing counterparty or add a new one.</p>
              </div>
              {/* Saved / New Tab Toggle */}
              <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 shadow-inner">
                <button
                  onClick={() => { setActiveTab('saved'); setSelectedBene(null); }}
                  className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'saved' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Saved
                </button>
                <button
                  onClick={() => { setActiveTab('new'); setSelectedBene(null); }}
                  className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'new' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  New
                </button>
              </div>
            </div>

            {/* ── SAVED TAB ── */}
            {activeTab === 'saved' && (
              <>
                <div className="relative mb-8 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search saved partners by name, country, or IBAN..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-brand-500 rounded-2xl text-base font-medium focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {filteredCounterparties.map(c => (
                    <div 
                      key={c.name}
                      onClick={() => setSelectedBene(selectedBene?.name === c.name ? null : c)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                        selectedBene?.name === c.name 
                          ? 'border-brand-500 bg-brand-50/50 shadow-lg shadow-brand-500/10 scale-[1.02]' 
                          : 'border-slate-200 bg-white hover:border-brand-300 hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {selectedBene?.name === c.name && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      )}
                      <div className="flex items-center gap-5 mb-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
                          selectedBene?.name === c.name ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand-500/40' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 transition-colors'
                        }`}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-bold text-slate-900">{c.name}</div>
                          <div className="text-sm text-slate-500 font-medium">{c.country}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100/80 relative z-10">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-bold">Last TX: Never</span>
                        {selectedBene?.name === c.name ? (
                          <CheckCircle2 className="w-5 h-5 text-brand-600 animate-fade-in" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-brand-300 transition-colors" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── NEW BENEFICIARY TAB ── */}
            {activeTab === 'new' && (
              <div className="animate-fade-in">
                {/* Show a confirmation card if beneficiary was already created */}
                {selectedBene && (
                  <div className="mb-8 p-6 rounded-2xl border-2 border-brand-500 bg-brand-50/50 shadow-lg shadow-brand-500/10 flex items-center gap-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-brand-500/30 flex-shrink-0 relative z-10">
                      {selectedBene.name.charAt(0)}
                    </div>
                    <div className="relative z-10 flex-1">
                      <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-0.5">Beneficiary Set</p>
                      <p className="text-lg font-bold text-slate-900">{selectedBene.name}</p>
                      <p className="text-sm text-slate-500 font-medium">{selectedBene.country}{selectedBene.bank ? ` · ${selectedBene.bank}` : ''}</p>
                    </div>
                    <CheckCircle2 className="w-7 h-7 text-brand-500 flex-shrink-0 relative z-10" />
                  </div>
                )}

                <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">New Beneficiary Details</p>
                      <p className="text-sm text-slate-500">Fill in the recipient&apos;s banking information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Beneficiary Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Beneficiary Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="e.g. Acme Exports Ltd."
                        className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl px-5 py-4 text-base font-semibold text-slate-900 placeholder-slate-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCountry}
                        onChange={e => setNewCountry(e.target.value)}
                        placeholder="e.g. United States"
                        className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl px-5 py-4 text-base font-semibold text-slate-900 placeholder-slate-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                      />
                    </div>

                    {/* Bank Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={newBank}
                        onChange={e => setNewBank(e.target.value)}
                        placeholder="e.g. JPMorgan Chase"
                        className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl px-5 py-4 text-base font-semibold text-slate-900 placeholder-slate-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                      />
                    </div>

                    {/* Account / IBAN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Account No. / IBAN <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newAccount}
                        onChange={e => setNewAccount(e.target.value)}
                        placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
                        className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl px-5 py-4 text-base font-mono text-slate-900 placeholder-slate-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                      />
                    </div>

                    {/* SWIFT / BIC */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        SWIFT / BIC Code
                      </label>
                      <input
                        type="text"
                        value={newSwift}
                        onChange={e => setNewSwift(e.target.value.toUpperCase())}
                        placeholder="e.g. CHASUS33"
                        maxLength={11}
                        className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl px-5 py-4 text-base font-mono text-slate-900 placeholder-slate-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {newFormError && (
                    <p className="mt-4 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 px-4 py-3 rounded-xl animate-fade-in">
                      ⚠ {newFormError}
                    </p>
                  )}

                  {/* Add Beneficiary Button */}
                  <div className="mt-8">
                    <button
                      onClick={handleAddNewBeneficiary}
                      className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Confirm Beneficiary
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-slate-200/60 mt-6">
              <button 
                onClick={() => setCurrentStep(2)} 
                disabled={!selectedBene}
                className="px-10 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-lg rounded-2xl flex items-center gap-3 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT DETAILS */}
        {currentStep === 2 && (
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 animate-slide-in">
             <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">How much to send?</h3>
                <p className="text-slate-500 font-medium">Enter the exact invoice amount in USD.</p>
              </div>
              <div className="text-right bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200/60">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Live Rate ({currency}/INR)</p>
                <p className="text-2xl font-mono font-bold text-slate-900 flex items-center gap-3 justify-end">
                  {currentRate.toFixed(2)} 
                  <span className="text-emerald-600 text-xs bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 font-sans shadow-sm">+0.05%</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
              {/* Left Column */}
              <div>
                <div className="bg-white border-2 border-slate-200 rounded-[1.5rem] p-8 mb-6 shadow-sm focus-within:shadow-[0_0_25px_rgba(14,165,233,0.15)] focus-within:border-brand-500 transition-all group relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-focus-within:bg-brand-500 transition-colors"></div>
                   <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                     <span>You Send ({currency})</span>
                     <select 
                       value={currency} 
                       onChange={(e) => setCurrency(e.target.value)}
                       className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 outline-none font-bold"
                     >
                       <option value="USD">USD</option>
                       <option value="EUR">EUR</option>
                       <option value="GBP">GBP</option>
                       <option value="SGD">SGD</option>
                       <option value="JPY">JPY</option>
                     </select>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-5xl text-slate-300 font-light">{getCurrencySymbol(currency)}</span>
                     <input 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent text-5xl font-bold w-full outline-none text-slate-900 placeholder-slate-200 tracking-tight"
                     />
                   </div>
                </div>

                <div className="bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-[1.5rem] p-8 border border-slate-200/80 shadow-inner">
                  <div className="flex justify-between text-base mb-4">
                    <span className="text-slate-500 font-medium">Wholesale Rate</span>
                    <span className="font-mono font-bold text-slate-900">{currentRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base mb-4">
                    <span className="text-slate-500 font-medium">Platform Fee <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded ml-1">0.20%</span></span>
                    <span className="font-mono font-bold text-slate-900">₹ {((inrBaseCost * 0.002)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-base mb-6">
                    <span className="text-slate-500 font-medium">Network Wire Fee</span>
                    <span className="font-mono font-bold text-slate-900">${NETWORK_FEE_USD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-slate-400 text-sm ml-1 font-medium">(₹ {networkFeeInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })})</span></span>
                  </div>
                  <div className="h-px bg-slate-200/80 my-6"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-lg">Total INR to Debit</span>
                    <span className="font-mono font-bold text-2xl text-brand-600">
                      ₹ {invoiceVal ? totalInrToDebit.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-white rounded-[1.5rem] p-8 border border-slate-200 h-full flex flex-col shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-6 relative z-10">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rate Trend (24h)</h4>
                     <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg font-bold border border-emerald-200 shadow-sm flex items-center gap-1.5">
                       <Activity className="w-3 h-3" /> Low Volatility
                     </span>
                  </div>
                  <div className="flex-1 rounded-2xl relative z-10 w-full h-[180px] mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={rateData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                           <defs>
                              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} hide />
                           <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#rateGradient)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-6 relative z-10">
                    <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2 bg-slate-50 py-3 rounded-xl border border-slate-100">
                      <Clock className="w-4 h-4 text-brand-500"/> Rate is locked for 60 mins upon confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-200/60">
              <button onClick={() => setCurrentStep(1)} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors">Back</button>
              <button onClick={() => setCurrentStep(3)} disabled={!invoiceVal} className="px-10 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-lg rounded-2xl flex items-center gap-3 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all">
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLIANCE SHIELD */}
        {currentStep === 3 && (
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 animate-slide-in">
             <div className="mb-10">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-brand-600" />
                  Compliance Shield
                </h3>
                <p className="text-slate-500 font-medium">AI-driven validation to ensure regulatory compliance before execution.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
               {/* Inputs */}
               <div className="flex flex-col gap-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Purpose of Payment (FEMA)</label>
                    <select className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all text-slate-900 font-bold cursor-pointer appearance-none" value={purposeCode} onChange={e => setPurposeCode(e.target.value)}>
                      <option>P0103 - Advance for Imports</option>
                      <option>P0102 - Settlement of Imports</option>
                      <option>S1107 - Software Consultancy</option>
                      <option>P0807 - Royalties & License Fees</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Invoice Reference</label>
                    <input type="text" className="w-full bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all text-slate-900 font-bold placeholder-slate-300" value={invoiceRef} onChange={e => setInvoiceRef(e.target.value)} placeholder="INV-2026-..." />
                  </div>

                  <div className={`border-2 border-dashed rounded-[1.5rem] p-10 text-center relative cursor-pointer transition-all duration-300 group ${fileAttached ? 'border-emerald-400 bg-emerald-50/50 shadow-inner' : 'border-slate-300 bg-slate-50 hover:bg-brand-50 hover:border-brand-400'}`}>
                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {!fileAttached ? (
                      <>
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-200 text-brand-600 group-hover:scale-110 group-hover:shadow-md transition-all">
                          <Upload className="w-7 h-7" />
                        </div>
                        <p className="font-bold text-slate-900 text-lg mb-1">Upload Invoice Document</p>
                        <p className="text-sm text-slate-500 font-medium">Drag & drop or click to browse (PDF, JPG)</p>
                      </>
                    ) : (
                      <div className="animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-bold text-emerald-900 text-lg mb-1">{invoiceRef || 'Invoice_Document'}.pdf</p>
                        <p className="text-sm text-emerald-700 font-bold">Successfully Attached</p>
                      </div>
                    )}
                  </div>
               </div>

               {/* Risk Scan Simulator */}
               <div className="bg-slate-900 rounded-[1.5rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <h4 className="text-base font-bold text-white tracking-tight">Real-time Risk Scan</h4>
                    {isScanning && <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />}
                  </div>
                  
                  <div className="flex flex-col gap-8 relative z-10">
                    {/* OFAC */}
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-3">
                        <span className="text-slate-300">OFAC / Sanctions Check</span>
                        <span className={scanStep >= 1 ? 'text-emerald-400' : 'text-slate-500'}>{scanStep >= 1 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.8)] ${scanStep >= 1 ? 'w-full' : (isScanning ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                    {/* IBAN */}
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-3">
                        <span className="text-slate-300">Beneficiary Bank Validation</span>
                        <span className={scanStep >= 2 ? 'text-emerald-400' : 'text-slate-500'}>{scanStep >= 2 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.8)] ${scanStep >= 2 ? 'w-full' : (isScanning && scanStep >= 1 ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                    {/* OCR */}
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-3">
                        <span className="text-slate-300">Invoice OCR Match</span>
                        <span className={scanStep >= 3 ? 'text-emerald-400' : 'text-slate-500'}>{scanStep >= 3 ? 'Passed' : 'Pending'}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.8)] ${scanStep >= 3 ? 'w-full' : (isScanning && scanStep >= 2 ? 'w-1/2' : 'w-0')}`} />
                      </div>
                    </div>
                  </div>

                  {scanStep >= 3 && (
                    <div className="mt-10 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 animate-slide-in backdrop-blur-sm">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-emerald-300">All Checks Passed</p>
                        <p className="text-xs text-emerald-400/80 font-medium">Ready for execution</p>
                      </div>
                    </div>
                  )}
               </div>
             </div>

             <div className="flex justify-between pt-6 border-t border-slate-200/60">
              <button onClick={() => setCurrentStep(2)} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors">Back</button>
              <button onClick={startRiskScan} disabled={isScanning} className="px-10 py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 disabled:opacity-50 disabled:cursor-wait transition-all hover:-translate-y-0.5">
                {isScanning ? 'Running Checks...' : 'Run Checks & Continue'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {currentStep === 4 && (
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 animate-slide-in">
             <div className="mb-10 text-center">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Review & Confirm</h3>
                <p className="text-slate-500 font-medium">Please verify all details before executing this payment.</p>
             </div>

             <div className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden mb-12 max-w-2xl mx-auto shadow-lg shadow-slate-200/50 relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-400 to-brand-600"></div>
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center pl-10">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Transfer Amount</span>
                  <span className="text-4xl font-mono font-bold text-slate-900 tracking-tighter">${invoiceVal.toLocaleString('en-US')}</span>
                </div>
                <div className="p-10 flex flex-col gap-6 pl-12">
                  <div className="flex justify-between text-base">
                    <span className="text-slate-500 font-medium">To</span>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-lg">{selectedBene?.name}</p>
                      <p className="text-sm text-slate-400 font-medium mt-1">{selectedBene?.account}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-base items-center">
                    <span className="text-slate-500 font-medium">Bank</span>
                    <span className="font-bold text-slate-900">{selectedBene?.bank || `${selectedBene?.country} Bank`}</span>
                  </div>
                  {selectedBene?.swift && (
                    <div className="flex justify-between text-base items-center">
                      <span className="text-slate-500 font-medium">SWIFT / BIC</span>
                      <span className="font-mono font-bold text-slate-900">{selectedBene.swift}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base">
                    <span className="text-slate-500 font-medium">Fee Breakdown</span>
                    <div className="text-right">
                      <p className="font-mono font-bold text-slate-900">${NETWORK_FEE_USD.toFixed(2)} <span className="text-xs text-slate-400 font-sans ml-1 font-medium">(Fixed)</span></p>
                      <p className="font-mono font-bold text-slate-900 mt-2">0.20% <span className="text-xs text-slate-400 font-sans ml-1 font-medium">(FX Margin)</span></p>
                    </div>
                  </div>
                  <div className="flex justify-between text-base items-center pt-6 mt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Value Date</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-sm">T+0 (Today)</span>
                  </div>
                </div>
             </div>

             <div className="flex justify-center gap-6">
                <button onClick={() => setCurrentStep(3)} className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">Edit Details</button>
                <button onClick={handleConfirmPay} className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center gap-3 transition-all">
                  Authorize & Pay <CheckCircle2 className="w-6 h-6" />
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
