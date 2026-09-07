import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Award, Eye } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate } from '../../utils/formatters';

export default function Certificates() {
  const { state } = useStore();
  const navigate = useNavigate();
  const user = state.currentUser;
  const [filter, setFilter] = useState('ALL');

  const myInstruments = state.instruments.filter(i => i.ownerId === user?.id);
  const myCerts = state.certificates.filter(c => myInstruments.some(i => i.certificateId === c.id));

  const filtered = myCerts.filter(c => filter === 'ALL' || c.status === filter);

  const tabs = [
    { key: 'ALL', label: 'All', count: myCerts.length },
    { key: 'ACTIVE', label: 'Active', count: myCerts.filter(c => c.status === 'ACTIVE').length },
    { key: 'EXPIRING_SOON', label: 'Expiring', count: myCerts.filter(c => c.status === 'EXPIRING_SOON').length },
    { key: 'EXPIRED', label: 'Expired', count: myCerts.filter(c => c.status === 'EXPIRED').length },
    { key: 'REVOKED', label: 'Revoked', count: myCerts.filter(c => c.status === 'REVOKED').length },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t.key ? 'bg-gov-blue text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Award size={48} className="text-gray-300" />} title="No certificates found" description="No certificates match the selected filter" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(cert => (
            <div key={cert.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold text-gov-blue">{cert.certificateNumber}</span>
                <StatusBadge status={cert.status} />
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Instrument:</span> <span className="font-medium">{cert.instrumentType}</span></p>
                <p><span className="text-gray-500">Serial:</span> <span className="font-mono">{cert.serialNumber}</span></p>
                <p><span className="text-gray-500">Verified:</span> <span className="font-medium">{formatDate(cert.verificationDate)}</span></p>
                <p><span className="text-gray-500">Valid Until:</span> <span className="font-medium">{formatDate(cert.validUntil)}</span></p>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <button onClick={() => navigate(`/certificate/${cert.id}`)} className="text-sm text-gov-blue hover:underline flex items-center gap-1"><Eye size={14} /> View Certificate</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
