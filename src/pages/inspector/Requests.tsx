import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ClipboardList, Play, RefreshCw } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';

export default function InspectorRequests() {
  const { state } = useStore();
  const navigate = useNavigate();
  const user = state.currentUser;
  const [filter, setFilter] = useState('PENDING');

  const allRequests = state.verificationRequests;
  const myRequests = allRequests.filter(vr => vr.inspectorId === user?.id || !vr.inspectorId);

  const filtered = myRequests.filter(vr => {
    if (filter === 'PENDING') return ['SUBMITTED', 'DOCUMENTS_VERIFIED', 'INSPECTOR_ASSIGNED'].includes(vr.status);
    if (filter === 'SCHEDULED') return ['INSPECTION_SCHEDULED', 'PHYSICAL_VERIFICATION'].includes(vr.status);
    if (filter === 'REINSPECTION') return vr.isReInspection;
    return true;
  }).sort((a, b) => {
    const priorityOrder = { URGENT: 0, HIGH: 1, NORMAL: 2 };
    return (priorityOrder[a.priority || 'NORMAL'] || 2) - (priorityOrder[b.priority || 'NORMAL'] || 2);
  });

  const tabs = [
    { key: 'PENDING', label: 'Pending' },
    { key: 'SCHEDULED', label: 'Scheduled' },
    { key: 'REINSPECTION', label: 'Re-inspections' },
    { key: 'ALL', label: 'All' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
      <div className="flex gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<ClipboardList size={48} className="text-gray-300" />} title="No requests" description="No verification requests match the selected filter" />
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b">
              <th className="table-header">Request ID</th>
              <th className="table-header">Instrument</th>
              <th className="table-header">Business</th>
              <th className="table-header">Status</th>
              <th className="table-header">Priority</th>
              <th className="table-header">Date</th>
              <th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(vr => {
                const inst = state.instruments.find(i => i.id === vr.instrumentId);
                return (
                  <tr key={vr.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="table-cell font-medium text-gov-blue">{vr.requestId}</td>
                    <td className="table-cell">{inst?.type || '—'}<br/><span className="text-xs text-gray-400">{inst?.instrumentId}</span></td>
                    <td className="table-cell">{vr.businessName}</td>
                    <td className="table-cell"><StatusBadge status={vr.status} /></td>
                    <td className="table-cell">
                      {vr.priority === 'URGENT' && <span className="badge bg-red-100 text-red-800">URGENT</span>}
                      {vr.priority === 'HIGH' && <span className="badge bg-amber-100 text-amber-800">HIGH</span>}
                      {(!vr.priority || vr.priority === 'NORMAL') && <span className="badge bg-blue-100 text-blue-800">NORMAL</span>}
                    </td>
                    <td className="table-cell">{formatDate(vr.submittedDate)}</td>
                    <td className="table-cell">
                      {vr.status !== 'COMPLETED' && vr.status !== 'FAILED' && (
                        <button onClick={() => navigate(`/inspector/inspection/${vr.id}`)} className="btn-primary text-xs px-3 py-1.5">
                          <Play size={12} /> Start
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
