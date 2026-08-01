"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useMock();

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {toasts.map(toast => (
        <div key={toast.id} className="glass-panel animate-fade-in" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '16px',
          borderRadius: '12px',
          width: '320px',
          display: 'flex',
          gap: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          borderLeft: `4px solid ${toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6'}`
        }}>
          <div style={{ marginTop: '2px' }}>
            {toast.type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
            {toast.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
            {toast.type === 'info' && <Info size={20} color="#3b82f6" />}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{toast.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{toast.message}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            style={{ padding: '4px', height: 'fit-content' }}
          >
            <X size={16} color="var(--text-muted)" />
          </button>
        </div>
      ))}
    </div>
  );
}
