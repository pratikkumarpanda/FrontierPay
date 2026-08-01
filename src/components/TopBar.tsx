"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useMock } from '@/lib/MockContext';

export default function TopBar() {
  const { transactions } = useMock();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = transactions.filter(tx => 
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tx.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.amount.toString().includes(searchQuery)
  ).slice(0, 5);

  const notifications = [
    { id: 1, title: 'Wire Payment Settled', message: 'Inbound transfer of $12,000 has cleared.', time: '10m ago', type: 'success' },
    { id: 2, title: 'Action Required', message: 'Please upload Form 15CA for TRX-7341.', time: '1h ago', type: 'warning' },
    { id: 3, title: 'New Device Login', message: 'Login detected from Mumbai, IN.', time: '2h ago', type: 'info' }
  ];

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-40 sticky top-0 flex-shrink-0">
        
        {/* Global Search */}
        <div className="flex-1 max-w-xl" ref={searchRef}>
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by counterparties, transfer ID..." 
                    className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white border border-transparent focus:border-brand-500 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:shadow-input-focus placeholder-slate-400"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                />
                
                {/* Search Results Dropdown */}
                {isSearchOpen && searchQuery.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-glass border border-slate-200 z-50 overflow-hidden animate-slide-in">
                    <div className="p-2 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Transactions ({searchResults.length})</p>
                    </div>
                    {searchResults.length > 0 ? (
                      searchResults.map(tx => (
                        <div key={tx.id} className="p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{tx.id}</p>
                            <p className="text-xs text-slate-500">{tx.type} • {tx.status}</p>
                          </div>
                          <p className="text-sm font-mono font-medium text-slate-700">
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500">
                        No recent transactions found.
                      </div>
                    )}
                  </div>
                )}
            </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6 ml-4">
            
            {/* Environment Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full border border-brand-100">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-wide">LIVE</span>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                {/* Notifications Dropdown */}
                {isNotifOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-glass border border-slate-200 z-50 overflow-hidden animate-slide-in">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">Notifications</p>
                      <button className="text-xs text-brand-600 font-medium hover:text-brand-700">Mark all read</button>
                    </div>
                    <div>
                      {notifications.map(n => (
                        <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors relative">
                          <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
                          {n.type === 'warning' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="w-px h-6 bg-slate-200 hidden lg:block"></div>

            {/* User Menu */}
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold overflow-hidden">
                    FT
                </div>
                <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-slate-900">Frontier Tech</p>
                    <p className="text-xs text-slate-500">Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
            </button>
        </div>
    </header>
  );
}
