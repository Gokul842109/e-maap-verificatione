import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Shield, CheckCircle, AlertTriangle, Cpu, Fingerprint, Calendar, RefreshCw, XCircle } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import RiskScoreCard from '../components/RiskScoreCard';
import { formatDate, generateUniqueId } from '../utils/formatters';
import { calculateRiskScore } from '../utils/riskScore';
import type { RiskLevel } from '../types';

export default function InstrumentIntegrity() {
  const { id } = useParams();
  const { state, dispatch, addToast } = useStore();
  const navigate = useNavigate();

  const instrument = state.instruments.find(i => i.id === id || i.instrumentId === id);
  const [tamperSimulated, setTamperSimulated] = useState(false);
  const [observedSerial, setObservedSerial] = useState('XYZ98765');
  const [observedModel, setObservedModel] = useState('ABC-900');

  if (!instrument) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <XCircle size={48} className="text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-700">Instrument Not Found</h2>
          <button onClick={() => navigate('/verify')} className="btn-primary mt-4">Go to Verify</button>
        </div>
      </div>
    );
  }

  const cert = state.certificates.find(c => c.instrumentDbId === instrument.id);
  const hasIssues = instrument.status === 'RE_INSPECTION_REQUIRED' || instrument.status === 'REVOKED' || instrument.status === 'SUSPENDED' || tamperSimulated;

  const riskConfig = {
    previousFailedInspection: instrument.status === 'REVOKED',
    customerComplaints: state.complaints.filter(c => c.instrumentId === instrument.instrumentId).length,
    certificateExpiringSoon: instrument.status === 'EXPIRING_SOON',
    identityMismatch: tamperSimulated || instrument.status === 'RE_INSPECTION_REQUIRED',
    repeatedViolations: instrument.status === 'REVOKED' ? 2 : 0,
    ageOfInstrumentYears: new Date().getFullYear() - parseInt(instrument.yearOfManufacture || '2024'),
    lastInspectionDaysAgo: 30,
  };
  const riskScore = calculateRiskScore(instrument.instrumentId, riskConfig);

  const handleSimulateTamper = () => {
    setTamperSimulated(true);
    addToast('⚠️ Instrument replacement simulated!', 'warning');
  };

  const handleReportToAuthority = () => {
    dispatch({
      type: 'ADD_ALERT',
      payload: {
        id: generateUniqueId(),
        instrumentId: instrument.instrumentId,
        instrumentDbId: instrument.id,
        type: 'IDENTITY_MISMATCH',
        severity: 'HIGH',
        message: `Instrument identity mismatch detected. Observed serial ${observedSerial} does not match registered ${instrument.serialNumber}.`,
        businessName: instrument.businessName,
        location: instrument.address,
        timestamp: new Date().toISOString(),
        status: 'NEW',
        details: {
          registeredSerial: instrument.serialNumber,
          observedSerial: observedSerial,
          registeredModel: instrument.model,
          observedModel: observedModel,
        },
      },
    });
    dispatch({
      type: 'ADD_AUDIT_LOG',
      payload: {
        id: generateUniqueId(),
        timestamp: new Date().toISOString(),
        actor: 'System',
        actorRole: 'system',
        action: 'Mismatch alert generated',
        details: `Identity mismatch detected for ${instrument.instrumentId}. Registered: ${instrument.serialNumber}, Observed: ${observedSerial}`,
        entityType: 'alert',
        entityId: instrument.id,
      },
    });
    addToast('Alert reported to authority!', 'success');
  };

  const handleReset = () => {
    setTamperSimulated(false);
  };

  const fp = instrument.digitalFingerprint;
  const truncFP = fp ? `${fp.slice(0, 8)}...${fp.slice(-4)}` : '—';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Shield size={24} className="text-gov-blue" /> Instrument Integrity</h1>

      {/* Registered Identity */}
      <div className="card">
        <h2 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2"><Fingerprint size={18} className="text-gov-blue" /> Registered Instrument Identity</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-500">Instrument ID</span><p className="font-bold text-gov-blue">{instrument.instrumentId}</p></div>
          <div><span className="text-gray-500">Serial Number</span><p className="font-mono font-medium">{instrument.serialNumber}</p></div>
          <div><span className="text-gray-500">Manufacturer</span><p className="font-medium">{instrument.manufacturer}</p></div>
          <div><span className="text-gray-500">Model</span><p className="font-medium">{instrument.model}</p></div>
          <div><span className="text-gray-500">Capacity</span><p className="font-medium">{instrument.capacity}</p></div>
          <div><span className="text-gray-500">Status</span><p><StatusBadge status={instrument.status} /></p></div>
        </div>
        {fp && (
          <div className="bg-gray-50 rounded-lg p-3 mt-4">
            <span className="text-xs text-gray-500">Digital Fingerprint</span>
            <p className="font-mono text-sm mt-1">{truncFP}</p>
          </div>
        )}
      </div>

      {/* Verification Timeline */}
      <div className="card">
        <h2 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2"><Calendar size={18} className="text-gov-blue" /> Verification History</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-gray-500">Last Verification</span><p className="font-medium">{instrument.verificationDate ? formatDate(instrument.verificationDate) : '—'}</p></div>
          <div><span className="text-gray-500">Last Inspection</span><p className="font-medium">{instrument.lastInspectionDate ? formatDate(instrument.lastInspectionDate) : '—'}</p></div>
          <div><span className="text-gray-500">Next Inspection</span><p className="font-medium">{instrument.nextInspectionDate ? formatDate(instrument.nextInspectionDate) : '—'}</p></div>
          <div><span className="text-gray-500">Integrity Status</span>
            <p className={`font-medium flex items-center gap-1 ${hasIssues ? 'text-red-600' : 'text-green-600'}`}>
              {hasIssues ? <><AlertTriangle size={14} /> Issues Detected</> : <><CheckCircle size={14} /> No Known Issues</>}
            </p>
          </div>
        </div>
        {cert && (
          <div className="mt-4 pt-4 border-t text-sm">
            <span className="text-gray-500">Certificate:</span> <span className="font-medium text-gov-blue cursor-pointer hover:underline" onClick={() => navigate(`/certificate/${cert.id}`)}>{cert.certificateNumber}</span>
            <span className="ml-4"><StatusBadge status={cert.status} /></span>
          </div>
        )}
      </div>

      {/* IoT Sensors (Simulated) */}
      <div className="card border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={18} className="text-gov-blue" />
          <h2 className="font-semibold text-lg text-gray-900">IoT Integration — Future Enhancement</h2>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-auto">SIMULATED IoT DATA</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Enclosure Status', value: 'Secure', ok: true },
            { label: 'Configuration Status', value: 'Normal', ok: true },
            { label: 'Device Identity', value: tamperSimulated ? 'Mismatch' : 'Matched', ok: !tamperSimulated },
            { label: 'Calibration State', value: 'Normal', ok: true },
          ].map(s => (
            <div key={s.label} className={`rounded-lg p-3 text-center ${s.ok ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`font-semibold text-sm mt-1 ${s.ok ? 'text-green-700' : 'text-red-700'}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">
          The system detects discrepancies between the registered instrument identity and information observed during subsequent verification/inspection. IoT-based tamper sensors can be integrated for compatible instruments.
        </p>
      </div>

      {/* Demo Control */}
      {state.currentUser && (
        <div className="card border-2 border-dashed border-amber-400 bg-amber-50/30">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="font-semibold text-lg text-amber-800">SIH DEMO CONTROL — For Judges</h2>
          </div>

          {!tamperSimulated ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-4">Click below to simulate the business owner replacing the verified instrument with a different one.</p>
              <button onClick={handleSimulateTamper} className="btn-danger text-lg px-8 py-3">
                <RefreshCw size={18} /> Simulate Instrument Replacement
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-center">
                <AlertTriangle size={32} className="text-red-600 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-red-800">⚠️ INSTRUMENT IDENTITY MISMATCH</h3>
                <p className="text-sm text-red-600 mt-1">The observed instrument does not match the registered digital identity.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Registered Data</h4>
                  <p className="text-sm">Serial: <span className="font-mono font-bold">{instrument.serialNumber}</span></p>
                  <p className="text-sm">Model: <span className="font-bold">{instrument.model}</span></p>
                  <p className="text-sm">Capacity: <span className="font-bold">{instrument.capacity}</span></p>
                </div>
                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Observed Data</h4>
                  <p className="text-sm">Serial: <span className="font-mono font-bold text-red-700">{observedSerial}</span></p>
                  <p className="text-sm">Model: <span className="font-bold text-red-700">{observedModel}</span></p>
                  <p className="text-sm">Capacity: <span className="font-bold text-red-700">75 kg</span></p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={handleReportToAuthority} className="btn-danger"><AlertTriangle size={16} /> Report to Authority</button>
                <button onClick={handleReset} className="btn-secondary"><RefreshCw size={16} /> Reset Simulation</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Risk Score */}
      <RiskScoreCard score={riskScore.score} level={riskScore.level as RiskLevel} factors={riskScore.factors} />
    </div>
  );
}
