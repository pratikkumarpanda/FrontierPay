"use client";
import { useState } from 'react';
import { User, Shield, Key, RefreshCw, Copy, Check, Settings as SettingsIcon } from 'lucide-react';
import { useMock } from '@/lib/MockContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'api'>('profile');
  const [copied, setCopied] = useState(false);
  const { addToast } = useMock();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-12">
         <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
              <SettingsIcon className="w-6 h-6 fill-current" />
            </div>
            Settings & Compliance
          </h1>
        <p className="text-slate-500 text-lg">Manage your SME profile, API keys, and regulatory KYC.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Settings Nav */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white/80 rounded-[2rem] p-4 shadow-sm border border-slate-200 sticky top-10">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all text-left w-full ${
                  activeTab === 'profile' 
                    ? 'text-brand-600 bg-brand-50 shadow-sm border border-brand-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                }`}
              >
                <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-brand-600' : 'text-slate-400'}`} /> 
                Company Profile
              </button>
              
              <button 
                onClick={() => setActiveTab('kyc')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all text-left w-full ${
                  activeTab === 'kyc' 
                    ? 'text-brand-600 bg-brand-50 shadow-sm border border-brand-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                }`}
              >
                <Shield className={`w-5 h-5 ${activeTab === 'kyc' ? 'text-brand-600' : 'text-slate-400'}`} /> 
                KYC & Documents
              </button>
              
              <button 
                onClick={() => setActiveTab('api')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all text-left w-full ${
                  activeTab === 'api' 
                    ? 'text-brand-600 bg-brand-50 shadow-sm border border-brand-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                }`}
              >
                <Key className={`w-5 h-5 ${activeTab === 'api' ? 'text-brand-600' : 'text-slate-400'}`} /> 
                API Keys
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 min-h-[600px]">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">Company Information</h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Legal Company Name</label>
                      <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-bold text-slate-900 transition-colors" defaultValue="Frontier Technologies Private Limited" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Registration Type</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-bold text-slate-900 transition-colors appearance-none cursor-pointer">
                        <option>Private Limited</option>
                        <option>LLP</option>
                        <option>Proprietorship</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">GSTIN</label>
                      <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-mono font-bold text-slate-900 transition-colors" defaultValue="27AADCF1234E1Z5" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">IEC (Import Export Code)</label>
                      <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-mono font-bold text-slate-900 transition-colors" defaultValue="0312014567" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Registered Address</label>
                    <textarea className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-bold text-slate-900 transition-colors resize-none" rows={3} defaultValue="Unit 402, Cyber City,\nGurgaon, Haryana\n122002"></textarea>
                  </div>

                  <div className="pt-6 border-t border-slate-200/60 flex justify-end">
                    <button type="button" onClick={() => addToast('Profile Saved', 'Your company information has been updated.', 'success')} className="px-10 py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KYC TAB */}
            {activeTab === 'kyc' && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Regulatory Documents</h2>
                  <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg border border-emerald-200 font-bold text-sm shadow-sm flex items-center gap-2">
                    <Check className="w-4 h-4" /> Fully Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Certificate of Incorporation', 'Director PAN', 'Board Resolution', 'Import/Export Code Certificate'].map((doc, idx) => (
                    <div key={idx} className="p-6 border-2 border-emerald-200 bg-emerald-50/30 rounded-2xl flex justify-between items-center group hover:bg-emerald-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                           <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{doc}</p>
                          <p className="text-xs text-slate-500 font-medium mt-1">Verified on 12 Aug 2025</p>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-brand-600 hover:text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Need to update directors?</h4>
                  <p className="text-sm text-slate-500 font-medium mb-4">Any change in UBO or directors requires a new KYC submission as per RBI guidelines.</p>
                  <button className="px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    Initiate KYC Update
                  </button>
                </div>
              </div>
            )}

            {/* API TAB */}
            {activeTab === 'api' && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Developer API Keys</h2>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-50 text-brand-700 font-bold rounded-xl border border-brand-200 hover:bg-brand-100 transition-colors shadow-sm">
                    <RefreshCw className="w-4 h-4" /> Roll Keys
                  </button>
                </div>

                <div className="mb-10">
                  <p className="text-slate-500 font-medium mb-6">Use these keys to authenticate your ERP (like SAP, Oracle, or NetSuite) with FrontierPay's treasury OS.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Live Secret Key</label>
                      <div className="flex items-center">
                        <div className="bg-slate-900 text-slate-300 font-mono text-sm p-5 rounded-l-2xl border border-slate-800 flex-1 overflow-x-auto shadow-inner tracking-wider">
                          sk_live_9a8b7c6d5e4f3g2h1i0j...
                        </div>
                        <button 
                          onClick={handleCopy}
                          className="bg-slate-800 text-white p-5 rounded-r-2xl border-y border-r border-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center min-w-[70px]"
                        >
                          {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                        </button>
                      </div>
                      <p className="text-xs text-amber-600 font-medium mt-2 bg-amber-50 inline-block px-3 py-1 rounded-lg border border-amber-200">
                        Never share this key in client-side code.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Webhook Secret</label>
                      <div className="flex items-center">
                         <div className="bg-slate-50 text-slate-700 font-mono text-sm p-5 rounded-2xl border-2 border-slate-200 flex-1 shadow-inner">
                          whsec_1234567890abcdef...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-brand-50/50 border border-brand-100 rounded-2xl">
                  <h4 className="text-sm font-bold text-brand-900 mb-2">Documentation</h4>
                  <p className="text-sm text-brand-700/80 font-medium mb-4">Read our developer guides for integrating payment flows.</p>
                  <a href="/developers" className="text-sm font-bold text-brand-600 hover:text-brand-700 underline underline-offset-2">
                    View API Docs &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
