import { Code, Link as LinkIcon } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <div className="animate-fade-in pt-40 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">Developer API</h1>
          <p className="text-slate-500 text-2xl">Integrate global payments directly into your ERP or marketplace.</p>
        </header>

        <div className="p-10 rounded-[2rem] bg-slate-900 backdrop-blur-xl shadow-2xl border border-slate-800 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-brand-500/30 transition-all"></div>
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
               <Code size={24} />
            </div>
            <h2 className="text-2xl font-bold">Create an Import Payment (cURL)</h2>
          </div>
          
          <pre className="relative z-10 overflow-x-auto">
            <code className="font-mono text-base leading-relaxed text-indigo-300">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:-translate-y-1 transition-all group">
            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex items-center gap-3">
              <LinkIcon className="text-brand-500 group-hover:scale-110 transition-transform" /> Webhooks
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">Receive real-time notifications for payment state changes, OCR completions, and compliance alerts.</p>
          </div>
          <div className="p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 hover:-translate-y-1 transition-all group">
            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex items-center gap-3">
              <Code className="text-emerald-500 group-hover:scale-110 transition-transform" /> SDKs
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">Official libraries available for Node.js, Python, Java, and Go.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
