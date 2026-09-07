import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { History, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';
import type { Inspection } from '../../types';

export default function InspectionHistory() {
  const { state } = useStore();
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Inspection | null>(null);

  const inspections = state.inspections;

  const filtered = inspections.filter(ins => {
    if (filter === 'PASS') return ins.result === 'PASS';
    if (filter === 'FAIL') return ins.result === 'FAIL';
    if (filter === 'REINSPECTION') return ins.isReInspection;
    return true;
  });

  const tabs = [
    { key: 'ALL', label: 'All' },
    { key: 'PASS', label: 'Passed' },
    { key: 'FAIL', label: 'Failed' },
    { key: 'REINSPECTION', label: 'Re-inspections' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inspection History</h1>
      <div className="flex gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<History size={48} className="text-gray-300" />} title="No inspections found" description="No inspections match the filter" />
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b">
              <th className="table-header">Inspection ID</th>
              <th className="table-header">Instrument</th>
              <th className="table-header">Result</th>
              <th className="table-header">Date</th>
              <th className="table-header">Type</th>
              <th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(ins => {
                const inst = state.instruments.find(i => i.id === ins.instrumentId);
                return (
                  <tr key={ins.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="table-cell font-medium">{ins.inspectionId}</td>
                    <td className="table-cell">{inst?.instrumentId || ins.instrumentId}<br/><span className="text-xs text-gray-400">{inst?.businessName}</span></td>
                    <td className="table-cell">
                      {ins.result === 'PASS' ? (
                        <span className="badge-active flex items-center gap-1 w-fit"><CheckCircle size={12} /> PASS</span>
                      ) : (
                        <span className="badge-expired flex items-center gap-1 w-fit"><XCircle size={12} /> FAIL</span>
                      )}
                    </td>
                    <td className="table-cell">{formatDate(ins.date)}</td>
                    <td className="table-cell">{ins.isReInspection ? <span className="badge-warning">Re-inspection</span> : <span className="badge-info">New</span>}</td>
                    <td className="table-cell"><button onClick={() => setSelected(ins)} className="text-gov-blue hover:underline text-sm">View</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Inspection ${selected?.inspectionId}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date: {formatDate(selected.date)}</span>
              {selected.result === 'PASS' ? <span className="badge-active text-sm">PASS</span> : <span className="badge-expired text-sm">FAIL</span>}
            </div>
            <h4 className="font-medium">Measurements</h4>
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50"><th className="px-3 py-2 text-left">Standard</th><th className="px-3 py-2 text-left">Reading</th><th className="px-3 py-2 text-left">Error</th><th className="px-3 py-2 text-left">Result</th></tr></thead>
              <tbody>
                {selected.measurements.map((m, i) => (
                  <tr key={i} className="border-t"><td className="px-3 py-2">{m.standardWeight} {m.unit}</td><td className="px-3 py-2">{m.instrumentReading} {m.unit}</td><td className="px-3 py-2">{m.error > 0 ? '+' : ''}{m.error} {m.unit}</td><td className="px-3 py-2"><StatusBadge status={m.result} /></td></tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Physical Condition:</span> <span className="font-medium">{selected.physicalCondition}</span></div>
              <div><span className="text-gray-500">Serial Match:</span> <span className="font-medium">{selected.serialNumberMatch ? 'Yes' : 'No'}</span></div>
            </div>
            {selected.remarks && <div><span className="text-gray-500 text-sm">Remarks:</span><p className="text-sm mt-1">{selected.remarks}</p></div>}
          </div>
        )}
      </Modal>
    </div>
  );
}
