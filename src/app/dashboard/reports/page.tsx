"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { Download, FileText, CheckCircle2, FileArchive, FileStack } from 'lucide-react';

export default function ReportsPage() {
  const { addToast, transactions } = useMock();

  const handleDownload = (type: string) => {
    addToast('Generating Report', `${type} is being generated...`, 'info');
    
    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (type === 'Account Statement') {
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
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
           <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <FileArchive className="w-6 h-6 fill-current" />
          </div>
          Reports & Tax
        </h1>
        <p className="text-slate-500 text-lg">Download compliant statements, Form 15CA/CB, and FIRC certificates.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Account Statement */}
        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:border-brand-300 transition-all group relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-brand-500/20 transition-all"></div>
          
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-inner mb-6 relative z-10 group-hover:scale-110 transition-transform">
             <FileText className="w-8 h-8" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Account Statement</h3>
            <p className="text-slate-500 font-medium mb-8">Export ledger balances across all currencies including transaction audit trails.</p>
          </div>

          <button onClick={() => handleDownload('Account Statement')} className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all flex items-center justify-center gap-2 relative z-10">
            <Download className="w-5 h-5" /> Download CSV
          </button>
        </div>

        {/* FIRC Certificates */}
        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:border-emerald-300 transition-all group relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner mb-6 relative z-10 group-hover:scale-110 transition-transform">
             <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">FIRC Archive</h3>
            <p className="text-slate-500 font-medium mb-8">Auto-generated Foreign Inward Remittance Certificates for claiming export incentives.</p>
          </div>

          <button onClick={() => handleDownload('FIRC Archive')} className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 relative z-10">
            <Download className="w-5 h-5" /> Download ZIP
          </button>
        </div>

        {/* 15CA/15CB */}
        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:border-amber-300 transition-all group relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-500/20 transition-all"></div>
          
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-inner mb-6 relative z-10 group-hover:scale-110 transition-transform">
             <FileStack className="w-8 h-8" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Form 15CA / 15CB</h3>
            <p className="text-slate-500 font-medium mb-8">Required tax compliance documentation for all outwards remittances from India.</p>
          </div>

          <button onClick={() => handleDownload('Form 15CA/CB')} className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all flex items-center justify-center gap-2 relative z-10">
            <Download className="w-5 h-5" /> Download PDFs
          </button>
        </div>

      </div>
    </div>
  );
}
