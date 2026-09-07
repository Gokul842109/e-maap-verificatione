import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { generateId, generateUniqueId } from '../../utils/formatters';

const ISSUE_TYPES = [
  { value: 'incorrect_weighing', label: 'Incorrect Weighing' },
  { value: 'suspected_tampering', label: 'Suspected Tampering' },
  { value: 'instrument_replaced', label: 'Instrument Replaced' },
  { value: 'qr_mismatch', label: 'QR Mismatch' },
  { value: 'expired_certificate', label: 'Expired Certificate' },
  { value: 'other', label: 'Other' },
];

export default function ReportIssue() {
  const { state, dispatch, addToast } = useStore();
  const user = state.currentUser;
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const [form, setForm] = useState({
    instrumentId: '', issueType: '' as string, description: '', photo: '',
    location: '', reporterName: user?.name || '', reporterContact: user?.phone || '',
  });

  const myInstruments = state.instruments.filter(i => i.ownerId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.instrumentId || !form.issueType || !form.description) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    const cmpId = generateId('CMP');
    const dbId = generateUniqueId();

    dispatch({
      type: 'ADD_COMPLAINT', payload: {
        id: dbId, complaintId: cmpId, instrumentId: form.instrumentId,
        issueType: form.issueType as 'incorrect_weighing' | 'suspected_tampering' | 'instrument_replaced' | 'qr_mismatch' | 'expired_certificate' | 'other',
        description: form.description, photo: form.photo, location: form.location,
        reporterName: form.reporterName, reporterContact: form.reporterContact,
        status: 'SUBMITTED', submittedDate: new Date().toISOString().split('T')[0],
      }
    });

    dispatch({
      type: 'ADD_AUDIT_LOG', payload: {
        id: generateUniqueId(), timestamp: new Date().toISOString(),
        actor: form.reporterName, actorRole: 'business',
        action: 'Complaint submitted', details: `Complaint ${cmpId} filed for instrument ${form.instrumentId}`,
        entityType: 'complaint', entityId: dbId,
      }
    });

    setComplaintId(cmpId);
    setShowSuccess(true);
    addToast('Report submitted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Report Suspected Issue</h1>
      <p className="text-gray-500">Report a suspected issue with a weighing or measuring instrument</p>

      <form onSubmit={handleSubmit} className="card space-y-4 max-w-2xl">
        <div>
          <label className="label">Instrument ID *</label>
          <select className="input-field" value={form.instrumentId} onChange={e => setForm({ ...form, instrumentId: e.target.value })}>
            <option value="">Select instrument</option>
            {myInstruments.map(i => <option key={i.id} value={i.instrumentId}>{i.instrumentId} — {i.type}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Issue Type *</label>
          <select className="input-field" value={form.issueType} onChange={e => setForm({ ...form, issueType: e.target.value })}>
            <option value="">Select issue type</option>
            {ISSUE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div><label className="label">Description *</label><textarea className="input-field" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail..." /></div>
        <div><label className="label">Upload Photo</label><input type="file" className="input-field" accept="image/*" onChange={e => setForm({ ...form, photo: e.target.files?.[0]?.name || '' })} /></div>
        <div><label className="label">Location</label><input className="input-field" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Your Name</label><input className="input-field bg-gray-50" value={form.reporterName} readOnly /></div>
          <div><label className="label">Contact Number</label><input className="input-field bg-gray-50" value={form.reporterContact} readOnly /></div>
        </div>
        <button type="submit" className="btn-primary w-full justify-center"><AlertTriangle size={16} /> Submit Report</button>
      </form>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Report Submitted" size="sm">
        <div className="text-center py-4">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Report Submitted Successfully</h3>
          <div className="bg-green-50 rounded-lg p-4 mb-3">
            <p className="text-sm text-gray-500">Complaint ID</p>
            <p className="text-xl font-bold text-gov-blue">{complaintId}</p>
          </div>
          <p className="text-sm text-gray-500">Status: <span className="font-medium text-amber-600">UNDER REVIEW</span></p>
          <p className="text-xs text-gray-400 mt-2">Your report will be reviewed by the authority.</p>
        </div>
      </Modal>
    </div>
  );
}
