"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowUpRight, ArrowDownLeft, Activity } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const cashFlowData = [
  { name: 'Aug 1', Inflow: 450000, Outflow: 240000 },
  { name: 'Aug 5', Inflow: 300000, Outflow: 139800 },
  { name: 'Aug 10', Inflow: 200000, Outflow: 980000 },
  { name: 'Aug 15', Inflow: 278000, Outflow: 390800 },
  { name: 'Aug 20', Inflow: 189000, Outflow: 480000 },
  { name: 'Aug 25', Inflow: 239000, Outflow: 380000 },
  { name: 'Aug 30', Inflow: 349000, Outflow: 430000 },
];
const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];

export default function DashboardHome() {
  const { balances, transactions, fxRates } = useMock();

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Treasury Overview</h1>
        <p className="text-muted">Welcome back. Here's your real-time liquidity and settlement status.</p>
      </header>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex justify-between items-start mb-4">
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Available Balance (INR)</span>
            <Activity size={16} color="var(--primary-blue)" />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            ₹{balances.INR.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-2" style={{ fontSize: '12px', color: 'var(--primary-green)', fontWeight: 500 }}>
            <ArrowUpRight size={14} /> +4.2% from last month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex justify-between items-start mb-4">
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>EEFC Holdings (USD)</span>
            <Activity size={16} color="var(--primary-green)" />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            ${balances.USD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="text-muted" style={{ fontSize: '12px' }}>
            Unconverted export proceeds (~₹{(balances.USD * (fxRates.INR || 83)).toLocaleString(undefined, {maximumFractionDigits: 0})})
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex justify-between items-start mb-4">
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Pending Settlements</span>
            <Activity size={16} color="#ca8a04" />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            {transactions.filter(t => t.status === 'Processing').length}
          </h2>
          <div className="flex items-center gap-2 text-yellow-600" style={{ fontSize: '12px', color: '#ca8a04', fontWeight: 500 }}>
            <ArrowDownLeft size={14} /> Awaiting T+0 clearance
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>30-Day Cash Flow (INR)</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="Inflow" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="Outflow" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>EEFC Currency Exposure</h3>
          <div style={{ height: '300px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'USD', value: balances.USD },
                    { name: 'SGD', value: balances.SGD },
                    { name: 'EUR', value: balances.EUR },
                    { name: 'GBP', value: balances.GBP }
                  ].filter(c => c.value > 0)}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {
                    [
                      { name: 'USD', value: balances.USD },
                      { name: 'SGD', value: balances.SGD },
                      { name: 'EUR', value: balances.EUR },
                      { name: 'GBP', value: balances.GBP }
                    ].filter(c => c.value > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any, name: any) => [`${name === 'USD' ? '$' : name === 'SGD' ? 'S$' : name === 'EUR' ? '€' : '£'}${Number(value).toLocaleString()}`, 'Balance']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-panel">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-glass-solid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Transactions</h3>
          <Link href="/dashboard/transactions" className="text-blue text-[13px] font-medium hover:underline">View All &rarr;</Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map((tx) => (
              <tr key={tx.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{tx.id}</td>
                <td style={{ fontWeight: 500 }}>{tx.type}</td>
                <td style={{ fontWeight: 600 }}>
                  {tx.currency === 'USD' ? '$' : tx.currency === 'INR' ? '₹' : ''}
                  {tx.amount.toLocaleString()}
                </td>
                <td>
                  <span className={`badge ${tx.status === 'Settled' ? 'badge-green' : tx.status === 'Processing' ? 'badge-yellow' : 'badge-blue'}`}>
                    {tx.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{tx.date}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>No recent transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
