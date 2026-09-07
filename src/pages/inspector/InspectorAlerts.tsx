import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Bell, AlertTriangle, Eye } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { formatDateTime } from '../../utils/formatters';
import type { Alert } from '../../types';

export default function InspectorAlerts() {
  const { state } = useStore();
  const user = state.currentUser;
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Alert | null>(null);

  const myAlerts = state.alerts.filter(a => a.assignedInspectorId === user?.id || a.status === 'NEW');

  const filtered = myAlerts.filter(a => {
    if (filter === 'ALL') return true;
    if (filter === 'HIGH' || filter === 'MEDIUM' || filter === 'LOW') return a.severity === filter;
    if (filter === 'UNRESOLVED') return a.status !== 'RESOLVED';
    return true;
  });

  const tabs = [
    { key: 'ALL', label: 'All' },
    { key: 'HIGH', label: 'High' },
    { key: 'MEDIUM', label: 'Medium' },
    { key: 'LOW', label: 'Low' },
  ];

  const severityBorder = (s: string) => s === 'HIGH' ? 'border-l-red-500' : s === 'MEDIUM' ? 'border-l-amber-500' : 'border-l-blue-500';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
      <div className="flex gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Bell size={48} className="text-gray-300" />} title="No alerts" description="No alerts match the selected filter" />
      ) : (
        <div className="space-y-3">
          {filtered.map(alert => (
            <div key={alert.id} className={`card border-l-4 ${severityBorder(alert.severity)} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className={alert.severity === 'HIGH' ? 'text-red-500' : alert.severity === 'MEDIUM' ? 'text-amber-500' : 'text-blue-500'} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.instrumentId} · {alert.businessName} · {alert.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(alert.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={alert.status} />
                  <button onClick={() => setSelected(alert)} className="text-gov-blue hover:underline text-sm flex items-center gap-1"><Eye size={14} /> View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Alert Details" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`badge ${selected.severity === 'HIGH' ? 'bg-red-100 text-red-800' : selected.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>{selected.severity}</span>
              <StatusBadge status={selected.status} />
            </div>
            <p className="text-gray-700">{selected.message}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Instrument:</span> <span className="font-medium">{selected.instrumentId}</span></div>
              <div><span className="text-gray-500">Business:</span> <span className="font-medium">{selected.businessName}</span></div>
              <div><span className="text-gray-500">Location:</span> <span className="font-medium">{selected.location}</span></div>
              <div><span className="text-gray-500">Time:</span> <span className="font-medium">{formatDateTime(selected.timestamp)}</span></div>
            </div>
            {selected.details && selected.type === 'IDENTITY_MISMATCH' && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Registered Data</h4>
                  <p className="text-sm">Serial: <span className="font-mono font-medium">{selected.details.registeredSerial}</span></p>
                  <p className="text-sm">Model: <span className="font-medium">{selected.details.registeredModel}</span></p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Observed Data</h4>
                  <p className="text-sm">Serial: <span className="font-mono font-medium text-red-700">{selected.details.observedSerial}</span></p>
                  <p className="text-sm">Model: <span className="font-medium text-red-700">{selected.details.observedModel}</span></p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
