import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getThreshold, calculateMeasurementError, calculateOverallResult } from '../../utils/errorCalculation';
import { generateFingerprintSync, truncateFingerprint } from '../../utils/fingerprint';
import { generateId } from '../../utils/formatters';

function getStandardWeights(capacity: string): number[] {
  const cap = parseFloat(capacity);
  if (isNaN(cap)) return [1, 2, 5, 10];
  if (cap <= 5) return [1, 2, 3, 5];
  if (cap <= 10) return [2, 5, 7, 10];
  if (cap <= 30) return [5, 10, 20, 30];
  if (cap <= 50) return [5, 10, 20, 50];
  if (cap <= 100) return [10, 25, 50, 100];
  if (cap <= 200) return [20, 50, 100, 200];
  if (cap <= 500) return [50, 100, 250, 500];
  if (cap <= 1000) return [100, 250, 500, 1000];
  return [cap*0.1, cap*0.25, cap*0.5, cap];
}

const InspectionModule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch, addToast } = useStore();
  
  const vr = state.verificationRequests.find(v => v.id === id);
  const instrument = state.instruments.find(i => i.id === vr?.instrumentId);
  const business = state.businesses?.find(b => b.id === instrument?.businessId);

  const [measurements, setMeasurements] = useState<any[]>([]);
  const [physicalCondition, setPhysicalCondition] = useState('Good');
  const [serialMatch, setSerialMatch] = useState<boolean | null>(null);
  const [observedSerial, setObservedSerial] = useState('');
  const [observedModel, setObservedModel] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inspectionResult, setInspectionResult] = useState<'PASS' | 'FAIL' | null>(null);
  const [generatedFp, setGeneratedFp] = useState('');
  const [newCertId, setNewCertId] = useState('');

  useEffect(() => {
    if (instrument) {
      const weights = getStandardWeights(instrument.capacity);
      setMeasurements(weights.map(w => ({
        standardWeight: w,
        reading: 0,
        error: 0,
        percentageError: 0,
        result: 'PENDING'
      })));
    }
  }, [instrument]);

  if (!vr || !instrument) {
    return <div>Request or Instrument not found</div>;
  }

  const threshold = getThreshold(instrument.type);

  const handleReadingChange = (index: number, val: string) => {
    const reading = parseFloat(val);
    const m = [...measurements];
    if (isNaN(reading)) {
      m[index].reading = val;
      m[index].result = 'PENDING';
      setMeasurements(m);
      return;
    }
    
    m[index].reading = reading;
    const { error, percentageError, result } = calculateMeasurementError(m[index].standardWeight, reading, instrument.type, 'kg');
    m[index].error = error;
    m[index].percentageError = percentageError;
    m[index].result = result;
    setMeasurements(m);
  };

  const hasReadings = measurements.some(m => typeof m.reading === 'number' && m.reading > 0);
  const overallResult = hasReadings ? calculateOverallResult(measurements) : 'PENDING';

  const handleSubmit = () => {
    if (serialMatch === null) {
      addToast('Please confirm if serial number matches', 'error');
      return;
    }

    const isPass = overallResult === 'PASS' && serialMatch === true;
    setInspectionResult(isPass ? 'PASS' : 'FAIL');
    
    const inspectionId = generateId('INSP');
    const today = new Date().toISOString().split('T')[0];

    const inspectionData = {
      id: inspectionId,
      requestId: vr.id,
      instrumentId: instrument.id,
      inspectorId: state.currentUser?.id || '',
      date: today,
      measurements,
      physicalCondition,
      serialMatch,
      observedSerial: !serialMatch ? observedSerial : undefined,
      observedModel: !serialMatch ? observedModel : undefined,
      remarks,
      result: isPass ? 'PASS' : 'FAIL'
    };

    dispatch({ type: 'ADD_INSPECTION', payload: inspectionData as any });

    if (isPass) {
      const fp = generateFingerprintSync({
        type: instrument.type,
        manufacturer: instrument.manufacturer,
        model: instrument.model,
        serialNumber: instrument.serialNumber,
        capacity: instrument.capacity
      });
      setGeneratedFp(fp);
      
      const certId = generateId('CERT');
      setNewCertId(certId);
      
      dispatch({ type: 'ADD_CERTIFICATE', payload: {
        id: certId,
        instrumentId: instrument.id,
        certificateNumber: certId,
        businessId: instrument.businessId,
        issueDate: today,
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        status: 'ACTIVE',
        inspectorId: state.currentUser?.id || '',
        qrData: instrument.id
      } as any });

      dispatch({ type: 'UPDATE_INSTRUMENT', payload: { id: instrument.id, updates: { 
        status: 'ACTIVE', 
        digitalFingerprint: fp, 
        verificationDate: today, 
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        lastInspectionDate: today 
      }} });
      
    } else {
      if (!serialMatch) {
        dispatch({ type: 'ADD_ALERT', payload: {
          id: generateId('ALT'),
          instrumentId: instrument.id,
          businessId: instrument.businessId,
          type: 'IDENTITY_MISMATCH',
          severity: 'HIGH',
          message: 'Serial number mismatch detected during inspection.',
          timestamp: new Date().toISOString(),
          status: 'UNRESOLVED'
        } as any });
      }
    }

    dispatch({ type: 'UPDATE_VERIFICATION_REQUEST', payload: { id: vr.id, updates: { status: isPass ? 'COMPLETED' : 'FAILED' } } });
    
    setShowModal(true);
  };

  const handleRevoke = () => {
    const cert = state.certificates.find(c => c.instrumentDbId === instrument.id);
    if (cert) {
      dispatch({ type: 'UPDATE_CERTIFICATE', payload: { id: cert.id, updates: { status: 'REVOKED' } } });
    }
    dispatch({ type: 'UPDATE_INSTRUMENT', payload: { id: instrument.id, updates: { status: 'REVOKED' } } });
    addToast('Certificate revoked', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inspection Module</h1>
        <div className="text-sm text-gray-500">Request ID: {vr.id}</div>
      </div>

      {vr.isReInspection && (
        <div className="bg-amber-100 text-amber-800 p-4 rounded-md flex items-center">
          <RefreshCw className="mr-2" size={20} />
          <strong>RE-INSPECTION — Reason: {vr.reInspectionReason}</strong>
        </div>
      )}

      <div className="card grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-3">Instrument Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Type:</span> {instrument.type}</p>
            <p><span className="font-medium">Manufacturer:</span> {instrument.manufacturer}</p>
            <p><span className="font-medium">Model:</span> {instrument.model}</p>
            <p><span className="font-medium">Serial Number:</span> {instrument.serialNumber}</p>
            <p><span className="font-medium">Capacity:</span> {instrument.capacity}</p>
            <p><span className="font-medium">Accuracy Class:</span> {instrument.accuracyClass}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-3">Business Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {business?.name}</p>
            <p><span className="font-medium">Owner:</span> {business?.ownerName}</p>
            <p><span className="font-medium">Contact:</span> {business?.phone}</p>
            <p><span className="font-medium">Address:</span> {business?.address}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-medium mb-1">Test Measurements</h3>
        <p className="text-sm text-gray-500 mb-4">
          Prototype Calculation — Permissible error: ±{threshold.maxAbsoluteError} kg or {threshold.maxPercentageError}%
          <br/>
          <span className="text-xs italic">Note: Actual statutory permissible-error rules can be integrated based on instrument type and applicable regulations.</span>
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Standard Weight (kg)</th>
                <th className="table-header">Instrument Reading (kg)</th>
                <th className="table-header">Error (kg)</th>
                <th className="table-header">% Error</th>
                <th className="table-header">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {measurements.map((m, idx) => (
                <tr key={idx} className={m.result === 'PASS' ? 'bg-green-50' : m.result === 'FAIL' ? 'bg-red-50' : ''}>
                  <td className="table-cell">{m.standardWeight}</td>
                  <td className="table-cell">
                    <input 
                      type="number" 
                      step="0.01" 
                      className="input-field max-w-[150px]"
                      value={m.reading === 0 && m.result === 'PENDING' ? '' : m.reading}
                      onChange={(e) => handleReadingChange(idx, e.target.value)}
                    />
                  </td>
                  <td className="table-cell">{m.error?.toFixed(3) || '-'}</td>
                  <td className="table-cell">{m.percentageError?.toFixed(2) || '-'}%</td>
                  <td className="table-cell font-medium">
                    <span className={m.result === 'PASS' ? 'text-green-600' : m.result === 'FAIL' ? 'text-red-600' : 'text-gray-400'}>
                      {m.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {hasReadings && (
          <div className={`mt-6 p-4 rounded-lg flex items-center justify-center text-xl font-bold ${overallResult === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {overallResult === 'PASS' ? (
              <><CheckCircle className="mr-2" size={28} /> VERIFICATION PASSED</>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center"><XCircle className="mr-2" size={28} /> VERIFICATION FAILED</div>
                <p className="text-sm font-normal mt-1">Measured error exceeds configured permissible limit.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-medium mb-4">Physical Inspection</h3>
        
        <div className="mb-6">
          <p className="font-medium text-sm text-gray-700 mb-2">Physical Condition</p>
          <div className="flex gap-4">
            {['Good', 'Fair', 'Damaged'].map(cond => (
              <label key={cond} className="flex items-center">
                <input 
                  type="radio" 
                  name="condition" 
                  checked={physicalCondition === cond} 
                  onChange={() => setPhysicalCondition(cond)}
                  className="mr-2"
                />
                {cond}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-medium text-sm text-gray-700 mb-2">Serial Number Match ({instrument.serialNumber})</p>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="serialMatch" 
                checked={serialMatch === true} 
                onChange={() => setSerialMatch(true)}
                className="mr-2"
              />
              YES
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="serialMatch" 
                checked={serialMatch === false} 
                onChange={() => setSerialMatch(false)}
                className="mr-2"
              />
              NO
            </label>
          </div>
          
          {serialMatch === false && (
            <div className="p-4 bg-gray-50 border rounded-md space-y-4">
              <div className="bg-red-100 text-red-800 p-2 rounded text-sm flex items-start">
                <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                ⚠️ Serial number does not match registered records. This may indicate instrument replacement.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Observed Serial Number</label>
                  <input type="text" className="input-field" value={observedSerial} onChange={e => setObservedSerial(e.target.value)} />
                </div>
                <div>
                  <label className="label">Observed Model</label>
                  <input type="text" className="input-field" value={observedModel} onChange={e => setObservedModel(e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="label">Inspector Remarks</label>
          <textarea 
            className="input-field" 
            rows={3} 
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="btn-secondary">Save Draft</button>
        <button className="btn-primary" onClick={handleSubmit}>Submit Inspection</button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            {inspectionResult === 'PASS' ? (
              <>
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-bold text-center text-green-600 mb-4">VERIFICATION PASSED</h2>
                <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Digital Fingerprint:</p>
                  <p className="font-mono text-xs break-all text-gray-800">{truncateFingerprint(generatedFp)}</p>
                </div>
                <p className="text-sm text-center text-gray-600 mb-6">This fingerprint represents the registered verification state of this instrument.</p>
                <div className="flex flex-col gap-3">
                  <button className="btn-primary w-full" onClick={() => navigate(`/certificate/${newCertId}`)}>View Certificate</button>
                  <button className="btn-secondary w-full" onClick={() => navigate('/inspector')}>Return to Dashboard</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center text-red-600 mb-4">
                  <XCircle size={48} />
                </div>
                <h2 className="text-2xl font-bold text-center text-red-600 mb-4">VERIFICATION FAILED</h2>
                <div className="text-center text-sm text-gray-700 mb-6 space-y-2">
                  {overallResult === 'FAIL' && <p>• Measurements exceeded permissible error limits.</p>}
                  {serialMatch === false && <p>• Identity mismatch (Serial number differs from record).</p>}
                </div>
                
                {vr.isReInspection && (
                  <div className="mb-6">
                    <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 font-medium transition-colors" onClick={handleRevoke}>
                      Revoke Certificate
                    </button>
                  </div>
                )}
                
                <div className="flex flex-col gap-3">
                  <button className="btn-secondary w-full" onClick={() => navigate('/inspector')}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionModule;
