"use client";
import { ArrowRight, Globe2, ShieldCheck, Zap, Code, Wallet, ArrowRightLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative overflow-hidden selection:bg-brand-500/30">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-brand-100/50 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-40 left-0 -ml-20 w-[500px] h-[500px] rounded-full bg-indigo-100/50 blur-3xl opacity-50 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-200 text-brand-600 text-sm font-bold mb-8 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            FrontierPay V2 is now live in GIFT City
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Global treasury management, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">engineered for SMEs.</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Automate regulatory compliance, access zero-markup interbank FX rates, and settle international invoices on T+0—all from a single, unified platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
              Open Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="/pricing" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all hover:-translate-y-0.5">
              View Pricing
            </a>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="max-w-5xl mx-auto mt-20 perspective-[1200px]">
          <div className="p-4 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-transform duration-700 ease-out hover:scale-[1.02] transform-gpu rotate-x-[8deg] rotate-y-[-5deg] rotate-z-[1deg] hover:rotate-x-0 hover:rotate-y-0 hover:rotate-z-0">
            
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex h-[450px] shadow-inner">
              
              {/* Sidebar Preview */}
              <div className="w-64 bg-white/80 border-r border-slate-200 p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-8 px-2">
                  <img src="/logo.png" alt="FrontierPay" className="h-7 w-auto object-contain" />
                </div>
                
                <div className="px-4 py-2.5 bg-brand-50 text-brand-600 rounded-xl text-sm font-bold flex items-center gap-3 shadow-sm border border-brand-100">
                   <Globe2 className="w-4 h-4" /> Overview
                </div>
                <div className="px-4 py-2.5 text-slate-500 rounded-xl text-sm font-medium flex items-center gap-3">
                   <Wallet className="w-4 h-4" /> Wallets
                </div>
                <div className="px-4 py-2.5 text-slate-500 rounded-xl text-sm font-medium flex items-center gap-3">
                   <ArrowRightLeft className="w-4 h-4" /> Transactions
                </div>
                <div className="px-4 py-2.5 text-slate-500 rounded-xl text-sm font-medium flex items-center gap-3">
                   <Code className="w-4 h-4" /> Developers
                </div>
              </div>

              {/* Main Content Preview */}
              <div className="flex-1 p-10 bg-slate-50/50 text-left flex flex-col gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Treasury Overview</h2>
                   <div className="px-4 py-1.5 bg-white rounded-full text-xs font-bold text-slate-600 border border-slate-200 shadow-sm flex items-center gap-2">
                     Live Mode <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   </div>
                </div>

                <div className="relative z-10 flex gap-6">
                  <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Available Balance (USD)</div>
                    <div className="text-4xl font-mono font-bold text-slate-900 mb-3">$4,520,102.00</div>
                    <div className="text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12.5% this month
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Active EEFC Accounts</div>
                    <div className="text-4xl font-bold text-slate-900 mb-3">4 Currencies</div>
                    <div className="text-slate-500 font-mono text-sm font-medium">
                      USD, EUR, GBP, SGD
                    </div>
                  </div>
                </div>

                <div className="relative z-10 bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 font-bold text-slate-800 text-sm">Recent Settlements</div>
                  
                  <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Inbound Wire (Acme Corp)</div>
                        <div className="text-slate-500 text-xs">Processed today at 10:45 AM</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-900 text-sm">+$150,000.00</div>
                  </div>

                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                        <ArrowRightLeft className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">USD to INR Conversion</div>
                        <div className="text-slate-500 text-xs">Processed yesterday at 2:15 PM</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-brand-600 text-sm">$45,000.00 → ₹37,57,500.00</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By (Logo Cloud) */}
      <section className="border-y border-slate-200 bg-white/40 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-10">
            Trusted by fastest-growing Indian exporters
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="text-2xl font-bold font-serif text-slate-800">Acme Corp</h3>
            <h3 className="text-2xl font-bold font-mono text-slate-800">TechNova</h3>
            <h3 className="text-2xl font-black text-slate-800">GlobalTrade</h3>
            <h3 className="text-2xl font-bold tracking-tighter text-slate-800">VERTEX</h3>
            <h3 className="text-2xl font-bold font-sans text-slate-800">NexusExports</h3>
          </div>
        </div>
      </section>

      {/* Deep Features Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">The complete financial stack for global businesses.</h2>
            <p className="text-xl text-slate-500 leading-relaxed">Replace your bank, your broker, and your compliance team with a single API.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Compliance by Design</h3>
              <p className="text-slate-500 leading-relaxed">Automated DTAA classification and Form 15CA/CB generation before payment execution, eliminating bank repair queues.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Institutional FX Rates</h3>
              <p className="text-slate-500 leading-relaxed">Access live interbank spreads (0.16-0.19%) directly through our treasury hub. Stop paying 2-3% retail markups on every invoice.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">T+0 Settlement</h3>
              <p className="text-slate-500 leading-relaxed">Our direct ledger integration avoids correspondent bank hops. 97% of transactions settle same-day across 40+ countries.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">EEFC Wallets</h3>
              <p className="text-slate-500 leading-relaxed">Hold your export proceeds in USD, EUR, or GBP indefinitely. Convert to INR only when you need working capital.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Developer API</h3>
              <p className="text-slate-500 leading-relaxed">Integrate global payouts directly into your marketplace or ERP. Generate bulk invoices and track UTRs programmatically.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Corporate Cards</h3>
              <p className="text-slate-500 leading-relaxed">Issue virtual cards funded directly by your EEFC balances. Pay for AWS and SaaS without incurring conversion fees.</p>
            </div>

          </div>
        </div>
      </section>


      {/* ── Testimonials ── */}
      <section className="py-32 relative z-10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-100/30 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto px-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-amber-200 text-amber-600 text-sm font-bold mb-6 shadow-sm">
              <span className="text-base">★★★★★</span> Loved by exporters
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Real businesses. Real savings.
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Thousands of Indian exporters trust FrontierPay to move money smarter.
            </p>
          </div>

          {/* Row 1 — left to right */}
          <div className="overflow-hidden mb-6">
            <div className="marquee-track">
              {[
                {
                  name: "Riya Sharma",
                  role: "CEO, NexaTextiles Pvt Ltd",
                  quote: "FrontierPay cut our FX costs by 2.3% overnight. We save over ₹18L a month just on remittances. Incredible platform.",
                  stars: 5,
                  color: "from-brand-500 to-brand-700",
                  img: null,
                },
                {
                  name: "Arjun Mehta",
                  role: "CFO, GlobalSoft Solutions",
                  quote: "The compliance automation alone is worth it. Form 15CA/CB used to take our CA 3 days — now it's instant.",
                  stars: 5,
                  color: "from-emerald-500 to-emerald-700",
                  img: null,
                },
                {
                  name: "Priya Nair",
                  role: "Founder, SpiceTrade Exports",
                  quote: "I was skeptical about T+0 settlement but it works. My buyers in Dubai receive confirmation before I even close my laptop.",
                  stars: 5,
                  color: "from-purple-500 to-purple-700",
                  img: null,
                },
                {
                  name: "Rohan Gupta",
                  role: "Director, Vertex Engineering",
                  quote: "EEFC accounts let us park USD when the rate is bad. We converted at 84.2 last month instead of 82.1 — that's real alpha.",
                  stars: 5,
                  color: "from-rose-500 to-rose-700",
                  img: null,
                },
                {
                  name: "Sneha Kapoor",
                  role: "Head of Finance, Orbit Pharma",
                  quote: "The corporate cards funded by EEFC balances changed everything. No more conversion fees for SaaS subscriptions.",
                  stars: 5,
                  color: "from-indigo-500 to-indigo-700",
                  img: null,
                },
                {
                  name: "Karthik Iyer",
                  role: "MD, Chennai Shipping Co.",
                  quote: "Support team is genuinely brilliant. Had a complex DTAA query resolved in under 30 minutes on a Sunday.",
                  stars: 5,
                  color: "from-amber-500 to-amber-700",
                  img: null,
                },
              ].concat([
                {
                  name: "Riya Sharma",
                  role: "CEO, NexaTextiles Pvt Ltd",
                  quote: "FrontierPay cut our FX costs by 2.3% overnight. We save over ₹18L a month just on remittances. Incredible platform.",
                  stars: 5,
                  color: "from-brand-500 to-brand-700",
                  img: null,
                },
                {
                  name: "Arjun Mehta",
                  role: "CFO, GlobalSoft Solutions",
                  quote: "The compliance automation alone is worth it. Form 15CA/CB used to take our CA 3 days — now it's instant.",
                  stars: 5,
                  color: "from-emerald-500 to-emerald-700",
                  img: null,
                },
                {
                  name: "Priya Nair",
                  role: "Founder, SpiceTrade Exports",
                  quote: "I was skeptical about T+0 settlement but it works. My buyers in Dubai receive confirmation before I even close my laptop.",
                  stars: 5,
                  color: "from-purple-500 to-purple-700",
                  img: null,
                },
                {
                  name: "Rohan Gupta",
                  role: "Director, Vertex Engineering",
                  quote: "EEFC accounts let us park USD when the rate is bad. We converted at 84.2 last month instead of 82.1 — that's real alpha.",
                  stars: 5,
                  color: "from-rose-500 to-rose-700",
                  img: null,
                },
                {
                  name: "Sneha Kapoor",
                  role: "Head of Finance, Orbit Pharma",
                  quote: "The corporate cards funded by EEFC balances changed everything. No more conversion fees for SaaS subscriptions.",
                  stars: 5,
                  color: "from-indigo-500 to-indigo-700",
                  img: null,
                },
                {
                  name: "Karthik Iyer",
                  role: "MD, Chennai Shipping Co.",
                  quote: "Support team is genuinely brilliant. Had a complex DTAA query resolved in under 30 minutes on a Sunday.",
                  stars: 5,
                  color: "from-amber-500 to-amber-700",
                  img: null,
                },
              ]).map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[380px] mx-4">
                  <div className="bg-white border border-slate-200 rounded-[1.5rem] p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all hover:-translate-y-1 h-full flex flex-col gap-5 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.color} opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:opacity-10 transition-opacity`} />
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <span key={s} className="text-amber-400 text-lg">★</span>
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-slate-700 leading-relaxed font-medium flex-1 text-base">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                      {/* Avatar — swap src with a real image path when ready */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                        {t.img
                          ? <img src={t.img} alt={t.name} className="w-full h-full object-cover rounded-full" />
                          : t.name.charAt(0)
                        }
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div className="overflow-hidden">
            <div className="marquee-track-reverse">
              {[
                {
                  name: "Divya Pillai",
                  role: "Co-founder, BioMedIndia Exports",
                  quote: "We moved $2M through FrontierPay last quarter. Not a single failed transaction. Their uptime is truly enterprise-grade.",
                  stars: 5,
                  color: "from-teal-500 to-teal-700",
                  img: null,
                },
                {
                  name: "Vikram Reddy",
                  role: "Treasury Head, Zenith Metals",
                  quote: "The OFAC sanctions check runs in real-time before every transfer. Saved us from a potential compliance disaster with a counterparty.",
                  stars: 5,
                  color: "from-cyan-500 to-cyan-700",
                  img: null,
                },
                {
                  name: "Meera Joshi",
                  role: "Founder, AromaSpice Exports",
                  quote: "Finally a platform that understands Indian exporters. RoDTEP incentives tracked automatically — it's like having a free CA.",
                  stars: 5,
                  color: "from-fuchsia-500 to-fuchsia-700",
                  img: null,
                },
                {
                  name: "Sanjay Patel",
                  role: "CFO, Horizon Agro",
                  quote: "Switched from HDFC trade finance. The rate difference alone more than covers the subscription. ROI was instant.",
                  stars: 5,
                  color: "from-orange-500 to-orange-700",
                  img: null,
                },
                {
                  name: "Ananya Singh",
                  role: "MD, CraftHouse International",
                  quote: "The dashboard is beautiful and our accountant loves the automated FIRC reports. Reduced our month-end close from 4 days to 1.",
                  stars: 5,
                  color: "from-lime-500 to-lime-700",
                  img: null,
                },
                {
                  name: "Rahul Desai",
                  role: "CEO, TechEdge Consulting",
                  quote: "The developer API is clean and well-documented. We integrated FrontierPay into our ERP in one sprint. Highly recommend.",
                  stars: 5,
                  color: "from-sky-500 to-sky-700",
                  img: null,
                },
              ].concat([
                {
                  name: "Divya Pillai",
                  role: "Co-founder, BioMedIndia Exports",
                  quote: "We moved $2M through FrontierPay last quarter. Not a single failed transaction. Their uptime is truly enterprise-grade.",
                  stars: 5,
                  color: "from-teal-500 to-teal-700",
                  img: null,
                },
                {
                  name: "Vikram Reddy",
                  role: "Treasury Head, Zenith Metals",
                  quote: "The OFAC sanctions check runs in real-time before every transfer. Saved us from a potential compliance disaster with a counterparty.",
                  stars: 5,
                  color: "from-cyan-500 to-cyan-700",
                  img: null,
                },
                {
                  name: "Meera Joshi",
                  role: "Founder, AromaSpice Exports",
                  quote: "Finally a platform that understands Indian exporters. RoDTEP incentives tracked automatically — it's like having a free CA.",
                  stars: 5,
                  color: "from-fuchsia-500 to-fuchsia-700",
                  img: null,
                },
                {
                  name: "Sanjay Patel",
                  role: "CFO, Horizon Agro",
                  quote: "Switched from HDFC trade finance. The rate difference alone more than covers the subscription. ROI was instant.",
                  stars: 5,
                  color: "from-orange-500 to-orange-700",
                  img: null,
                },
                {
                  name: "Ananya Singh",
                  role: "MD, CraftHouse International",
                  quote: "The dashboard is beautiful and our accountant loves the automated FIRC reports. Reduced our month-end close from 4 days to 1.",
                  stars: 5,
                  color: "from-lime-500 to-lime-700",
                  img: null,
                },
                {
                  name: "Rahul Desai",
                  role: "CEO, TechEdge Consulting",
                  quote: "The developer API is clean and well-documented. We integrated FrontierPay into our ERP in one sprint. Highly recommend.",
                  stars: 5,
                  color: "from-sky-500 to-sky-700",
                  img: null,
                },
              ]).map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[380px] mx-4">
                  <div className="bg-white border border-slate-200 rounded-[1.5rem] p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all hover:-translate-y-1 h-full flex flex-col gap-5 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${t.color} opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:opacity-10 transition-opacity`} />
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <span key={s} className="text-amber-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium flex-1 text-base">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                        {t.img
                          ? <img src={t.img} alt={t.name} className="w-full h-full object-cover rounded-full" />
                          : t.name.charAt(0)
                        }
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-20" />
        </div>
      </section>

      {/* CTA Section */}

      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to optimize your global treasury?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Join hundreds of Indian exporters saving millions on FX fees every month.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-50 shadow-xl transition-all hover:-translate-y-0.5">
              Open Dashboard
            </Link>
            <a href="/pricing" className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-slate-700 hover:bg-slate-700 shadow-sm transition-all hover:-translate-y-0.5">
              View Pricing
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
