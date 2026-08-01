"use client";
import { 
  LayoutDashboard, ArrowRightLeft, ArrowLeftRight, Calculator, 
  Settings, LogOut, Wallet, Users, FileText, CreditCard, Code, 
  Search, Bell, ChevronDown, ShieldCheck 
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MockProvider } from '@/lib/MockContext';
import ToastContainer from '@/components/ToastContainer';
import TopBar from '@/components/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "flex items-center gap-3 p-2 rounded-md text-blue bg-[#eff6ff] font-medium text-[13px]" 
      : "flex items-center gap-3 p-2 rounded-md text-muted hover:bg-gray-100 transition-colors text-[13px]";
  };

  return (
    <MockProvider>
      <div className="flex" style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          borderRight: '1px solid var(--border-glass-solid)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40
        }}>
          <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
            <Link href="/" className="flex items-center gap-3">
              <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  <path d="M 20 50 Q 30 20 60 20 L 80 20 Q 50 30 50 50 Z" fill="var(--primary-blue)" />
                  <path d="M 15 75 Q 25 55 50 55 L 70 55 Q 40 65 40 85 Z" fill="var(--primary-green)" />
                </svg>
              </div>
              <span className="brand-font font-semibold" style={{ fontSize: '18px' }}>
                <span style={{ color: 'var(--text-main)' }}>Frontier</span>
                <span className="text-green">Pay</span>
              </span>
            </Link>
          </div>

          <nav className="flex flex-col gap-6" style={{ flex: 1, overflowY: 'auto' }}>
            
            {/* Core */}
            <div>
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pl-2">Core</div>
              <div className="flex flex-col gap-1">
                <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                  <LayoutDashboard size={16} /> Home Overview
                </Link>
                <Link href="/dashboard/transactions" className={getLinkClass('/dashboard/transactions')}>
                  <ArrowRightLeft size={16} /> Transactions
                </Link>
                <Link href="/dashboard/approvals" className={getLinkClass('/dashboard/approvals')}>
                  <ShieldCheck size={16} /> Approvals
                </Link>
                <Link href="/dashboard/reports" className={getLinkClass('/dashboard/reports')}>
                  <FileText size={16} /> Reports & Tax
                </Link>
              </div>
            </div>

            {/* Treasury Products */}
            <div>
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pl-2">Treasury Products</div>
              <div className="flex flex-col gap-1">
                <Link href="/dashboard/import" className={getLinkClass('/dashboard/import')}>
                  <ArrowRightLeft size={16} /> Import Payments
                </Link>
                <Link href="/dashboard/export" className={getLinkClass('/dashboard/export')}>
                  <ArrowLeftRight size={16} /> Export Receipts
                </Link>
                <Link href="/dashboard/financing" className={getLinkClass('/dashboard/financing')}>
                  <CreditCard size={16} /> Trade Credit & Financing
                </Link>
                <Link href="/dashboard/calculator" className={getLinkClass('/dashboard/calculator')}>
                  <Calculator size={16} /> FX Calculator
                </Link>
              </div>
            </div>

            {/* Banking Products */}
            <div>
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pl-2">Banking Products</div>
              <div className="flex flex-col gap-1">
                <Link href="/dashboard/wallets" className={getLinkClass('/dashboard/wallets')}>
                  <Wallet size={16} /> Multi-Currency Wallets
                </Link>
                <Link href="/dashboard/cards" className={getLinkClass('/dashboard/cards')}>
                  <CreditCard size={16} /> Corporate Cards
                </Link>
              </div>
            </div>

            {/* Business & Network */}
            <div>
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pl-2">Business</div>
              <div className="flex flex-col gap-1">
                <Link href="/dashboard/counterparties" className={getLinkClass('/dashboard/counterparties')}>
                  <Users size={16} /> Counterparties
                </Link>
                <Link href="/dashboard/team" className={getLinkClass('/dashboard/team')}>
                  <Users size={16} /> Team & Roles
                </Link>
              </div>
            </div>
            
            {/* Developers */}
            <div>
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2 pl-2">Developers</div>
              <div className="flex flex-col gap-1">
                <Link href="/dashboard/developers" className={getLinkClass('/dashboard/developers')}>
                  <Code size={16} /> API & Webhooks
                </Link>
              </div>
            </div>

          </nav>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-glass-solid)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link href="/dashboard/settings" className={getLinkClass('/dashboard/settings')}>
              <Settings size={16} /> Account & Settings
            </Link>
            <Link href="/login" className="flex items-center gap-3 p-2 rounded-md hover-bg-subtle w-full text-left text-[13px]" style={{ color: '#ef4444', transition: 'all 0.2s' }}>
              <LogOut size={16} /> Log Out
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Top App Bar */}
          <TopBar />

          <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {children}
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </MockProvider>
  );
}
