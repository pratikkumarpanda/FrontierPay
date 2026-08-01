import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-glass-solid)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div style={{ position: 'relative', width: '28px', height: '28px' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M 20 50 Q 30 20 60 20 L 80 20 Q 50 30 50 50 Z" fill="var(--primary-blue)" />
                <path d="M 15 75 Q 25 55 50 55 L 70 55 Q 40 65 40 85 Z" fill="var(--primary-green)" />
              </svg>
            </div>
            <span className="brand-font font-semibold" style={{ fontSize: '20px' }}>
              <span style={{ color: 'var(--text-main)' }}>Frontier</span>
              <span className="text-green">Pay</span>
            </span>
          </Link>
          <div className="flex gap-6 items-center text-muted font-medium" style={{ fontSize: '14px' }}>
            <Link href="/about" className="hover:text-blue">About</Link>
            <Link href="/pricing" className="hover:text-blue">Pricing</Link>
            <Link href="/developers" className="hover:text-blue">Developers</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="font-medium text-muted" style={{ fontSize: '14px' }}>Sign In</Link>
            <Link href="/login" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>
      
      {children}

      <footer style={{ background: 'white', borderTop: '1px solid var(--border-glass-solid)', padding: '64px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '64px' }}>
            <div>
              <Link href="/" className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <path d="M 20 50 Q 30 20 60 20 L 80 20 Q 50 30 50 50 Z" fill="var(--primary-blue)" />
                    <path d="M 15 75 Q 25 55 50 55 L 70 55 Q 40 65 40 85 Z" fill="var(--primary-green)" />
                  </svg>
                </div>
                <span className="brand-font font-semibold" style={{ fontSize: '18px' }}>FrontierPay</span>
              </Link>
              <p className="text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                GIFT City Treasury Hub<br/>Gandhinagar, Gujarat 382355<br/>India
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold" style={{ marginBottom: '16px' }}>Products</h4>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li><Link href="/dashboard/import">Import Payments</Link></li>
                <li><Link href="/dashboard/export">Export Receipts</Link></li>
                <li><Link href="/dashboard/wallets">EEFC Wallets</Link></li>
                <li><Link href="/dashboard/cards">Corporate Cards</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold" style={{ marginBottom: '16px' }}>Company</h4>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold" style={{ marginBottom: '16px' }}>Legal</h4>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/dtaa">DTAA Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-glass-solid)', paddingTop: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            © 2026 FrontierTech Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
