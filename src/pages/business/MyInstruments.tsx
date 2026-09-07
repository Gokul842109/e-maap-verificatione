import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Scale, Search, Eye, Filter } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import { formatDate } from '../../utils/formatters';
import type { Instrument } from '../../types';

export default function MyInstruments() {
  const { state } = useStore();
  const user = state.currentUser;
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  const myInstruments = state.instruments.filter(i => i.ownerId === user?.id);

  const filtered = myInstruments.filter(i => {
    if (filter !== 'ALL' && i.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return i.instrumentId.toLowerCase().includes(q) || i.serialNumber.toLowerCase().includes(q) || i.type.toLowerCase().includes(q);
    }
    return true;
  });

  const tabs = [
    { key: 'ALL', label: 'All', count: myInstruments.length },
    { key: 'ACTIVE', label: 'Active', count: myInstruments.filter(i => i.status === 'ACTIVE').length },
    { key: 'PENDING_VERIFICATION', label: 'Pending', count: myInstruments.filter(i => i.status === 'PENDING_VERIFICATION').length },
    { key: 'EXPIRED', label: 'Expired', count: myInstruments.filter(i => i.status === 'EXPIRED').length },
    { key: 'REVOKED', label: 'Revoked', count: myInstruments.filter(i => i.status === 'REVOKED').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Instruments</h1>
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search by ID or serial..." className="bg-transparent outline-none text-sm w-full" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {t.label} <span className="ml-1 opacity-75">({t.count})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Scale size={48} className="text-gray-300" />} title="No instruments found" description={search ? 'Try a different search term' : 'No instruments match the selected filter'} />
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="table-header">Instrument ID</th>
              <th className="table-header">Type</th>
              <th className="table-header">Serial Number</th>
              <th className="table-header">Capacity</th>
              <th className="table-header">Status</th>
              <th className="table-header">Last Verified</th>
              <th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(inst => (
                <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="table-cell font-medium text-gov-blue">{inst.instrumentId}</td>
                  <td className="table-cell">{inst.type}</td>
                  <td className="table-cell font-mono text-sm">{inst.serialNumber}</td>
                  <td className="table-cell">{inst.capacity}</td>
                  <td className="table-cell"><StatusBadge status={inst.status} /></td>
                  <td className="table-cell">{inst.verificationDate ? formatDate(inst.verificationDate) : '—'}</td>
                  <td className="table-cell">
                    <button onClick={() => setSelectedInstrument(inst)} className="text-gov-blue hover:underline text-sm flex items-center gap-1"><Eye size={14} /> View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Instrument Detail Modal */}
      <Modal isOpen={!!selectedInstrument} onClose={() => setSelectedInstrument(null)} title="Instrument Details" size="lg">
        {selectedInstrument && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gov-blue">{selectedInstrument.instrumentId}</h3>
              <StatusBadge status={selectedInstrument.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Type:</span><p className="font-medium">{selectedInstrument.type}</p></div>
              <div><span className="text-gray-500">Manufacturer:</span><p className="font-medium">{selectedInstrument.manufacturer}</p></div>
              <div><span className="text-gray-500">Model:</span><p className="font-medium">{selectedInstrument.model}</p></div>
              <div><span className="text-gray-500">Serial Number:</span><p className="font-medium font-mono">{selectedInstrument.serialNumber}</p></div>
              <div><span className="text-gray-500">Capacity:</span><p className="font-medium">{selectedInstrument.capacity}</p></div>
              <div><span className="text-gray-500">Accuracy Class:</span><p className="font-medium">{selectedInstrument.accuracyClass}</p></div>
              <div><span className="text-gray-500">Location:</span><p className="font-medium">{selectedInstrument.location}</p></div>
              <div><span className="text-gray-500">Year of Manufacture:</span><p className="font-medium">{selectedInstrument.yearOfManufacture}</p></div>
              {selectedInstrument.verificationDate && <div><span className="text-gray-500">Verification Date:</span><p className="font-medium">{formatDate(selectedInstrument.verificationDate)}</p></div>}
              {selectedInstrument.expiryDate && <div><span className="text-gray-500">Valid Until:</span><p className="font-medium">{formatDate(selectedInstrument.expiryDate)}</p></div>}
            </div>
            {selectedInstrument.digitalFingerprint && (
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500">Digital Fingerprint</span>
                <p className="font-mono text-xs mt-1 break-all">{selectedInstrument.digitalFingerprint.slice(0, 32)}...</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
