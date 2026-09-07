import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Stepper from '../../components/ui/Stepper';
import Modal from '../../components/ui/Modal';
import { generateId, generateUniqueId } from '../../utils/formatters';
import { CheckCircle } from 'lucide-react';

const INSTRUMENT_TYPES = ['Electronic Weighing Scale', 'Mechanical Weighing Scale', 'Platform Scale', 'Measuring Tape', 'Fuel Dispenser'];
const ACCURACY_CLASSES = ['Class I', 'Class II', 'Class III', 'Class 0.5'];
const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];

export default function RegisterInstrument() {
  const { state, dispatch, addToast } = useStore();
  const navigate = useNavigate();
  const user = state.currentUser;
  const myBusiness = state.businesses.find(b => b.userId === user?.id);

  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const [business] = useState({
    name: myBusiness?.name || '', ownerName: myBusiness?.ownerName || '',
    address: myBusiness?.address || '', gstin: myBusiness?.gstin || '',
    phone: myBusiness?.phone || '', email: myBusiness?.email || '',
  });

  const [instrument, setInstrument] = useState({
    type: '', manufacturer: '', model: '', serialNumber: '', capacity: '',
    accuracyClass: '', yearOfManufacture: '', location: '', address: '',
  });

  const [docs, setDocs] = useState({ photo: '', prevCert: '', purchaseDoc: '' });

  const steps = ['Business Details', 'Instrument Details', 'Documents', 'Review & Submit'];

  const canNext = () => {
    if (step === 1) return instrument.type && instrument.manufacturer && instrument.model && instrument.serialNumber && instrument.capacity && instrument.accuracyClass && instrument.yearOfManufacture;
    return true;
  };

  const handleSubmit = () => {
    const instId = generateId('WM');
    const vrId = generateId('VR');
    const dbId = generateUniqueId();
    const vrDbId = generateUniqueId();

    const newInstrument = {
      id: dbId, instrumentId: instId, type: instrument.type, manufacturer: instrument.manufacturer,
      model: instrument.model, serialNumber: instrument.serialNumber, capacity: instrument.capacity,
      accuracyClass: instrument.accuracyClass, yearOfManufacture: instrument.yearOfManufacture,
      location: instrument.location, address: instrument.address,
      ownerId: user?.id || '', businessId: myBusiness?.id || '',
      businessName: myBusiness?.name || '', ownerName: myBusiness?.ownerName || '',
      status: 'PENDING_VERIFICATION' as const, digitalFingerprint: '', riskScore: 0,
      photo: docs.photo, previousCertificate: docs.prevCert, purchaseDocument: docs.purchaseDoc,
    };

    dispatch({ type: 'ADD_INSTRUMENT', payload: newInstrument });

    const newVR = {
      id: vrDbId, requestId: vrId, instrumentId: dbId, businessId: myBusiness?.id || '',
      businessName: myBusiness?.name || '', status: 'SUBMITTED' as const,
      submittedDate: new Date().toISOString().split('T')[0], isReInspection: false,
      timeline: [
        { label: 'Application Submitted', status: 'completed' as const, date: new Date().toISOString().split('T')[0] },
        { label: 'Documents Verified', status: 'current' as const },
        { label: 'Inspector Assigned', status: 'pending' as const },
        { label: 'Inspection Scheduled', status: 'pending' as const },
        { label: 'Physical Verification', status: 'pending' as const },
        { label: 'Certificate Generation', status: 'pending' as const },
      ],
    };

    dispatch({ type: 'ADD_VERIFICATION_REQUEST', payload: newVR });
    dispatch({ type: 'ADD_AUDIT_LOG', payload: { id: generateUniqueId(), timestamp: new Date().toISOString(), actor: user?.name || 'Business User', actorRole: 'business', action: 'Verification request submitted', details: `New verification request ${vrId} submitted for ${instrument.type}`, entityType: 'verificationRequest', entityId: vrDbId } });

    setSubmittedId(vrId);
    setShowSuccess(true);
    addToast('Verification request submitted successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Register New Instrument</h1>
      <Stepper steps={steps} currentStep={step} />

      <div className="card">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Business Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({ 'Business Name': business.name, 'Owner Name': business.ownerName, 'Address': business.address, 'GSTIN': business.gstin, 'Phone': business.phone, 'Email': business.email }).map(([label, value]) => (
                <div key={label}><label className="label">{label}</label><input className="input-field bg-gray-50" value={value} readOnly /></div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Instrument Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="label">Instrument Type *</label>
                <select className="input-field" value={instrument.type} onChange={e => setInstrument({ ...instrument, type: e.target.value })}>
                  <option value="">Select type</option>{INSTRUMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select></div>
              <div><label className="label">Manufacturer *</label><input className="input-field" value={instrument.manufacturer} onChange={e => setInstrument({ ...instrument, manufacturer: e.target.value })} /></div>
              <div><label className="label">Model *</label><input className="input-field" value={instrument.model} onChange={e => setInstrument({ ...instrument, model: e.target.value })} /></div>
              <div><label className="label">Serial Number *</label><input className="input-field" value={instrument.serialNumber} onChange={e => setInstrument({ ...instrument, serialNumber: e.target.value })} /></div>
              <div><label className="label">Capacity *</label><input className="input-field" placeholder="e.g., 50 kg" value={instrument.capacity} onChange={e => setInstrument({ ...instrument, capacity: e.target.value })} /></div>
              <div><label className="label">Accuracy Class *</label>
                <select className="input-field" value={instrument.accuracyClass} onChange={e => setInstrument({ ...instrument, accuracyClass: e.target.value })}>
                  <option value="">Select class</option>{ACCURACY_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select></div>
              <div><label className="label">Year of Manufacture *</label>
                <select className="input-field" value={instrument.yearOfManufacture} onChange={e => setInstrument({ ...instrument, yearOfManufacture: e.target.value })}>
                  <option value="">Select year</option>{YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select></div>
              <div><label className="label">Installation Location</label><input className="input-field" value={instrument.location} onChange={e => setInstrument({ ...instrument, location: e.target.value })} /></div>
            </div>
            <div><label className="label">Full Address</label><textarea className="input-field" rows={2} value={instrument.address} onChange={e => setInstrument({ ...instrument, address: e.target.value })} /></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <p className="text-sm text-gray-500 italic">For prototype, file names are recorded but files are not uploaded.</p>
            <div className="space-y-4">
              <div><label className="label">Instrument Photograph</label><input type="file" className="input-field" accept="image/*" onChange={e => setDocs({ ...docs, photo: e.target.files?.[0]?.name || '' })} />{docs.photo && <p className="text-xs text-green-600 mt-1">Selected: {docs.photo}</p>}</div>
              <div><label className="label">Previous Certificate (Optional)</label><input type="file" className="input-field" onChange={e => setDocs({ ...docs, prevCert: e.target.files?.[0]?.name || '' })} /></div>
              <div><label className="label">Purchase Document (Optional)</label><input type="file" className="input-field" onChange={e => setDocs({ ...docs, purchaseDoc: e.target.files?.[0]?.name || '' })} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Review & Submit</h2>
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between"><h3 className="font-medium text-gray-700">Business Details</h3><button onClick={() => setStep(0)} className="text-sm text-gov-blue hover:underline">Edit</button></div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Business:</span> <span className="font-medium">{business.name}</span></div>
                <div><span className="text-gray-500">Owner:</span> <span className="font-medium">{business.ownerName}</span></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between"><h3 className="font-medium text-gray-700">Instrument Details</h3><button onClick={() => setStep(1)} className="text-sm text-gov-blue hover:underline">Edit</button></div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries({ Type: instrument.type, Manufacturer: instrument.manufacturer, Model: instrument.model, 'Serial Number': instrument.serialNumber, Capacity: instrument.capacity, 'Accuracy Class': instrument.accuracyClass, 'Year': instrument.yearOfManufacture, Location: instrument.location }).map(([k, v]) => (
                  <div key={k}><span className="text-gray-500">{k}:</span> <span className="font-medium">{v || '—'}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between"><h3 className="font-medium text-gray-700">Documents</h3><button onClick={() => setStep(2)} className="text-sm text-gov-blue hover:underline">Edit</button></div>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-500">Photo:</span> <span className="font-medium">{docs.photo || 'Not provided'}</span></p>
                <p><span className="text-gray-500">Previous Certificate:</span> <span className="font-medium">{docs.prevCert || 'Not provided'}</span></p>
                <p><span className="text-gray-500">Purchase Document:</span> <span className="font-medium">{docs.purchaseDoc || 'Not provided'}</span></p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t">
          {step > 0 ? <button onClick={() => setStep(step - 1)} className="btn-secondary">Back</button> : <div />}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext()} className="btn-primary disabled:opacity-50">Next</button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">Submit Verification Request</button>
          )}
        </div>
      </div>

      <Modal isOpen={showSuccess} onClose={() => { setShowSuccess(false); navigate('/business/requests'); }} title="Request Submitted Successfully" size="sm">
        <div className="text-center py-4">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Verification Request Submitted</h3>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500">Application ID</p>
            <p className="text-xl font-bold text-gov-blue">{submittedId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-2">Status: <span className="font-medium text-amber-600">Pending Inspector Assignment</span></p>
          <button onClick={() => { setShowSuccess(false); navigate('/business/requests'); }} className="btn-primary mt-4">View My Requests</button>
        </div>
      </Modal>
    </div>
  );
}
