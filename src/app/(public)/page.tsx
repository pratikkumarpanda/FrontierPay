"use client";
import { ArrowRight, Globe2, ShieldCheck, Zap, Code, Wallet, ArrowRightLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: 'white',
            border: '1px solid #bfdbfe',
            borderRadius: '99px',
            color: 'var(--primary-blue)',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-blue)', display: 'inline-block' }}></span>
            FrontierPay V2 is now live in GIFT City
          </div>
          
          <h1 style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.03em', fontWeight: 700 }}>
            Global treasury management,<br />
            <span className="text-gradient">engineered for SMEs.</span>
          </h1>
          
          <p className="text-muted" style={{ fontSize: '20px', marginBottom: '40px', padding: '0 40px', lineHeight: 1.6 }}>
            Automate regulatory compliance, access zero-markup interbank FX rates, and settle international invoices on T+0—all from a single, unified platform.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/login" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Open Dashboard <ArrowRight size={18} />
            </Link>
            <a href="/pricing" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '16px', background: 'white' }}>
              View Pricing
            </a>
          </div>
        </div>

        {/* Hero Visual Mockup - High Fidelity */}
        <div className="container" style={{ marginTop: '80px', perspective: '1200px' }}>
          <div className="glass-panel" style={{ 
            padding: '16px', 
            background: 'rgba(255,255,255,0.7)', 
            borderRadius: '24px',
            transform: 'rotateX(8deg) rotateY(-5deg) rotateZ(1deg) scale(1)',
            boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.8)',
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateX(8deg) rotateY(-5deg) rotateZ(1deg) scale(1)';
          }}
          >
            <div style={{ background: '#f8fafc', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-glass-solid)', display: 'flex', height: '450px' }}>
              
              {/* Sidebar Preview */}
              <div style={{ width: '220px', background: 'rgba(255,255,255,0.8)', borderRight: '1px solid var(--border-glass-solid)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="flex items-center gap-2 mb-6 px-2">
                  <div style={{ width: '24px', height: '24px', background: 'var(--primary-blue)', borderRadius: '6px' }}></div>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>FrontierPay</span>
                </div>
                <div style={{ padding: '10px 12px', background: '#eff6ff', color: 'var(--primary-blue)', borderRadius: '8px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Globe2 size={16} /> Overview
                </div>
                <div style={{ padding: '10px 12px', color: 'var(--text-muted)', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Wallet size={16} /> Wallets
                </div>
                <div style={{ padding: '10px 12px', color: 'var(--text-muted)', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <ArrowRightLeft size={16} /> Transactions
                </div>
                <div style={{ padding: '10px 12px', color: 'var(--text-muted)', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Code size={16} /> Developers
                </div>
              </div>

              {/* Main Content Preview */}
              <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(255,255,255,0.4)', textAlign: 'left' }}>
                
                <div className="flex justify-between items-center">
                   <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Treasury Overview</h2>
                   <div style={{ padding: '6px 12px', background: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 500, border: '1px solid var(--border-glass-solid)' }}>
                     Live Mode <span style={{ color: 'var(--primary-green)' }}>●</span>
                   </div>
                </div>

                <div className="flex gap-4">
                  <div style={{ flex: 1, background: 'white', border: '1px solid var(--border-glass-solid)', borderRadius: '12px', padding: '20px' }}>
                    <div className="text-muted" style={{ fontSize: '12px', marginBottom: '8px' }}>Total Available Balance (USD)</div>
                    <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>$4,520,102.00</div>
                    <div className="text-green flex items-center gap-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--primary-green)' }}>
                      <TrendingUp size={14} /> +12.5% this month
                    </div>
                  </div>
                  <div style={{ flex: 1, background: 'white', border: '1px solid var(--border-glass-solid)', borderRadius: '12px', padding: '20px' }}>
                    <div className="text-muted" style={{ fontSize: '12px', marginBottom: '8px' }}>Active EEFC Accounts</div>
                    <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>4 Currencies</div>
                    <div className="text-muted" style={{ fontSize: '12px' }}>
                      USD, EUR, GBP, SGD
                    </div>
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid var(--border-glass-solid)', borderRadius: '12px', overflow: 'hidden', flex: 1 }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-glass-solid)', fontSize: '14px', fontWeight: 600 }}>Recent Settlements</div>
                  
                  <div className="flex items-center justify-between" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-glass-solid)' }}>
                    <div className="flex items-center gap-3">
                      <div style={{ background: '#ecfdf5', color: 'var(--primary-green)', padding: '6px', borderRadius: '50%' }}><ArrowRight size={14} /></div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>Inbound Wire (Acme Corp)</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>Processed today at 10:45 AM</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>+$150,000.00</div>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: '12px 20px' }}>
                    <div className="flex items-center gap-3">
                      <div style={{ background: '#eff6ff', color: 'var(--primary-blue)', padding: '6px', borderRadius: '50%' }}><ArrowRightLeft size={14} /></div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>USD to INR Conversion</div>
                        <div className="text-muted" style={{ fontSize: '11px' }}>Processed yesterday at 2:15 PM</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-blue)' }}>$45,000.00 → ₹37,57,500.00</div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By (Logo Cloud) */}
      <section style={{ borderTop: '1px solid var(--border-glass-solid)', borderBottom: '1px solid var(--border-glass-solid)', background: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>
        <div className="container">
          <p className="text-center text-muted font-medium" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>Trusted by fastest-growing Indian exporters</p>
          <div className="flex justify-center items-center gap-8" style={{ opacity: 0.6, filter: 'grayscale(100%)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'serif' }}>Acme Corp</h3>
            <h3 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'monospace' }}>TechNova</h3>
            <h3 style={{ fontSize: '24px', fontWeight: 800 }}>GlobalTrade</h3>
            <h3 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-1px' }}>VERTEX</h3>
            <h3 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'sans-serif' }}>NexusExports</h3>
          </div>
        </div>
      </section>

      {/* Deep Features Grid */}
      <section className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '600px', margin: '0 auto 64px' }}>
          <h2 style={{ fontSize: '36px', letterSpacing: '-0.02em', marginBottom: '16px' }}>The complete financial stack for global businesses.</h2>
          <p className="text-muted" style={{ fontSize: '18px' }}>Replace your bank, your broker, and your compliance team with a single API.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Compliance by Design</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Automated DTAA classification and Form 15CA/CB generation before payment execution, eliminating bank repair queues.</p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <TrendingUp size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Institutional FX Rates</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Access live interbank spreads (0.16-0.19%) directly through our treasury hub. Stop paying 2-3% retail markups on every invoice.</p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fefce8', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>T+0 Settlement</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Our direct ledger integration avoids correspondent bank hops. 97% of transactions settle same-day across 40+ countries.</p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Wallet size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>EEFC Wallets</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Hold your export proceeds in USD, EUR, or GBP indefinitely. Convert to INR only when you need working capital.</p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffe4e6', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Code size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Developer API</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Integrate global payouts directly into your marketplace or ERP. Generate bulk invoices and track UTRs programmatically.</p>
          </div>

          <div className="glass-panel glass-panel-hover" style={{ padding: '32px', background: 'white' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ArrowRightLeft size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Corporate Cards</h3>
            <p className="text-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>Issue virtual cards funded directly by your EEFC balances. Pay for AWS and SaaS without incurring conversion fees.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', background: 'var(--text-main)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '40px', letterSpacing: '-0.02em', marginBottom: '24px', color: 'white' }}>Ready to optimize your global treasury?</h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>Join hundreds of Indian exporters saving millions on FX fees every month.</p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/login" className="btn" style={{ padding: '16px 32px', fontSize: '16px', background: 'white', color: 'var(--text-main)' }}>
              Open Dashboard
            </Link>
            <a href="/pricing" className="btn" style={{ padding: '16px 32px', fontSize: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              View Pricing
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
