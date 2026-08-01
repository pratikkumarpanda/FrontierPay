"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
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
    { id: 1, title: 'SWIFT Payment Settled', message: 'Inbound transfer of $12,000 has cleared.', time: '10m ago', type: 'success' },
    { id: 2, title: 'Action Required', message: 'Please upload Form 15CA for TRX-7341.', time: '1h ago', type: 'warning' },
    { id: 3, title: 'New Device Login', message: 'Login detected from Mumbai, IN.', time: '2h ago', type: 'info' }
  ];

  return (
    <header style={{ 
      height: '64px', 
      background: 'rgba(255,255,255,0.7)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass-solid)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 30
    }}>
      {/* Search Bar Area */}
      <div className="flex items-center gap-4" ref={searchRef}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search transactions, UTRs..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setIsSearchOpen(true)}
            style={{ paddingLeft: '36px', height: '36px', background: 'rgba(255,255,255,0.9)', position: 'relative', zIndex: 1 }} 
          />
          
          {/* Search Results Dropdown */}
          {isSearchOpen && (
            <div style={{
              position: 'absolute',
              top: '44px', left: 0, right: 0,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-glass-solid)',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              zIndex: 50
            }}>
              {searchResults.length > 0 ? (
                <div>
                  <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-page)' }}>TRANSACTIONS</div>
                  {searchResults.map(res => (
                    <div key={res.id} style={{ padding: '12px', borderBottom: '1px solid var(--border-glass-solid)', cursor: 'pointer' }} className="hover-bg-subtle">
                      <div className="flex justify-between items-center mb-1">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-blue)' }}>{res.id}</span>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{res.currency} {res.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-muted" style={{ fontSize: '11px' }}>
                        <span>{res.type} • {res.date}</span>
                        <span className={`text-[11px] ${res.status === 'Settled' ? 'text-green-600' : 'text-yellow-600'}`}>{res.status}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '8px', textAlign: 'center', fontSize: '12px', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 500 }} className="hover-bg-subtle">
                    View all results <ArrowRight size={12} className="inline ml-1" />
                  </div>
                </div>
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 rounded-full bg-blue-100 relative cursor-pointer" style={{ width: '36px', background: '#dbeafe' }}>
            <div className="w-4 h-4 rounded-full bg-blue-600 absolute right-1 top-0 bottom-0 my-auto" style={{ background: 'var(--primary-blue)' }}></div>
          </div>
          <span className="text-[12px] font-medium text-blue">Live Mode</span>
        </div>
        
        {/* Notifications */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <div 
            style={{ position: 'relative', cursor: 'pointer', padding: '4px' }}
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell size={20} className="text-muted hover:text-black transition-colors" />
            <div style={{ position: 'absolute', top: '2px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
          </div>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div style={{
              position: 'absolute',
              top: '36px', right: 0,
              width: '320px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-glass-solid)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              zIndex: 50
            }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border-glass-solid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Notifications</h3>
                <span style={{ fontSize: '12px', color: 'var(--primary-blue)', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-glass-solid)', display: 'flex', gap: '12px', cursor: 'pointer' }} className="hover-bg-subtle">
                    <div style={{ marginTop: '2px' }}>
                      {n.type === 'success' && <CheckCircle2 size={16} className="text-green-600" />}
                      {n.type === 'warning' && <AlertTriangle size={16} className="text-yellow-600" />}
                      {n.type === 'info' && <Bell size={16} className="text-blue-600" />}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{n.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>{n.message}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', cursor: 'pointer', background: '#f8fafc' }} className="hover-bg-subtle">
                View All Activity
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 cursor-pointer border-l pl-6" style={{ borderColor: 'var(--border-glass-solid)' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-green))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
            FT
          </div>
          <span className="text-[13px] font-medium">Frontier Tech</span>
          <ChevronDown size={14} className="text-muted" />
        </div>
      </div>
    </header>
  );
}
