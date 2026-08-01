"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const { addToast, balances, transactions } = useMock();

  const handleDownload = (type: string) => {
    addToast('Generating Report', `${type} is being generated...`, 'info');
    
    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (type === 'Account Statement') {
        // Generate a real CSV based on live mock data
        content = `Date,Type,ID,Amount,Currency,Status\n`;
        transactions.forEach(tx => {
          content += `"${tx.date}","${tx.type}","${tx.id}",${tx.amount},"${tx.currency}","${tx.status}"\n`;
        });
        filename = `FrontierPay_Account_Statement_${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      } else if (type === 'FIRC Archive') {
        content = `FOREIGN INWARD REMITTANCE CERTIFICATE (FIRC)\n\nThis document certifies that the inward remittances have been received and accounted for in accordance with RBI guidelines.\n\nGenerated on: ${new Date().toLocaleString()}\nAuthorized by: Frontier Technologies Pvt Ltd`;
        filename = `FIRC_Certificates.txt`;
      } else {
        content = `FORM 15CA / 15CB\n\nInformation to be furnished for payments to a non-resident not being a company, or to a foreign company.\n\nStatus: VERIFIED\nDate: ${new Date().toLocaleString()}`;
        filename = `Form_15CA_15CB.txt`;
      }

      // Trigger actual browser download
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast('Download Complete', `${type} has been downloaded.`, 'success');
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Reports & Tax</h1>
        <p className="text-muted">Download compliant statements, Form 15CA/CB, and FIRC certificates.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--primary-blue)' }}>
              <FileText size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Account Statement</h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>Ledger balances across all currencies</p>
            </div>
          </div>
          <button onClick={() => handleDownload('Account Statement')} className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
            <Download size={16} /> Download PDF
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--primary-green)' }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>FIRC Certificates</h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>Foreign Inward Remittance Certificates</p>
            </div>
          </div>
          <button onClick={() => handleDownload('FIRC Archive')} className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
            <Download size={16} /> Download ZIP Archive
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', color: '#ca8a04' }}>
              <FileText size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Form 15CA / 15CB</h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>Tax compliance forms for outwards remittances</p>
            </div>
          </div>
          <button onClick={() => handleDownload('Form 15CA/CB')} className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
            <Download size={16} /> Download PDFs
          </button>
        </div>

      </div>
    </div>
  );
}
