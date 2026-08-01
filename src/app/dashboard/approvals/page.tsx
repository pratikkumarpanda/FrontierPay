"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { ShieldCheck, Check, X, Clock, AlertCircle } from 'lucide-react';

export default function ApprovalsPage() {
  const { transactions, setTransactions, addToast } = useMock();

  const pendingTxs = transactions.filter(tx => tx.status === 'Pending Approval');

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return { ...tx, status: 'Processing' as const, timestamp: Date.now() };
      }
      return tx;
    }));
    addToast('Payment Authorized', `Transaction ${id} has been approved and is now processing.`, 'success');
  };

  const handleReject = (id: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return { ...tx, status: 'Failed' as const };
      }
      return tx;
    }));
    addToast('Payment Rejected', `Transaction ${id} was rejected.`, 'error');
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          Approval Queue
        </h1>
        <p className="text-slate-500 text-lg">Review and authorize pending high-value corporate transfers.</p>
      </header>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden mb-8">
        <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-inner">
             <AlertCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Action Required</h2>
          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">{pendingTxs.length} Pending</span>
        </div>
        
        {pendingTxs.length === 0 ? (
          <div className="p-20 text-center animate-fade-in">
            <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-100 shadow-lg shadow-emerald-500/10 relative">
              <div className="absolute inset-0 rounded-full border border-emerald-200 animate-ping opacity-20"></div>
              <Check className="w-14 h-14 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">You're all caught up!</h3>
            <p className="text-slate-500 text-lg">There are no transactions waiting for your authorization.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction ID</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Initiated By</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Time</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Authorization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingTxs.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono font-bold text-brand-600 group-hover:text-brand-700 transition-colors">{tx.id}</span>
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-900">{tx.type}</td>
                    <td className="px-8 py-6 text-right">
                      <span className="font-mono font-bold text-slate-900 text-lg">
                        {tx.currency === 'USD' ? '$' : tx.currency === 'INR' ? '₹' : ''}
                        {tx.amount.toLocaleString(tx.currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2 })} {tx.currency}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600">
                         finance@frontiertech.com
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Clock className="w-4 h-4 text-brand-500" /> {tx.date}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleReject(tx.id)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all shadow-sm">
                          <X className="w-4 h-4" /> Reject
                        </button>
                        <button onClick={() => handleApprove(tx.id)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all">
                          <Check className="w-4 h-4" /> Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
