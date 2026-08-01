"use client";
import React, { useState } from 'react';
import { useMock, Transaction } from '@/lib/MockContext';
import { Download, Filter, CheckCircle2, Clock, Check, Building2, Globe2, ArrowRightLeft } from 'lucide-react';
import Modal from '@/components/Modal';

export default function TransactionsPage() {
  const { transactions, addToast } = useMock();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const getTimeline = (tx: Transaction) => {
    if (tx.status === 'Settled') {
      return [
        { title: 'Payment Initiated', time: 'T-0 09:00 AM', status: 'done' },
        { title: 'AML & Sanctions Cleared', time: 'T-0 09:05 AM', status: 'done' },
        { title: 'FX Conversion Executed', time: 'T-0 09:12 AM', status: 'done' },
        { title: 'Sent to Banking Network', time: 'T-0 09:30 AM', status: 'done' },
        { title: 'Settled to Beneficiary', time: tx.date, status: 'done' }
      ];
    } else if (tx.status === 'Processing') {
      return [
        { title: 'Payment Initiated', time: tx.date, status: 'done' },
        { title: 'AML & Sanctions Cleared', time: 'Just now', status: 'done' },
        { title: 'Executing FX Conversion', time: 'In Progress', status: 'active' },
        { title: 'Awaiting Dispatch', time: 'Pending', status: 'pending' },
        { title: 'Settled to Beneficiary', time: 'Pending', status: 'pending' }
      ];
    } else {
      return [
        { title: 'Payment Initiated', time: tx.date, status: 'done' },
        { title: 'Failed Compliance Check', time: 'Just now', status: 'error' }
      ];
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <span className="text-brand-500"><ArrowRightLeft className="w-6 h-6" /></span>
            Global Transactions
          </h1>
          <p className="text-sm text-slate-500">Complete audit trail of all inbound and outbound money movement.</p>
        </div>
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => addToast('Not Implemented', 'Advanced filtering will be available soon.', 'info')} 
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => {
              addToast('Exporting...', 'CSV download will begin shortly.', 'info');
              let content = `Date,Type,ID,Amount,Currency,Status\n`;
              transactions.forEach(tx => {
                content += `"${tx.date}","${tx.type}","${tx.id}",${tx.amount},"${tx.currency}","${tx.status}"\n`;
              });
              const blob = new Blob([content], { type: 'text/csv' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `FrontierPay_Transactions.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }} 
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-xl shadow-card-hover hover:bg-brand-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Currency</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-brand-600 group-hover:text-brand-700 transition-colors">{tx.id}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.type}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-mono font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(tx.currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500">{tx.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      tx.status === 'Settled' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      tx.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-500 font-medium">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No transactions found.
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction Details">
        {selectedTx && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-5 flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                  {selectedTx.type === 'Import' ? <Globe2 className="w-6 h-6 text-brand-500" /> : <Building2 className="w-6 h-6 text-emerald-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedTx.type} Settlement</h3>
                  <p className="text-slate-500 font-mono text-sm">{selectedTx.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-mono font-bold ${selectedTx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {selectedTx.amount > 0 ? '+' : ''}{selectedTx.amount.toLocaleString()} {selectedTx.currency}
                </p>
                <p className="text-sm font-medium text-slate-500">{selectedTx.date}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-4 px-2">Settlement Timeline</h4>
              <div className="relative pl-6 space-y-6">
                <div className="absolute top-2 bottom-2 left-2.5 w-0.5 bg-slate-200"></div>
                {getTimeline(selectedTx).map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-6 top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white
                      ${step.status === 'done' ? 'border-emerald-500 text-emerald-500' : 
                        step.status === 'active' ? 'border-brand-500 text-brand-500 shadow-[0_0_0_4px_rgba(14,165,233,0.1)]' : 
                        step.status === 'error' ? 'border-red-500 text-red-500' :
                        'border-slate-300 text-slate-300'}`}
                    >
                      {step.status === 'done' ? <Check className="w-3 h-3" /> : 
                       step.status === 'active' ? <Clock className="w-3 h-3 animate-spin-slow" /> : 
                       <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <div className="pl-4">
                      <p className={`text-sm font-bold ${step.status === 'active' ? 'text-brand-700' : 'text-slate-900'}`}>{step.title}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedTx(null)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
