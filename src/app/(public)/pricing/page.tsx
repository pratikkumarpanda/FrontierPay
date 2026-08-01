import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Transparent Pricing</h1>
          <p className="text-muted" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            No hidden wire fees, no spread markups. Just a single transparent fee based on your volume.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div className="glass-panel" style={{ padding: '40px 32px' }}>
            <h3 className="font-semibold text-muted" style={{ fontSize: '16px', marginBottom: '16px' }}>Starter</h3>
            <div className="font-bold text-main" style={{ fontSize: '40px', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              0.58%
            </div>
            <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>For businesses doing less than $100k / month.</p>
            <ul className="flex flex-col gap-4 text-muted" style={{ fontSize: '14px', marginBottom: '40px', listStyle: 'none' }}>
              <li>✓ Automated 15CA/CB</li>
              <li>✓ T+1 Settlement</li>
              <li>✓ 3 Currencies (USD, EUR, GBP)</li>
            </ul>
            <Link href="/login" className="btn btn-secondary flex justify-center" style={{ width: '100%' }}>Get Started</Link>
          </div>

          <div className="glass-panel" style={{ padding: '40px 32px', transform: 'scale(1.05)', background: 'rgba(255,255,255,0.9)', border: '2px solid var(--primary-blue)', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-blue)', color: 'white', padding: '6px 16px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
            <h3 className="font-semibold text-blue" style={{ fontSize: '16px', marginBottom: '16px' }}>Growth</h3>
            <div className="font-bold text-main" style={{ fontSize: '40px', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              0.38%
            </div>
            <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>For businesses doing $100k - $1M / month.</p>
            <ul className="flex flex-col gap-4 text-muted" style={{ fontSize: '14px', marginBottom: '40px', listStyle: 'none' }}>
              <li>✓ Dedicated Account Manager</li>
              <li>✓ T+0 Settlement</li>
              <li>✓ EEFC Wallets</li>
              <li>✓ Free e-FIRCs</li>
            </ul>
            <a href="mailto:sales@frontierpay.com" className="btn btn-primary flex justify-center" style={{ width: '100%' }}>Contact Sales</a>
          </div>

          <div className="glass-panel" style={{ padding: '40px 32px' }}>
            <h3 className="font-semibold text-muted" style={{ fontSize: '16px', marginBottom: '16px' }}>Enterprise</h3>
            <div className="font-bold text-main" style={{ fontSize: '40px', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Custom
            </div>
            <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>For large exporters and institutions.</p>
            <ul className="flex flex-col gap-4 text-muted" style={{ fontSize: '14px', marginBottom: '40px', listStyle: 'none' }}>
              <li>✓ API Integration</li>
              <li>✓ Bespoke FX Hedging</li>
              <li>✓ Approval Workflows</li>
            </ul>
            <a href="mailto:sales@frontierpay.com" className="btn btn-secondary flex justify-center" style={{ width: '100%' }}>Contact Sales</a>
          </div>

        </div>
      </div>
    </div>
  );
}
