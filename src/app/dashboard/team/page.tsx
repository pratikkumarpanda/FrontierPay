"use client";
import React, { useState } from 'react';
import { useMock } from '@/lib/MockContext';
import { Plus, User, Shield, Mail } from 'lucide-react';
import Modal from '@/components/Modal';

export default function TeamPage() {
  const { addToast } = useMock();
  const [activeModal, setActiveModal] = useState<'invite' | null>(null);
  
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');

  const [members, setMembers] = useState([
    { id: 'u1', email: 'founder@frontiertech.com', role: 'Admin', status: 'Active' },
    { id: 'u2', email: 'finance@frontiertech.com', role: 'Editor', status: 'Active' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setMembers([...members, { id: `u${Math.random()}`, email, role, status: 'Pending' }]);
    addToast('Invitation Sent', `An invitation has been sent to ${email}.`, 'success');
    setActiveModal(null);
    setEmail('');
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Team & Roles</h1>
          <p className="text-muted">Manage access control and corporate permissions.</p>
        </div>
        <button onClick={() => setActiveModal('invite')} className="btn btn-primary">
          <Plus size={16} /> Invite Member
        </button>
      </header>

      <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/60 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: 500 }} className="flex items-center gap-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  {user.email}
                </td>
                <td>
                  <span className="flex items-center gap-2">
                    {user.role === 'Admin' && <Shield size={14} className="text-blue" />}
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-yellow'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button type="button" onClick={() => addToast('Not Implemented', 'Role editing will be available in the next release.', 'info')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={activeModal === 'invite'} onClose={() => setActiveModal(null)} title="Invite Team Member">
        <form onSubmit={handleInvite}>
          <div className="form-group mb-4">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" className="form-input" style={{ paddingLeft: '36px' }} placeholder="colleague@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="form-group mb-6">
            <label className="form-label">Corporate Role</label>
            <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
              <option value="Admin">Admin (Full Access)</option>
              <option value="Editor">Editor (Can initiate payments)</option>
              <option value="Viewer">Viewer (Read-only)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full">Send Invitation</button>
        </form>
      </Modal>
    </div>
  );
}
