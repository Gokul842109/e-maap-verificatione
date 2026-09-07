import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MessageSquare, Eye } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';
import type { Complaint } from '../../types';

export default function AuthorityComplaints() {
  const { state, dispatch, addToast } = useStore();
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Complaint | null>(null);

  const filtered = state.complaints.filter(c => {
    if (filter === 'ALL') return true;
    return c.status === filter;
  }).sort((a, b) => b.submittedDate.localeCompare(a.submittedDate));

  const tabs = [
    { key: 'ALL', label: 'All' }, { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'UNDER_REVIEW', label: 'Under Review' }, { key: 'INVESTIGATING', label: 'Investigating' },
    { key: 'RESOLVED', label: 'Resolved' },
  ];

  const handleUpdateStatus = (id: string, status: string) => {
    dispatch({ type: 'UPDATE_COMPLAINT', payload: { id, updates: { status: status as Complaint['status'] } } });
    addToast(`Complaint status updated to ${status}`, 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<MessageSquare size={48} className="text-gray-300" />} title="No complaints" description="No complaints match the filter" />
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b">
              <th className="table-header">Complaint ID</th>
              <th className="table-header">Instrument</th>
              <th className="table-header">Issue Type</th>
              <th className="table-header">Reporter</th>
              <th className="table-header">Status</th>
              <th className="table-header">Date</th>
              <th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="table-cell font-medium">{c.complaintId}</td>
                  <td className="table-cell text-sm text-gov-blue">{c.instrumentId}</td>
                  <td className="table-cell text-sm capitalize">{c.issueType.replace(/_/g, ' ')}</td>
                  <td className="table-cell text-sm">{c.reporterName}</td>
                  <td className="table-cell"><StatusBadge status={c.status} /></td>
                  <td className="table-cell text-sm">{formatDate(c.submittedDate)}</td>
                  <td className="table-cell">
                    <button onClick={() => setSelected(c)} className="text-gov-blue hover:underline text-sm flex items-center gap-1"><Eye size={14} /> View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Complaint ${selected?.complaintId}`} size="md">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Instrument:</span><p className="font-medium text-gov-blue">{selected.instrumentId}</p></div>
              <div><span className="text-gray-500">Issue Type:</span><p className="font-medium capitalize">{selected.issueType.replace(/_/g, ' ')}</p></div>
              <div><span className="text-gray-500">Reporter:</span><p className="font-medium">{selected.reporterName}</p></div>
              <div><span className="text-gray-500">Contact:</span><p className="font-medium">{selected.reporterContact}</p></div>
              <div><span className="text-gray-500">Location:</span><p className="font-medium">{selected.location || '—'}</p></div>
              <div><span className="text-gray-500">Date:</span><p className="font-medium">{formatDate(selected.submittedDate)}</p></div>
            </div>
            <div><span className="text-gray-500 text-sm">Description:</span><p className="mt-1 text-sm bg-gray-50 rounded-lg p-3">{selected.description}</p></div>
            <div><label className="label">Update Status</label>
              <select className="input-field" value={selected.status} onChange={e => { handleUpdateStatus(selected.id, e.target.value); setSelected({...selected, status: e.target.value as Complaint['status']}); }}>
                <option value="SUBMITTED">Submitted</option><option value="UNDER_REVIEW">Under Review</option><option value="INVESTIGATING">Investigating</option><option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
