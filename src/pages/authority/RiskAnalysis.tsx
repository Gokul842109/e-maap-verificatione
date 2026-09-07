import { useStore } from '../../store/useStore';
import { Shield, AlertTriangle } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import RiskScoreCard from '../../components/RiskScoreCard';
import { calculateRiskScore } from '../../utils/riskScore';
import type { RiskLevel } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function RiskAnalysis() {
  const { state } = useStore();

  const instrumentsWithRisk = state.instruments
    .filter(i => i.status !== 'PENDING_VERIFICATION')
    .map(i => {
      const risk = calculateRiskScore(i.instrumentId, {
        previousFailedInspection: i.status === 'REVOKED',
        customerComplaints: state.complaints.filter(c => c.instrumentId === i.instrumentId).length,
        certificateExpiringSoon: i.status === 'EXPIRING_SOON',
        identityMismatch: i.status === 'RE_INSPECTION_REQUIRED',
        repeatedViolations: i.status === 'REVOKED' ? 2 : 0,
        ageOfInstrumentYears: new Date().getFullYear() - parseInt(i.yearOfManufacture || '2024'),
        lastInspectionDaysAgo: 30,
      });
      return { instrument: i, risk };
    })
    .sort((a, b) => b.risk.score - a.risk.score);

  const highCount = instrumentsWithRisk.filter(x => x.risk.level === 'HIGH').length;
  const medCount = instrumentsWithRisk.filter(x => x.risk.level === 'MEDIUM').length;
  const lowCount = instrumentsWithRisk.filter(x => x.risk.level === 'LOW').length;

  const distData = [
    { name: 'High Risk', value: highCount, color: '#dc2626' },
    { name: 'Medium Risk', value: medCount, color: '#f59e0b' },
    { name: 'Low Risk', value: lowCount, color: '#16a34a' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Shield size={24} className="text-gov-blue" /> Risk Analysis</h1>
        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Prototype Risk Model — Configurable for production</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribution Chart */}
        <div className="card">
          <h3 className="font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={distData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {distData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <p className="text-3xl font-bold text-red-600">{highCount}</p>
            <p className="text-sm text-gray-500">High Risk</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-3xl font-bold text-amber-600">{medCount}</p>
            <p className="text-sm text-gray-500">Medium Risk</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-3xl font-bold text-green-600">{lowCount}</p>
            <p className="text-sm text-gray-500">Low Risk</p>
          </div>
        </div>
      </div>

      {/* Instruments sorted by risk */}
      <div className="space-y-3">
        {instrumentsWithRisk.slice(0, 15).map(({ instrument: inst, risk }) => (
          <div key={inst.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${risk.level === 'HIGH' ? 'bg-red-500' : risk.level === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500'}`}>
                  {risk.score}
                </div>
                <div>
                  <p className="font-semibold text-gov-blue">{inst.instrumentId}</p>
                  <p className="text-sm text-gray-500">{inst.businessName} · {inst.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={inst.status} />
                <span className={`badge ${risk.level === 'HIGH' ? 'bg-red-100 text-red-800' : risk.level === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                  {risk.level} RISK
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {risk.factors.filter(f => f.present).map((f, i) => (
                  <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                    <AlertTriangle size={10} /> {f.name}
                  </span>
                ))}
                {risk.factors.filter(f => f.present).length === 0 && (
                  <span className="text-xs text-gray-400">No active risk factors</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
