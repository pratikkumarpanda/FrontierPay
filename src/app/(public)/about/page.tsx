export default function AboutPage() {
  return (
    <div className="animate-fade-in pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">About FrontierPay</h1>
        <p className="text-slate-500 text-2xl leading-relaxed mb-12">
          We are on a mission to democratize institutional-grade cross-border payments for Indian SMEs.
        </p>

        <div className="p-12 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 mb-12 relative overflow-hidden group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-all group-hover:bg-brand-500/20"></div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Problem</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            For decades, traditional banks have charged opaque markups (up to 3%) on foreign exchange, coupled with high transfer fees and slow settlement times. For a growing Indian exporter or importer, these hidden costs eat directly into profit margins.
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Solution</h2>
          <p className="text-slate-600 text-lg leading-relaxed relative z-10">
            FrontierPay bypasses correspondent banking networks by leveraging local clearing rails (like PayNow in Singapore, ACH in the US) connected to our GIFT City treasury hub. We pass the Interbank FX spreads directly to you, providing 100% transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 text-center hover:-translate-y-1 transition-all hover:shadow-2xl">
            <div className="text-brand-600 font-bold text-6xl tracking-tight mb-3">$500M+</div>
            <div className="text-slate-500 font-medium uppercase tracking-widest text-sm">Volume Processed</div>
          </div>
          <div className="p-10 rounded-[2rem] bg-emerald-50/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-emerald-200 text-center hover:-translate-y-1 transition-all hover:shadow-2xl">
            <div className="text-emerald-600 font-bold text-6xl tracking-tight mb-3">₹120Cr+</div>
            <div className="text-emerald-700/80 font-medium uppercase tracking-widest text-sm">Savings Generated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
