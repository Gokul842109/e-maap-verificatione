import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Shield, Lock, Search } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

export default function AuditLog() {
  const { state } = useStore();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = state.auditLogs.filter(log => {
    if (roleFilter !== 'ALL' && log.actorRole !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return log.actor.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.details.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const roleBadge = (role: string) => {
    switch (role) {
      case 'system': return 'bg-blue-100 text-blue-800';
      case 'inspector': return 'bg-green-100 text-green-800';
      case 'authority': return 'bg-purple-100 text-purple-800';
      case 'business': return 'bg-gray-100 text-gray-800';
      case 'public': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const tabs = [{ key: 'ALL', label: 'All' }, { key: 'system', label: 'System' }, { key: 'inspector', label: 'Inspector' }, { key: 'authority', label: 'Authority' }, { key: 'business', label: 'Business' }];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Shield size={24} className="text-gov-blue" /> Audit Log</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
        <Lock size={18} className="text-blue-600" />
        <p className="text-sm text-blue-800">Every critical workflow action is recorded for accountability and transparency. Audit logs are immutable.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setRoleFilter(t.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${roleFilter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t.label}</button>
          ))}
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search logs..." className="bg-transparent outline-none text-sm w-full" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {filtered.map((log, i) => (
            <div key={log.id} className={`relative flex gap-4 pl-12 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} rounded-lg p-4`}>
              <div className="absolute left-4 top-5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                <Lock size={8} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-gray-400">{formatDateTime(log.timestamp)}</span>
                  <span className="font-medium text-sm text-gray-900">{log.actor}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge(log.actorRole)}`}>{log.actorRole}</span>
                </div>
                <p className="font-medium text-gray-900 mt-1">{log.action}</p>
                <p className="text-sm text-gray-500 mt-0.5">{log.details}</p>
                {log.entityType && <span className="text-xs text-gray-400 mt-1 inline-block">Entity: {log.entityType} ({log.entityId})</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
