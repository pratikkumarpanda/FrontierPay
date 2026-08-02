"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Transaction = {
  id: string;
  type: 'Import' | 'Export' | 'Card' | 'Internal' | 'Conversion';
  amount: number;
  currency: string;
  status: 'Settled' | 'Processing' | 'Failed' | 'Pending Approval';
  date: string;
  timestamp?: number;
  requiresApproval?: boolean;
};

export type WebhookLog = {
  id: string;
  event: string;
  timestamp: string;
  payload: any;
};

export type UserRole = 'Owner' | 'Admin' | 'Viewer';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type CompanyProfile = {
  legalName: string;
  registrationType: string;
  gstin: string;
  iec: string;
  address: string;
};

export type TeamMember = {
  id: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending';
};

export type Balances = {
  INR: number;
  USD: number;
  SGD: number;
  EUR: number;
  GBP: number;
};

export type CreditLimits = {
  invoiceFinancing: {
    limit: number;
    used: number;
  };
  payLater: {
    limit: number;
    used: number;
  };
};

export type Card = {
  id: string;
  last4: string;
  name: string;
  limit: number;
  spent: number;
  status: 'Active' | 'Frozen';
};

export type Counterparty = {
  id: string;
  name: string;
  country: string;
  account: string;
};

export type ToastMessage = {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

export type PricingTier = 'Starter' | 'Growth' | 'Enterprise';
export const NETWORK_FEE_USD = 15;
export const MARKUP_MAP: Record<PricingTier, number> = {
  Starter: 0.0058, // 0.58%
  Growth: 0.0038,  // 0.38%
  Enterprise: 0.0015 // 0.15%
};

interface MockContextType {
  balances: Balances;
  transactions: Transaction[];
  cards: Card[];
  counterparties: Counterparty[];
  fxRates: Record<string, number>;
  toasts: ToastMessage[];
  webhookLogs: WebhookLog[];
  tier: PricingTier;
  markupMultiplier: number;
  creditLimits: CreditLimits;
  setTier: (tier: PricingTier) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  deductBalance: (currency: keyof Balances, amount: number) => void;
  addBalance: (currency: keyof Balances, amount: number) => void;
  addTransaction: (tx: Transaction) => void;
  issueCard: (card: Omit<Card, 'id' | 'spent' | 'status'>) => void;
  toggleCardStatus: (id: string) => void;
  addCounterparty: (cp: Omit<Counterparty, 'id'>) => void;
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  useCredit: (type: 'invoiceFinancing' | 'payLater', amount: number) => void;
  
  currentUser: UserProfile;
  companyProfile: CompanyProfile;
  teamMembers: TeamMember[];
  setCurrentUserRole: (role: UserRole) => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  inviteTeamMember: (email: string, role: UserRole) => void;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

export function MockProvider({ children }: { children: ReactNode }) {
  const [balances, setBalances] = useState<Balances>({
    INR: 12450000.00,
    USD: 45200.00,
    SGD: 15000.00,
    EUR: 0,
    GBP: 0,
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'u-self',
    name: 'Frontier Tech',
    email: 'founder@frontiertech.com',
    role: 'Owner'
  });

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    legalName: "Frontier Technologies Private Limited",
    registrationType: "Private Limited",
    gstin: "27AADCF1234E1Z5",
    iec: "0312014567",
    address: "Unit 402, Cyber City,\nGurgaon, Haryana\n122002"
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'u1', email: 'founder@frontiertech.com', role: 'Owner', status: 'Active' },
    { id: 'u2', email: 'finance@frontiertech.com', role: 'Admin', status: 'Active' },
  ]);

  const [creditLimits, setCreditLimits] = useState<CreditLimits>({
    invoiceFinancing: { limit: 500000, used: 125000 },
    payLater: { limit: 250000, used: 0 }
  });

  const [tier, setTier] = useState<PricingTier>('Growth');
  const markupMultiplier = 1 + MARKUP_MAP[tier];

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TRX-8921', type: 'Import', amount: 12000, currency: 'USD', status: 'Settled', date: 'Today, 14:30' },
    { id: 'TRX-8920', type: 'Export', amount: 4500, currency: 'USD', status: 'Settled', date: 'Yesterday, 09:15' },
  ]);

  const [cards, setCards] = useState<Card[]>([
    { id: 'c-1', last4: '4092', name: 'AWS & Cloud Services', limit: 10000, spent: 3450, status: 'Active' },
    { id: 'c-2', last4: '8811', name: 'Travel & T&E', limit: 5000, spent: 120, status: 'Active' }
  ]);

  const [counterparties, setCounterparties] = useState<Counterparty[]>([
    { id: 'cp-1', name: 'Global Tech Suppliers LLC', country: 'United States', account: 'US349002811' },
    { id: 'cp-2', name: 'Singapore Logistics Pte', country: 'Singapore', account: 'SG10293021' }
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);

  const [fxRates, setFxRates] = useState<Record<string, number>>({
    INR: 83.50, // Fallbacks
    SGD: 1.34,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 155.0
  });

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setFxRates(data.rates);
        }
      })
      .catch(err => console.error("Failed to fetch live rates", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => {
        let hasChanges = false;
        const newTxs = prev.map(tx => {
          if (tx.status === 'Processing' && tx.timestamp && Date.now() - tx.timestamp > 10000) {
            hasChanges = true;
            // Fire webhook
            setWebhookLogs(logs => [{
              id: `evt_${Math.random().toString(36).substr(2, 9)}`,
              event: 'payment.settled',
              timestamp: new Date().toISOString(),
              payload: { transaction_id: tx.id, amount: tx.amount, currency: tx.currency }
            }, ...logs]);
            
            return { ...tx, status: 'Settled' as const, date: 'Just now' };
          }
          return tx;
        });

        return hasChanges ? newTxs : prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const deductBalance = (currency: keyof Balances, amount: number) => {
    setBalances(prev => ({ ...prev, [currency]: prev[currency] - amount }));
  };

  const addBalance = (currency: keyof Balances, amount: number) => {
    setBalances(prev => ({ ...prev, [currency]: prev[currency] + amount }));
  };

  const addTransaction = (tx: Transaction) => {
    const isLarge = tx.amount > 10000;
    const finalTx: Transaction = {
      ...tx,
      status: isLarge ? 'Pending Approval' : tx.status,
      requiresApproval: isLarge,
      timestamp: Date.now()
    };
    setTransactions(prev => [finalTx, ...prev]);
    
    setWebhookLogs(logs => [{
      id: `evt_${Math.random().toString(36).substr(2, 9)}`,
      event: isLarge ? 'payment.pending_approval' : 'payment.processing',
      timestamp: new Date().toISOString(),
      payload: { transaction_id: finalTx.id, amount: finalTx.amount, currency: finalTx.currency }
    }, ...logs]);
  };

  const issueCard = (card: Omit<Card, 'id' | 'spent' | 'status'>) => {
    const newCard: Card = {
      ...card,
      id: `c-${Math.random().toString(36).substr(2, 9)}`,
      spent: 0,
      status: 'Active'
    };
    setCards(prev => [...prev, newCard]);
  };

  const toggleCardStatus = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Frozen' : 'Active' } : c));
  };

  const addCounterparty = (cp: Omit<Counterparty, 'id'>) => {
    const newCp: Counterparty = {
      ...cp,
      id: `cp-${Math.random().toString(36).substr(2, 9)}`
    };
    setCounterparties(prev => [...prev, newCp]);
  };

  const useCredit = (type: 'invoiceFinancing' | 'payLater', amount: number) => {
    setCreditLimits(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        used: prev[type].used + amount
      }
    }));
  };

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    setCompanyProfile(prev => ({ ...prev, ...profile }));
  };

  const inviteTeamMember = (email: string, role: UserRole) => {
    setTeamMembers(prev => [...prev, { id: `u${Math.random()}`, email, role, status: 'Pending' }]);
  };

  return (
    <MockContext.Provider value={{ 
      balances, transactions, cards, counterparties, fxRates, toasts, webhookLogs, tier, markupMultiplier, creditLimits, setTier, setTransactions,
      deductBalance, addBalance, addTransaction, issueCard, toggleCardStatus, addCounterparty, addToast, removeToast, useCredit,
      currentUser, companyProfile, teamMembers, setCurrentUserRole, updateCompanyProfile, inviteTeamMember
    }}>
      {children}
    </MockContext.Provider>
  );
}

export function useMock() {
  const context = useContext(MockContext);
  if (context === undefined) {
    throw new Error('useMock must be used within a MockProvider');
  }
  return context;
}
