"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Terminal, Key, RefreshCw, Copy, Check, Link as LinkIcon, Activity } from 'lucide-react';

export default function DevelopersPage() {
  const { webhookLogs, addToast } = useMock();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    addToast('Key Copied', 'API Key copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>API & Webhooks</h1>
        <p className="text-muted">Integrate FrontierPay into your ERP or custom software.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Left Column: Config */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="font-semibold" style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} className="text-blue" /> Production API Keys
            </h2>
            <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-glass-solid)', marginBottom: '16px' }}>
              <div className="text-muted" style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>SECRET KEY</div>
              <div className="flex justify-between items-center">
                <code style={{ fontFamily: 'monospace', fontSize: '14px' }}>sk_live_51NwY2kS...h9sX</code>
                <button onClick={handleCopy} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
              <RefreshCw size={16} /> Roll Key
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="font-semibold" style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LinkIcon size={18} className="text-green" /> Webhook Endpoints
            </h2>
            <div className="form-group mb-4">
              <label className="form-label">Endpoint URL</label>
              <input type="url" className="form-input" defaultValue="https://api.yourcompany.com/frontier-webhooks" />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-blue">payment.processing</span>
              <span className="badge badge-green">payment.settled</span>
              <span className="badge badge-yellow">payment.pending_approval</span>
            </div>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Save Webhook Settings</button>
          </div>
        </div>

        {/* Right Column: Terminal */}
        <div style={{ background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '12px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-2 text-slate-300" style={{ fontSize: '14px', fontWeight: 500 }}>
              <Terminal size={16} /> Live Webhook Stream
            </div>
            <div className="flex items-center gap-2 text-emerald-400" style={{ fontSize: '12px' }}>
              <Activity size={14} className="animate-pulse" /> Listening
            </div>
          </div>
          
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {webhookLogs.length === 0 ? (
              <div style={{ color: '#64748b', textAlign: 'center', marginTop: '40px' }}>Waiting for events...<br/>Initiate a payment to see webhooks fire.</div>
            ) : (
              webhookLogs.map(log => (
                <div key={log.id} className="animate-fade-in" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px' }}>
                  <div style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '11px' }}>
                    [{log.timestamp}] <span style={{ color: '#38bdf8' }}>POST /frontier-webhooks</span> 200 OK
                  </div>
                  <pre style={{ color: '#a7f3d0', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify({
                      id: log.id,
                      event: log.event,
                      created_at: log.timestamp,
                      data: log.payload
                    }, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
