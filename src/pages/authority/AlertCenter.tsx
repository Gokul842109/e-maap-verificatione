import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { AlertTriangle, Eye, UserPlus } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { formatDateTime, generateUniqueId } from '../../utils/formatters';
import type { Alert } from '../../types';

export default function AlertCenter() {
  const { state, dispatch, addToast } = useStore();
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Alert | null>(null);
  const [showAssign, setShowAssign] = useState<Alert | null>(null);
  const [assignForm, setAssignForm] = useState({ inspectorId: '', date: '', time: '', priority: 'NORMAL' as string, remarks: '' });

  const filtered = state.alerts.filter(a => {
    if (filter === 'ALL') return true;
    if (filter === 'HIGH' || filter === 'MEDIUM' || filter === 'LOW') return a.severity === filter;
    if (filter === 'UNRESOLVED') return a.status !== 'RESOLVED';
    return true;
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const inspectors = state.users.filter(u => u.role === 'inspector');

  const handleAssign = () => {
    if (!showAssign || !assignForm.inspectorId) return;
    const inspector = inspectors.find(u => u.id === assignForm.inspectorId);
    dispatch({
      type: 'ADD_VERIFICATION_REQUEST', payload: {
        id: generateUniqueId(), requestId: `VR-${Date.now()}`,
        instrumentId: state.instruments.find(i => i.instrumentId === showAssign.instrumentId)?.id || '',
        businessId: '', businessName: showAssign.businessName,
        status: 'INSPECTOR_ASSIGNED' as const, submittedDate: new Date().toISOString().split('T')[0],
        inspectorId: assignForm.inspectorId, inspectorName: inspector?.name,
        scheduledDate: assignForm.date, isReInspection: true,
        reInspectionReason: showAssign.message, priority: assignForm.priority as 'NORMAL' | 'HIGH' | 'URGENT',
        timeline: [{ label: 'Re-inspection Scheduled', status: 'completed' as const, date: new Date().toISOString().split('T')[0] }, { label: 'Inspector Assigned', status: 'current' as const }, { label: 'Inspection', status: 'pending' as const }],
      }
    });
    dispatch({ type: 'UPDATE_ALERT', payload: { id: showAssign.id, updates: { status: 'ASSIGNED', assignedInspectorId: assignForm.inspectorId } } });
    dispatch({ type: 'ADD_AUDIT_LOG', payload: { id: generateUniqueId(), timestamp: new Date().toISOString(), actor: state.currentUser?.name || 'Authority', actorRole: 'authority', action: 'Re-inspection assigned', details: `Inspector ${inspector?.name} assigned for ${showAssign.instrumentId}`, entityType: 'alert', entityId: showAssign.id } });
    addToast('Inspector assigned for re-inspection', 'success');
    setShowAssign(null);
    setAssignForm({ inspectorId: '', date: '', time: '', priority: 'NORMAL', remarks: '' });
  };

  const tabs = [{ key: 'ALL', label: 'All' }, { key: 'HIGH', label: 'High' }, { key: 'MEDIUM', label: 'Medium' }, { key: 'LOW', label: 'Low' }, { key: 'UNRESOLVED', label: 'Unresolved' }];
  const severityBorder = (s: string) => s === 'HIGH' ? 'border-l-red-500' : s === 'MEDIUM' ? 'border-l-amber-500' : 'border-l-blue-500';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Alert Center</h1>
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<AlertTriangle size={48} className="text-gray-300" />} title="No alerts" description="No alerts match the filter" />
      ) : (
        <div className="space-y-3">
          {filtered.map(alert => (
            <div key={alert.id} className={`card border-l-4 ${severityBorder(alert.severity)} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className={alert.severity === 'HIGH' ? 'text-red-500' : alert.severity === 'MEDIUM' ? 'text-amber-500' : 'text-blue-500'} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${alert.severity === 'HIGH' ? 'bg-red-100 text-red-800' : alert.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>{alert.severity}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{alert.type.replace('_', ' ')}</span>
                    </div>
                    <p className="font-medium text-gray-900 mt-1">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.instrumentId} · {alert.businessName} · {alert.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(alert.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={alert.status} />
                  <button onClick={() => setSelected(alert)} className="btn-ghost text-xs"><Eye size={14} /> View</button>
                  <button onClick={() => setShowAssign(alert)} className="btn-primary text-xs"><UserPlus size={14} /> Assign</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Details Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Alert Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2"><span className={`badge ${selected.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{selected.severity}</span><StatusBadge status={selected.status} /></div>
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
                  <p className="text-sm">Serial: <span className="font-mono font-bold">{selected.details.registeredSerial}</span></p>
                  <p className="text-sm">Model: <span className="font-bold">{selected.details.registeredModel}</span></p>
                </div>
                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Observed Data</h4>
                  <p className="text-sm">Serial: <span className="font-mono font-bold text-red-700">{selected.details.observedSerial}</span></p>
                  <p className="text-sm">Model: <span className="font-bold text-red-700">{selected.details.observedModel}</span></p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Assign Inspector Modal */}
      <Modal isOpen={!!showAssign} onClose={() => setShowAssign(null)} title="Assign Inspector for Re-inspection" size="md">
        <div className="space-y-4">
          <div><label className="label">Select Inspector</label>
            <select className="input-field" value={assignForm.inspectorId} onChange={e => setAssignForm({...assignForm, inspectorId: e.target.value})}>
              <option value="">Choose inspector</option>
              {inspectors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Date</label><input type="date" className="input-field" value={assignForm.date} onChange={e => setAssignForm({...assignForm, date: e.target.value})} /></div>
            <div><label className="label">Time</label><input type="time" className="input-field" value={assignForm.time} onChange={e => setAssignForm({...assignForm, time: e.target.value})} /></div>
          </div>
          <div><label className="label">Priority</label>
            <select className="input-field" value={assignForm.priority} onChange={e => setAssignForm({...assignForm, priority: e.target.value})}>
              <option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option>
            </select></div>
          <div><label className="label">Remarks</label><textarea className="input-field" rows={2} value={assignForm.remarks} onChange={e => setAssignForm({...assignForm, remarks: e.target.value})} /></div>
          <button onClick={handleAssign} className="btn-primary w-full justify-center" disabled={!assignForm.inspectorId}>Assign Inspector</button>
        </div>
      </Modal>
    </div>
  );
}
