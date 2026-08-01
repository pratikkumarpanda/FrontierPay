"use client";
import { 
  LayoutDashboard, ArrowRightLeft, ArrowLeftRight, Calculator, 
  Settings, LogOut, Wallet, Users, FileText, CreditCard, Code, 
  ShieldCheck, Globe
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
      ? "flex items-center gap-3 px-3 py-3 text-slate-900 bg-slate-50 rounded-xl transition-all font-medium" 
      : "flex items-center gap-3 px-3 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group";
  };

  const getIconClass = (path: string) => {
    return pathname === path
      ? "text-brand-600"
      : "group-hover:text-brand-600 transition-colors";
  };

  return (
    <MockProvider>
      <div className="font-sans h-screen flex overflow-hidden selection:bg-brand-500 selection:text-white bg-slate-50">
        
        {/* SIDEBAR */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300 z-50">
          {/* Logo Area */}
          <div className="h-20 flex items-center px-6 justify-start border-b border-slate-200 relative group cursor-pointer" onClick={() => window.location.href='/dashboard'}>
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20 flex-shrink-0 transition-transform group-hover:scale-105">
                  F
              </div>
              <div className="ml-3">
                  <h1 className="text-xl font-display font-bold text-slate-900 tracking-tight">Frontier<span className="text-brand-600">Pay</span></h1>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider group-hover:text-brand-600 transition-colors">Treasury OS v2.4</p>
              </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            
            {/* Core */}
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                <LayoutDashboard className={`w-5 h-5 text-center ${getIconClass('/dashboard')}`} />
                <span className="font-medium text-[14px]">Command Center</span>
            </Link>

            <Link href="/dashboard/transactions" className={getLinkClass('/dashboard/transactions')}>
                <ArrowRightLeft className={`w-5 h-5 text-center ${getIconClass('/dashboard/transactions')}`} />
                <span className="font-medium text-[14px]">Transactions</span>
            </Link>

            <Link href="/dashboard/approvals" className={getLinkClass('/dashboard/approvals')}>
                <ShieldCheck className={`w-5 h-5 text-center ${getIconClass('/dashboard/approvals')}`} />
                <span className="font-medium text-[14px]">Approvals</span>
            </Link>

            <Link href="/dashboard/reports" className={getLinkClass('/dashboard/reports')}>
                <FileText className={`w-5 h-5 text-center ${getIconClass('/dashboard/reports')}`} />
                <span className="font-medium text-[14px]">Reports & Tax</span>
            </Link>

            <div className="px-3 mt-6 mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Money</p>
                <Globe className="w-3 h-3 text-slate-400" />
            </div>

            <Link href="/dashboard/import" className={getLinkClass('/dashboard/import')}>
                <ArrowRightLeft className={`w-5 h-5 text-center ${getIconClass('/dashboard/import')}`} />
                <span className="font-medium text-[14px]">Import Payments</span>
            </Link>

            <Link href="/dashboard/export" className={getLinkClass('/dashboard/export')}>
                <ArrowLeftRight className={`w-5 h-5 text-center ${getIconClass('/dashboard/export')}`} />
                <span className="font-medium text-[14px]">Export Receipts</span>
            </Link>

            <div className="px-3 mt-6 mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financing</p>
            </div>

            <Link href="/dashboard/financing" className={getLinkClass('/dashboard/financing')}>
                <CreditCard className={`w-5 h-5 text-center ${getIconClass('/dashboard/financing')}`} />
                <span className="font-medium text-[14px]">Trade Credit</span>
            </Link>

            <div className="px-3 mt-6 mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Banking</p>
            </div>

            <Link href="/dashboard/wallets" className={getLinkClass('/dashboard/wallets')}>
                <Wallet className={`w-5 h-5 text-center ${getIconClass('/dashboard/wallets')}`} />
                <span className="font-medium text-[14px]">Wallets</span>
            </Link>

            <Link href="/dashboard/counterparties" className={getLinkClass('/dashboard/counterparties')}>
                <Users className={`w-5 h-5 text-center ${getIconClass('/dashboard/counterparties')}`} />
                <span className="font-medium text-[14px]">Counterparties</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-200 space-y-1">
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
                  <Settings className="w-5 h-5 text-center group-hover:text-slate-900 transition-colors" />
                  <span className="font-medium text-[14px]">Settings</span>
              </Link>
              <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all group">
                  <LogOut className="w-5 h-5 text-center" />
                  <span className="font-medium text-[14px]">Sign Out</span>
              </Link>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden">
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-100/50 blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-200/30 blur-3xl opacity-50 pointer-events-none"></div>

          {/* Top App Bar */}
          <TopBar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-grid relative z-10 no-scrollbar p-10">
            {children}
          </main>
        </div>
      </div>
      <ToastContainer />
    </MockProvider>
  );
}
