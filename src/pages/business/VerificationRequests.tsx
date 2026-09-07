import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ClipboardList } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Timeline from '../../components/ui/Timeline';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';

export default function VerificationRequests() {
  const { state } = useStore();
  const user = state.currentUser;
  const myBusiness = state.businesses.find(b => b.userId === user?.id);
  const [filter, setFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const myRequests = state.verificationRequests.filter(vr => vr.businessId === myBusiness?.id);

  const filtered = myRequests.filter(vr => {
    if (filter === 'ALL') return true;
    if (filter === 'PENDING') return ['SUBMITTED', 'DOCUMENTS_VERIFIED'].includes(vr.status);
    if (filter === 'IN_PROGRESS') return ['INSPECTOR_ASSIGNED', 'INSPECTION_SCHEDULED', 'PHYSICAL_VERIFICATION', 'CERTIFICATE_GENERATION'].includes(vr.status);
    if (filter === 'COMPLETED') return vr.status === 'COMPLETED';
    if (filter === 'FAILED') return vr.status === 'FAILED';
    return true;
  }).sort((a, b) => b.submittedDate.localeCompare(a.submittedDate));

  const tabs = [
    { key: 'ALL', label: 'All' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'FAILED', label: 'Failed' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<ClipboardList size={48} className="text-gray-300" />} title="No requests found" description="No verification requests match the selected filter" />
      ) : (
        <div className="space-y-4">
          {filtered.map(vr => {
            const instrument = state.instruments.find(i => i.id === vr.instrumentId);
            return (
              <div key={vr.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === vr.id ? null : vr.id)}>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gov-blue">{vr.requestId}</p>
                      <p className="text-sm text-gray-500">{instrument?.type || 'Instrument'} · {instrument?.serialNumber || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={vr.status} />
                    <span className="text-sm text-gray-500">{formatDate(vr.submittedDate)}</span>
                    {vr.isReInspection && <span className="badge-warning">Re-inspection</span>}
                  </div>
                </div>

                {expandedId === vr.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-3">Request Details</h3>
                        <div className="text-sm space-y-2">
                          <p><span className="text-gray-500">Request ID:</span> <span className="font-medium">{vr.requestId}</span></p>
                          <p><span className="text-gray-500">Submitted:</span> <span className="font-medium">{formatDate(vr.submittedDate)}</span></p>
                          {vr.inspectorName && <p><span className="text-gray-500">Inspector:</span> <span className="font-medium">{vr.inspectorName}</span></p>}
                          {vr.scheduledDate && <p><span className="text-gray-500">Scheduled:</span> <span className="font-medium">{formatDate(vr.scheduledDate)}</span></p>}
                          {vr.isReInspection && <p><span className="text-gray-500">Reason:</span> <span className="font-medium text-amber-700">{vr.reInspectionReason}</span></p>}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-3">Application Timeline</h3>
                        <Timeline steps={vr.timeline} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
