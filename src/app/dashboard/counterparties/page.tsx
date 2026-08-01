"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Users, Plus, MoreVertical, Building2, Search, MapPin } from 'lucide-react';
import Modal from '@/components/Modal';

export default function CounterpartiesPage() {
  const { counterparties, addCounterparty, addToast } = useMock();
  const [activeModal, setActiveModal] = useState<'add' | null>(null);
  
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [account, setAccount] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country || !account) return;
    
    setIsVerifying(true);
    addToast('Verifying Bank BIC...', 'Connecting to global bank network directory...', 'info');
    
    setTimeout(() => {
      addCounterparty({ name, country, account });
      addToast('Counterparty Saved', `${name} has been verified and added to your directory.`, 'success');
      setActiveModal(null);
      setName(''); setCountry(''); setAccount('');
      setIsVerifying(false);
    }, 1500);
  };

  const filteredCounterparties = counterparties.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Users className="w-6 h-6 fill-current" />
            </div>
            Counterparties
          </h1>
          <p className="text-slate-500 text-lg">Manage your global vendors and buyers.</p>
        </div>
        <button onClick={() => setActiveModal('add')} className="px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all flex items-center gap-2 hover:-translate-y-0.5">
          <Plus className="w-5 h-5" /> Add Counterparty
        </button>
      </header>

      <div className="mb-8 relative group max-w-md">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search vendors or buyers..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white hover:bg-slate-50 focus:bg-white border-2 border-slate-200 focus:border-brand-500 rounded-2xl text-base font-medium focus:outline-none focus:shadow-[0_0_0_4px_rgba(14,165,233,0.15)] transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounterparties.map(cp => (
           <div key={cp.id} className="glass-panel p-8 rounded-[2rem] bg-white/80 shadow-lg shadow-slate-200/50 border border-white hover:border-brand-300 hover:shadow-xl transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6">
                <button className="text-slate-400 hover:text-brand-600 transition-colors p-2 rounded-full hover:bg-brand-50">
                  <MoreVertical className="w-5 h-5" />
                </button>
             </div>
             
             <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center text-2xl font-bold border border-slate-200 shadow-inner mb-6 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
               {cp.name.charAt(0)}
             </div>
             
             <h3 className="text-xl font-bold text-slate-900 mb-2 truncate" title={cp.name}>{cp.name}</h3>
             
             <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-6">
               <MapPin className="w-4 h-4 text-slate-400" /> {cp.country}
             </div>
             
             <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Account</p>
                <p className="font-mono text-slate-900 font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block truncate max-w-full">
                  {cp.account}
                </p>
             </div>
           </div>
        ))}
      </div>
      
      {filteredCounterparties.length === 0 && (
         <div className="p-20 text-center glass-panel rounded-[2rem] bg-white/80 border border-white shadow-sm mt-8">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl font-bold text-slate-500">No counterparties found.</p>
         </div>
      )}

      <Modal isOpen={activeModal === 'add'} onClose={() => setActiveModal(null)} title="Add Counterparty">
        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Legal Name</label>
            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-bold text-slate-900" placeholder="Supplier LLC" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Country of Incorporation</label>
            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-bold text-slate-900" placeholder="United States" value={country} onChange={e => setCountry(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Bank Account Number / IBAN</label>
            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-500 font-mono font-bold text-slate-900" placeholder="US00..." value={account} onChange={e => setAccount(e.target.value)} required />
          </div>
          <button type="submit" disabled={isVerifying} className="w-full py-4 bg-brand-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all disabled:opacity-70 disabled:cursor-wait">
            {isVerifying ? 'Verifying Network...' : 'Save Entity'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
