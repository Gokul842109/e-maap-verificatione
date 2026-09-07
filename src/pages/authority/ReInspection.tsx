import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { RefreshCw, Plus } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { formatDate, generateUniqueId, generateId } from '../../utils/formatters';

export default function ReInspection() {
  const { state, dispatch, addToast } = useStore();
  const [showSchedule, setShowSchedule] = useState(false);
  const [form, setForm] = useState({ instrumentId: '', inspectorId: '', date: '', time: '', priority: 'NORMAL' as string, remarks: '' });

  const inspectors = state.users.filter(u => u.role === 'inspector');
  const reInspections = state.verificationRequests.filter(vr => vr.isReInspection)
    .sort((a, b) => b.submittedDate.localeCompare(a.submittedDate));

  const instrumentsNeedingReInspection = state.instruments.filter(i =>
    i.status === 'RE_INSPECTION_REQUIRED' || i.status === 'EXPIRED' || i.status === 'EXPIRING_SOON'
  );

  const handleSchedule = () => {
    if (!form.instrumentId || !form.inspectorId || !form.date) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    const instrument = state.instruments.find(i => i.id === form.instrumentId);
    const inspector = inspectors.find(u => u.id === form.inspectorId);

    dispatch({
      type: 'ADD_VERIFICATION_REQUEST', payload: {
        id: generateUniqueId(), requestId: generateId('VR'),
        instrumentId: form.instrumentId, businessId: instrument?.businessId || '',
        businessName: instrument?.businessName || '', status: 'INSPECTION_SCHEDULED' as const,
        submittedDate: new Date().toISOString().split('T')[0],
        inspectorId: form.inspectorId, inspectorName: inspector?.name,
        scheduledDate: form.date, isReInspection: true,
        reInspectionReason: form.remarks || 'Scheduled by authority',
        priority: form.priority as 'NORMAL' | 'HIGH' | 'URGENT',
        timeline: [
          { label: 'Re-inspection Scheduled', status: 'completed' as const, date: new Date().toISOString().split('T')[0] },
          { label: 'Inspector Assigned', status: 'completed' as const },
          { label: 'Inspection Scheduled', status: 'current' as const },
          { label: 'Physical Verification', status: 'pending' as const },
          { label: 'Result', status: 'pending' as const },
        ],
      }
    });

    if (instrument) {
      dispatch({ type: 'UPDATE_INSTRUMENT', payload: { id: instrument.id, updates: { status: 'RE_INSPECTION_REQUIRED' } } });
    }

    dispatch({ type: 'ADD_AUDIT_LOG', payload: { id: generateUniqueId(), timestamp: new Date().toISOString(), actor: state.currentUser?.name || 'Authority', actorRole: 'authority', action: 'Re-inspection scheduled', details: `Re-inspection scheduled for ${instrument?.instrumentId} with ${inspector?.name}`, entityType: 'verificationRequest', entityId: form.instrumentId } });

    addToast('Re-inspection scheduled successfully!', 'success');
    setShowSchedule(false);
    setForm({ instrumentId: '', inspectorId: '', date: '', time: '', priority: 'NORMAL', remarks: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><RefreshCw size={24} className="text-gov-blue" /> Re-inspection Management</h1>
        <button onClick={() => setShowSchedule(true)} className="btn-primary"><Plus size={16} /> Schedule Re-inspection</button>
      </div>

      {/* Instruments needing re-inspection */}
      {instrumentsNeedingReInspection.length > 0 && (
        <div className="card bg-amber-50 border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-3">Instruments Requiring Re-inspection ({instrumentsNeedingReInspection.length})</h3>
          <div className="space-y-2">
            {instrumentsNeedingReInspection.slice(0, 5).map(i => (
              <div key={i.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <span className="font-medium text-gov-blue">{i.instrumentId}</span>
                  <span className="text-sm text-gray-500 ml-3">{i.businessName} · {i.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={i.status} />
                  <button onClick={() => { setForm({ ...form, instrumentId: i.id }); setShowSchedule(true); }} className="btn-primary text-xs">Schedule</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing re-inspections */}
      <div className="card">
        <h3 className="font-semibold mb-4">Scheduled & Completed Re-inspections</h3>
        {reInspections.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No re-inspections scheduled yet</p>
        ) : (
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b">
              <th className="table-header">Request ID</th><th className="table-header">Instrument</th>
              <th className="table-header">Inspector</th><th className="table-header">Scheduled</th>
              <th className="table-header">Status</th><th className="table-header">Reason</th>
            </tr></thead>
            <tbody>
              {reInspections.map(vr => (
                <tr key={vr.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="table-cell font-medium">{vr.requestId}</td>
                  <td className="table-cell">{state.instruments.find(i => i.id === vr.instrumentId)?.instrumentId || vr.instrumentId}</td>
                  <td className="table-cell">{vr.inspectorName || '—'}</td>
                  <td className="table-cell">{vr.scheduledDate ? formatDate(vr.scheduledDate) : '—'}</td>
                  <td className="table-cell"><StatusBadge status={vr.status} /></td>
                  <td className="table-cell text-sm text-gray-500">{vr.reInspectionReason || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Schedule Modal */}
      <Modal isOpen={showSchedule} onClose={() => setShowSchedule(false)} title="Schedule Re-inspection" size="md">
        <div className="space-y-4">
          <div><label className="label">Select Instrument *</label>
            <select className="input-field" value={form.instrumentId} onChange={e => setForm({...form, instrumentId: e.target.value})}>
              <option value="">Choose instrument</option>
              {state.instruments.map(i => <option key={i.id} value={i.id}>{i.instrumentId} — {i.type} ({i.businessName})</option>)}
            </select></div>
          <div><label className="label">Select Inspector *</label>
            <select className="input-field" value={form.inspectorId} onChange={e => setForm({...form, inspectorId: e.target.value})}>
              <option value="">Choose inspector</option>
              {inspectors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Date *</label><input type="date" className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
            <div><label className="label">Time</label><input type="time" className="input-field" value={form.time} onChange={e => setForm({...form, time: e.target.value})} /></div>
          </div>
          <div><label className="label">Priority</label>
            <select className="input-field" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option>
            </select></div>
          <div><label className="label">Remarks / Reason</label><textarea className="input-field" rows={2} value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} /></div>
          <button onClick={handleSchedule} className="btn-primary w-full justify-center" disabled={!form.instrumentId || !form.inspectorId || !form.date}>Schedule Re-inspection</button>
        </div>
      </Modal>
    </div>
  );
}
