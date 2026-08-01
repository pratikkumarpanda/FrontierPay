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
      <header className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Analytics & FX Savings</h1>
          <p className="text-muted">Track your transaction volume and see how much you save.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex justify-between items-center text-muted" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Total FX Volume (YTD)</span>
            <Activity size={18} className="text-blue" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>$1.2M</div>
          <div className="flex items-center gap-2 text-green" style={{ fontSize: '13px', marginTop: '12px', fontWeight: 500 }}>
            <TrendingUp size={14} /> +12.5% vs last year
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(236, 253, 245, 0.5)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div className="flex justify-between items-center text-muted" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Total FX Savings (YTD)</span>
            <DollarSign size={18} className="text-green" />
          </div>
          <div className="text-green" style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>₹2,450,000</div>
          <div className="flex items-center gap-2 text-muted" style={{ fontSize: '13px', marginTop: '12px' }}>
            Saved vs. traditional bank spreads
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex justify-between items-center text-muted" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>DTAA Withholding Total</span>
            <Activity size={18} style={{ color: '#d97706' }} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>$124,000</div>
          <div className="flex items-center gap-2 text-muted" style={{ fontSize: '13px', marginTop: '12px', fontWeight: 500 }}>
            Across 45 transactions
          </div>
        </div>

      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <h3 className="font-semibold" style={{ fontSize: '18px', marginBottom: '24px' }}>Transaction Volume vs Savings</h3>
        <div style={{ width: '100%', height: '400px' }}>
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
                  <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-green)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary-green)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-glass-solid)" />
              <Tooltip 
                contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-glass-solid)', borderRadius: '8px' }} 
              />
              <Area type="monotone" dataKey="volume" stroke="var(--primary-blue)" fillOpacity={1} fill="url(#colorVolume)" />
              <Area type="monotone" dataKey="savings" stroke="var(--primary-green)" fillOpacity={1} fill="url(#colorSavings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
