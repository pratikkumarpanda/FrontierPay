import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="animate-fade-in pt-40 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Transparent Pricing</h1>
          <p className="text-slate-500 text-2xl max-w-2xl mx-auto leading-relaxed">
            No hidden wire fees, no spread markups. Just a single transparent fee based on your volume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Starter */}
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:-translate-y-1 transition-all">
            <h3 className="font-bold text-slate-500 text-lg uppercase tracking-widest mb-4">Starter</h3>
            <div className="font-bold text-slate-900 text-6xl tracking-tight mb-6">
              0.58%
            </div>
            <p className="text-slate-600 text-lg mb-8 h-12">For businesses doing less than $100k / month.</p>
            <ul className="flex flex-col gap-5 text-slate-700 font-medium mb-10">
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> Automated 15CA/CB</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> T+1 Settlement</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> 3 Currencies (USD, EUR, GBP)</li>
            </ul>
            <Link href="/login" className="w-full py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors flex justify-center text-lg">Get Started</Link>
          </div>

          {/* Growth */}
          <div className="p-12 rounded-[2rem] bg-brand-50 border-2 border-brand-500 shadow-2xl relative transform lg:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">MOST POPULAR</div>
            <h3 className="font-bold text-brand-600 text-lg uppercase tracking-widest mb-4">Growth</h3>
            <div className="font-bold text-slate-900 text-6xl tracking-tight mb-6">
              0.38%
            </div>
            <p className="text-slate-600 text-lg mb-8 h-12">For businesses doing $100k - $1M / month.</p>
            <ul className="flex flex-col gap-5 text-slate-700 font-medium mb-10">
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> Dedicated Account Manager</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> T+0 Settlement</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> EEFC Wallets</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> Free e-FIRCs</li>
            </ul>
            <a href="mailto:sales@frontierpay.com" className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex justify-center text-lg">Contact Sales</a>
          </div>

          {/* Enterprise */}
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:-translate-y-1 transition-all">
            <h3 className="font-bold text-slate-500 text-lg uppercase tracking-widest mb-4">Enterprise</h3>
            <div className="font-bold text-slate-900 text-6xl tracking-tight mb-6">
              Custom
            </div>
            <p className="text-slate-600 text-lg mb-8 h-12">For large exporters and institutions.</p>
            <ul className="flex flex-col gap-5 text-slate-700 font-medium mb-10">
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> API Integration</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> Bespoke FX Hedging</li>
              <li className="flex items-center gap-3"><Check className="text-brand-500 w-5 h-5" /> Approval Workflows</li>
            </ul>
            <a href="mailto:sales@frontierpay.com" className="w-full py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors flex justify-center text-lg">Contact Sales</a>
          </div>

        </div>
      </div>
    </div>
  );
}
