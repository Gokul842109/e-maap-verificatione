import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Scale, Clock, CheckCircle, AlertTriangle, Plus, Award, ArrowRight } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatDate } from '../../utils/formatters';

export default function BusinessDashboard() {
  const { state } = useStore();
  const navigate = useNavigate();
  const user = state.currentUser;

  const myInstruments = state.instruments.filter(i => i.ownerId === user?.id);
  const myBusiness = state.businesses.find(b => b.userId === user?.id);
  const myRequests = state.verificationRequests.filter(vr => vr.businessId === myBusiness?.id);
  const myCerts = state.certificates.filter(c => 
    myInstruments.some(i => i.certificateId === c.id)
  );

  const totalInstruments = myInstruments.length;
  const pendingCount = myInstruments.filter(i => i.status === 'PENDING_VERIFICATION').length;
  const activeCount = myInstruments.filter(i => i.status === 'ACTIVE').length;
  const expiringCount = myInstruments.filter(i => i.status === 'EXPIRING_SOON').length;

  const recentInstruments = [...myInstruments]
    .sort((a, b) => (b.verificationDate || '').localeCompare(a.verificationDate || ''))
    .slice(0, 5);

  const recentRequests = [...myRequests]
    .sort((a, b) => b.submittedDate.localeCompare(a.submittedDate))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-500 mt-1">{myBusiness?.name || 'Business Dashboard'}</p>
        </div>
        <button onClick={() => navigate('/business/register')} className="btn-primary">
          <Plus size={18} /> Register Instrument
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Instruments" value={totalInstruments} icon={<Scale size={22} className="text-gov-blue" />} color="blue" onClick={() => navigate('/business/instruments')} />
        <StatCard title="Pending Verification" value={pendingCount} icon={<Clock size={22} className="text-amber-500" />} color="amber" />
        <StatCard title="Verified (Active)" value={activeCount} icon={<CheckCircle size={22} className="text-green-600" />} color="green" />
        <StatCard title="Expiring Soon" value={expiringCount} icon={<AlertTriangle size={22} className="text-red-500" />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Instruments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Instruments</h2>
            <button onClick={() => navigate('/business/instruments')} className="text-sm text-gov-blue hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          {recentInstruments.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">No instruments registered yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100">
                  <th className="table-header">Instrument ID</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Serial No.</th>
                  <th className="table-header">Status</th>
                </tr></thead>
                <tbody>
                  {recentInstruments.map(inst => (
                    <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/instrument/${inst.id}`)}>
                      <td className="table-cell font-medium text-gov-blue">{inst.instrumentId}</td>
                      <td className="table-cell">{inst.type}</td>
                      <td className="table-cell">{inst.serialNumber}</td>
                      <td className="table-cell"><StatusBadge status={inst.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Requests</h2>
            <button onClick={() => navigate('/business/requests')} className="text-sm text-gov-blue hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          {recentRequests.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">No verification requests yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-100">
                  <th className="table-header">Request ID</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Date</th>
                </tr></thead>
                <tbody>
                  {recentRequests.map(vr => (
                    <tr key={vr.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/business/requests')}>
                      <td className="table-cell font-medium text-gov-blue">{vr.requestId}</td>
                      <td className="table-cell"><StatusBadge status={vr.status} /></td>
                      <td className="table-cell">{formatDate(vr.submittedDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button onClick={() => navigate('/business/register')} className="btn-primary"><Plus size={16} /> Register New Instrument</button>
        <button onClick={() => navigate('/business/certificates')} className="btn-secondary"><Award size={16} /> View Certificates</button>
      </div>

      {/* Expiring Certificates Warning */}
      {myCerts.filter(c => c.status === 'EXPIRING_SOON').length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Certificates Expiring Soon</h3>
            <p className="text-sm text-amber-700 mt-1">You have {myCerts.filter(c => c.status === 'EXPIRING_SOON').length} certificate(s) expiring within 30 days. Apply for re-verification to maintain compliance.</p>
          </div>
        </div>
      )}
    </div>
  );
}
