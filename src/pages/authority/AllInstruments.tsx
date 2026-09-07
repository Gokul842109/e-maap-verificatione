import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Scale, Search, Eye } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';
import { calculateRiskScore } from '../../utils/riskScore';
import type { Instrument } from '../../types';

export default function AllInstruments() {
  const { state } = useStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selected, setSelected] = useState<Instrument | null>(null);

  const filtered = state.instruments.filter(i => {
    if (statusFilter !== 'ALL' && i.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && i.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return i.instrumentId.toLowerCase().includes(q) || i.serialNumber.toLowerCase().includes(q) || i.businessName.toLowerCase().includes(q);
    }
    return true;
  });

  const getRisk = (inst: Instrument) => {
    return calculateRiskScore(inst.instrumentId, {
      previousFailedInspection: inst.status === 'REVOKED',
      customerComplaints: state.complaints.filter(c => c.instrumentId === inst.instrumentId).length,
      certificateExpiringSoon: inst.status === 'EXPIRING_SOON',
      identityMismatch: inst.status === 'RE_INSPECTION_REQUIRED',
      repeatedViolations: 0, ageOfInstrumentYears: 2, lastInspectionDaysAgo: 30,
    });
  };

  const types = [...new Set(state.instruments.map(i => i.type))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Instruments</h1>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option><option value="PENDING_VERIFICATION">Pending</option>
          <option value="EXPIRED">Expired</option><option value="REVOKED">Revoked</option>
          <option value="EXPIRING_SOON">Expiring Soon</option><option value="SUSPENDED">Suspended</option>
        </select>
        <select className="input-field w-52" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="ALL">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Scale size={48} className="text-gray-300" />} title="No instruments found" description="Try different filters" />
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b">
              <th className="table-header">Instrument ID</th><th className="table-header">Type</th>
              <th className="table-header">Business</th><th className="table-header">Serial Number</th>
              <th className="table-header">Status</th><th className="table-header">Risk</th>
              <th className="table-header">Last Verified</th><th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(inst => {
                const risk = getRisk(inst);
                return (
                  <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="table-cell font-medium text-gov-blue">{inst.instrumentId}</td>
                    <td className="table-cell text-sm">{inst.type}</td>
                    <td className="table-cell text-sm">{inst.businessName}</td>
                    <td className="table-cell font-mono text-sm">{inst.serialNumber}</td>
                    <td className="table-cell"><StatusBadge status={inst.status} /></td>
                    <td className="table-cell">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${risk.level === 'HIGH' ? 'bg-red-100 text-red-800' : risk.level === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{risk.score}</span>
                    </td>
                    <td className="table-cell text-sm">{inst.verificationDate ? formatDate(inst.verificationDate) : '—'}</td>
                    <td className="table-cell">
                      <button onClick={() => setSelected(inst)} className="text-gov-blue hover:underline text-sm flex items-center gap-1"><Eye size={14} /> View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Instrument Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gov-blue">{selected.instrumentId}</h3>
              <StatusBadge status={selected.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Type:</span><p className="font-medium">{selected.type}</p></div>
              <div><span className="text-gray-500">Manufacturer:</span><p className="font-medium">{selected.manufacturer}</p></div>
              <div><span className="text-gray-500">Model:</span><p className="font-medium">{selected.model}</p></div>
              <div><span className="text-gray-500">Serial:</span><p className="font-mono font-medium">{selected.serialNumber}</p></div>
              <div><span className="text-gray-500">Capacity:</span><p className="font-medium">{selected.capacity}</p></div>
              <div><span className="text-gray-500">Business:</span><p className="font-medium">{selected.businessName}</p></div>
              <div><span className="text-gray-500">Owner:</span><p className="font-medium">{selected.ownerName}</p></div>
              <div><span className="text-gray-500">Last Verified:</span><p className="font-medium">{selected.verificationDate ? formatDate(selected.verificationDate) : '—'}</p></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setSelected(null); navigate(`/instrument/${selected.id}`); }} className="btn-primary text-sm">View Integrity Page</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
