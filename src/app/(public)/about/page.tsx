export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px', letterSpacing: '-0.02em' }}>About FrontierPay</h1>
        <p className="text-muted" style={{ fontSize: '20px', lineHeight: 1.6, marginBottom: '40px' }}>
          We are on a mission to democratize institutional-grade cross-border payments for Indian SMEs.
        </p>

        <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>The Problem</h2>
          <p className="text-muted" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
            For decades, traditional banks have charged opaque markups (up to 3%) on foreign exchange, coupled with high transfer fees and slow settlement times. For a growing Indian exporter or importer, these hidden costs eat directly into profit margins.
          </p>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Our Solution</h2>
          <p className="text-muted" style={{ fontSize: '16px', lineHeight: 1.6 }}>
            FrontierPay bypasses correspondent banking networks by leveraging local clearing rails (like PayNow in Singapore, ACH in the US) connected to our GIFT City treasury hub. We pass the Interbank FX spreads directly to you, providing 100% transparency.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <div className="text-blue font-bold" style={{ fontSize: '48px', marginBottom: '8px' }}>$500M+</div>
            <div className="text-muted">Volume Processed</div>
          </div>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <div className="text-green font-bold" style={{ fontSize: '48px', marginBottom: '8px' }}>₹120Cr+</div>
            <div className="text-muted">Savings Generated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
