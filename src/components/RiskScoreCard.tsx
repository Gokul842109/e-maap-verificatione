import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { getRiskColor, getRiskBgColor } from '../utils/riskScore';
import type { RiskLevel } from '../types';

interface Props {
  score: number;
  level: RiskLevel;
  factors: { name: string; present: boolean; weight: number; description: string }[];
}

export default function RiskScoreCard({ score, level, factors }: Props) {
  const color = getRiskColor(level);
  const bg = getRiskBgColor(level);
  const strokeColor = level === 'HIGH' ? '#dc2626' : level === 'MEDIUM' ? '#f59e0b' : '#16a34a';
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Shield size={20} className="text-gov-blue" />
        <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-auto">Prototype Risk Model</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r="45" stroke={strokeColor} strokeWidth="8" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${color}`}>{score}</span>
            <span className="text-xs text-gray-500">/100</span>
          </div>
        </div>
        <div className="flex-1">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${bg} ${color} mb-3`}>
            {level} RISK
          </span>
          <div className="space-y-2">
            {factors.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {f.present ? <XCircle size={14} className="text-red-500 flex-shrink-0" /> : <CheckCircle size={14} className="text-green-500 flex-shrink-0" />}
                <span className={f.present ? 'text-red-700' : 'text-gray-600'}>{f.name}</span>
                <span className="text-xs text-gray-400 ml-auto">+{f.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
