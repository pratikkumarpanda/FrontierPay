import { Code } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <header style={{ marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>Developer API</h1>
          <p className="text-muted" style={{ fontSize: '18px' }}>Integrate global payments directly into your ERP or marketplace.</p>
        </header>

        <div className="glass-panel" style={{ padding: '40px', background: 'var(--text-main)', color: 'white' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Code size={24} className="text-blue" />
            <h2 style={{ fontSize: '20px' }}>Create an Import Payment (cURL)</h2>
          </div>
          
          <pre style={{ margin: 0, padding: 0, background: 'transparent' }}>
            <code style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: 1.5, color: '#a5b4fc' }}>
{`curl -X POST https://api.frontierpay.in/v1/payments \\
  -H "Authorization: Bearer sk_test_12345" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 12000,
    "currency": "USD",
    "beneficiary_id": "ben_890",
    "purpose_code": "S0101",
    "invoice_document_id": "doc_456"
  }'`}
            </code>
          </pre>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '40px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 className="font-semibold" style={{ fontSize: '18px', marginBottom: '12px' }}>Webhooks</h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>Receive real-time notifications for payment state changes, OCR completions, and compliance alerts.</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 className="font-semibold" style={{ fontSize: '18px', marginBottom: '12px' }}>SDKs</h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>Official libraries available for Node.js, Python, Java, and Go.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
