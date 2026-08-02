"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

const data = [
  { name: 'Jan', volume: 4000, savings: 240 },
  { name: 'Feb', volume: 3000, savings: 139 },
  { name: 'Mar', volume: 2000, savings: 980 },
  { name: 'Apr', volume: 2780, savings: 390 },
  { name: 'May', volume: 1890, savings: 480 },
  { name: 'Jun', volume: 2390, savings: 380 },
  { name: 'Jul', volume: 3490, savings: 430 },
];

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-4 tracking-tight mb-2">
           <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <Activity className="w-6 h-6 fill-current" />
          </div>
          Analytics & FX Savings
        </h1>
        <p className="text-slate-500 text-lg">Track your transaction volume and see how much you save.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60">
          <div className="flex justify-between items-center text-slate-500 mb-3">
            <span className="text-sm font-medium uppercase tracking-widest">Total FX Volume (YTD)</span>
            <Activity className="w-5 h-5 text-brand-600" />
          </div>
          <div className="text-4xl font-mono font-bold tracking-tight text-slate-900">$1.2M</div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm mt-3 font-bold">
            <TrendingUp className="w-4 h-4" /> +12.5% vs last year
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-emerald-50/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-emerald-200">
          <div className="flex justify-between items-center text-emerald-700 mb-3">
            <span className="text-sm font-medium uppercase tracking-widest">Total FX Savings (YTD)</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-emerald-700 text-4xl font-mono font-bold tracking-tight">₹{(2450000).toLocaleString('en-IN')}</div>
          <div className="flex items-center gap-2 text-emerald-600/80 text-sm mt-3 font-medium">
            Saved vs. traditional bank spreads
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60">
          <div className="flex justify-between items-center text-slate-500 mb-3">
            <span className="text-sm font-medium uppercase tracking-widest">DTAA Withholding Total</span>
            <Activity className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-4xl font-mono font-bold tracking-tight text-slate-900">${(124000).toLocaleString('en-US')}</div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-3 font-medium">
            Across 45 transactions
          </div>
        </div>

      </div>

      <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 mb-10">
        <h3 className="font-bold text-2xl text-slate-900 mb-8">Transaction Volume vs Savings</h3>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid #e2e8f0', borderRadius: '1rem', fontWeight: 'bold' }} 
              />
              <Area type="monotone" dataKey="volume" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVolume)" />
              <Area type="monotone" dataKey="savings" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
