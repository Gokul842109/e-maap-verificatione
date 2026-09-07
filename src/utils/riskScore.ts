// ============================================================
// Prototype Risk Scoring Model
// Clearly labeled as "Prototype Risk Model"
// Configurable factors and weights
// ============================================================

import type { RiskScore, RiskFactor, RiskLevel } from '../types';

export interface RiskConfig {
  previousFailedInspection: boolean;
  customerComplaints: number;
  certificateExpiringSoon: boolean;
  identityMismatch: boolean;
  repeatedViolations: number;
  ageOfInstrumentYears: number;
  lastInspectionDaysAgo: number;
}

const RISK_FACTORS_CONFIG: Array<{
  name: string;
  description: string;
  weight: number;
  check: (config: RiskConfig) => boolean;
}> = [
  {
    name: 'Previous Failed Inspection',
    description: 'Instrument has previously failed an inspection',
    weight: 25,
    check: (c) => c.previousFailedInspection,
  },
  {
    name: 'Customer Complaints',
    description: 'Multiple customer complaints received',
    weight: 20,
    check: (c) => c.customerComplaints >= 2,
  },
  {
    name: 'Certificate Expiring Soon',
    description: 'Certificate validity expiring within 30 days',
    weight: 10,
    check: (c) => c.certificateExpiringSoon,
  },
  {
    name: 'Identity Mismatch',
    description: 'Discrepancy detected between registered and observed identity',
    weight: 30,
    check: (c) => c.identityMismatch,
  },
  {
    name: 'Repeated Violations',
    description: 'History of multiple compliance violations',
    weight: 15,
    check: (c) => c.repeatedViolations >= 2,
  },
];

export function calculateRiskScore(instrumentId: string, config: RiskConfig): RiskScore {
  const factors: RiskFactor[] = RISK_FACTORS_CONFIG.map((f) => ({
    name: f.name,
    description: f.description,
    weight: f.weight,
    present: f.check(config),
  }));

  const score = factors.reduce((sum, f) => sum + (f.present ? f.weight : 0), 0);
  const clampedScore = Math.min(100, Math.max(0, score));

  let level: RiskLevel = 'LOW';
  if (clampedScore > 60) level = 'HIGH';
  else if (clampedScore > 30) level = 'MEDIUM';

  return {
    instrumentId,
    score: clampedScore,
    level,
    factors,
  };
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'HIGH': return 'text-red-600';
    case 'MEDIUM': return 'text-amber-600';
    case 'LOW': return 'text-green-600';
  }
}

export function getRiskBgColor(level: RiskLevel): string {
  switch (level) {
    case 'HIGH': return 'bg-red-100';
    case 'MEDIUM': return 'bg-amber-100';
    case 'LOW': return 'bg-green-100';
  }
}
