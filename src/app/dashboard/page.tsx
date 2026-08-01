"use client";
import React from 'react';
import { useMock } from '@/lib/MockContext';
import { ArrowUpRight, ArrowDownLeft, Activity, TrendingUp, DollarSign, RefreshCcw } from 'lucide-react';
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
    <div className="animate-fade-in max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Command Center</h1>
        <p className="text-slate-500">Welcome back. Here's your real-time liquidity and settlement status.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl hover:shadow-card-hover transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Activity className="w-24 h-24 text-brand-600" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Balance (INR)</span>
            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <Activity size={16} />
            </div>
          </div>
          <h2 className="text-3xl font-mono font-bold text-slate-900 mb-4 relative z-10">
            ₹{balances.INR.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 relative z-10">
            <ArrowUpRight size={14} /> <span>+4.2%</span> <span className="text-slate-400 font-medium ml-1">from last month</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover:shadow-card-hover transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <DollarSign className="w-24 h-24 text-emerald-600" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">EEFC Holdings (USD)</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={16} />
            </div>
          </div>
          <h2 className="text-3xl font-mono font-bold text-slate-900 mb-4 relative z-10">
            ${balances.USD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          <div className="text-xs font-medium text-slate-500 relative z-10">
            Unconverted (~₹{(balances.USD * (fxRates.INR || 83)).toLocaleString('en-IN', {maximumFractionDigits: 0})})
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl hover:shadow-card-hover transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <RefreshCcw className="w-24 h-24 text-yellow-600" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pending Settlements</span>
            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <RefreshCcw size={16} />
            </div>
          </div>
          <h2 className="text-3xl font-mono font-bold text-slate-900 mb-4 relative z-10">
            {transactions.filter(t => t.status === 'Processing').length}
          </h2>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 relative z-10">
            <ArrowDownLeft size={14} /> Awaiting T+0 clearance
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">30-Day Cash Flow (INR)</h3>
          <div className="h-[300px] w-full">
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
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="Inflow" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="Outflow" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Exposure by Currency</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'USD', value: 65 },
                    { name: 'EUR', value: 20 },
                    { name: 'GBP', value: 10 },
                    { name: 'SGD', value: 5 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {[
                    { name: 'USD', value: 65 },
                    { name: 'EUR', value: 20 },
                    { name: 'GBP', value: 10 },
                    { name: 'SGD', value: 5 },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}
                  formatter={(value: any) => [`${value}%`, 'Exposure']}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
