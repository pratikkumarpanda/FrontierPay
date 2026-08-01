"use client";
import { useState } from 'react';
import { User, Shield, Key, RefreshCw, Copy, Check } from 'lucide-react';
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
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Settings & Compliance</h1>
        <p className="text-muted">Manage your SME profile, API keys, and regulatory KYC.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
        
        {/* Settings Nav */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left w-full transition-all ${activeTab === 'profile' ? 'text-blue bg-[#eff6ff] font-medium' : 'text-muted hover-bg-subtle bg-transparent'}`}
          >
            <User size={18} /> Company Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('kyc')}
            className={`flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left w-full transition-all ${activeTab === 'kyc' ? 'text-blue bg-[#eff6ff] font-medium' : 'text-muted hover-bg-subtle bg-transparent'}`}
          >
            <Shield size={18} /> KYC & Documents
          </button>
          
          <button 
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-3 p-3 rounded-lg border-none cursor-pointer text-left w-full transition-all ${activeTab === 'api' ? 'text-blue bg-[#eff6ff] font-medium' : 'text-muted hover-bg-subtle bg-transparent'}`}
          >
            <Key size={18} /> API Keys
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '32px', minHeight: '500px' }}>
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="font-semibold" style={{ fontSize: '20px', marginBottom: '24px' }}>Company Information</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Legal Company Name</label>
                    <input type="text" className="form-input" defaultValue="Frontier Technologies Private Limited" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Registration Type</label>
                    <select className="form-select">
                      <option>Private Limited</option>
                      <option>LLP</option>
                      <option>Proprietorship</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">GSTIN</label>
                    <input type="text" className="form-input" defaultValue="27AADCF1234E1Z5" />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">IEC (Import Export Code)</label>
                    <input type="text" className="form-input" defaultValue="0312014567" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Registered Address</label>
                  <textarea className="form-input" rows={3} defaultValue="Unit 402, Cyber City, Gurgaon, Haryana 122002"></textarea>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <button type="button" onClick={() => addToast('Profile Saved', 'Your company information has been updated.', 'success')} className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* KYC TAB */}
          {activeTab === 'kyc' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                <h2 className="font-semibold" style={{ fontSize: '20px' }}>Regulatory Documents</h2>
                <div className="badge badge-green">KYC Verified</div>
              </div>
              
              <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>
                Your business has been verified in accordance with RBI cross-border settlement guidelines.
              </p>

              <div className="flex flex-col gap-4">
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-glass-solid)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Certificate of Incorporation</h4>
                    <p className="text-muted" style={{ fontSize: '13px' }}>Uploaded on 12 Aug 2025</p>
                  </div>
                  <button type="button" onClick={() => addToast('Document Viewer', 'Opening Certificate of Incorporation...', 'info')} className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>View</button>
                </div>
                
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-glass-solid)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Director PAN Cards (3/3)</h4>
                    <p className="text-muted" style={{ fontSize: '13px' }}>Verified through NSDL API</p>
                  </div>
                  <button type="button" onClick={() => addToast('Document Viewer', 'Opening Director PAN Cards...', 'info')} className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>View</button>
                </div>

                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.6)', border: '1px border-dashed var(--border-focus)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Latest Audited Financials</h4>
                    <p className="text-muted" style={{ fontSize: '13px' }}>Required for credit line expansion</p>
                  </div>
                  <button type="button" onClick={() => addToast('Upload Required', 'Please drag and drop the PDF file here.', 'info')} className="btn btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>Upload</button>
                </div>
              </div>
            </div>
          )}

          {/* API KEYS TAB */}
          {activeTab === 'api' && (
            <div className="animate-fade-in">
              <h2 className="font-semibold" style={{ fontSize: '20px', marginBottom: '8px' }}>Developer API Keys</h2>
              <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>Use these keys to authenticate your backend servers with the FrontierPay API.</p>
              
              <div style={{ padding: '24px', background: '#1e293b', borderRadius: '12px', color: 'white', marginBottom: '24px' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>LIVE SECRET KEY</span>
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '12px' }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '16px', letterSpacing: '1px', padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', overflowX: 'auto' }}>
                  sk_live_51NwY2kS............................h9sX
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" onClick={() => addToast('API Key Rolled', 'A new Live Secret Key has been generated.', 'success')} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <RefreshCw size={16} /> Roll API Key
                </button>
                <a href="/developers" className="btn btn-primary" style={{ flex: 1 }}>
                  View Documentation &rarr;
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
