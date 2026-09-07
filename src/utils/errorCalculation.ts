// ============================================================
// Measurement Error Calculation
// Prototype Calculation — actual statutory permissible-error
// rules can later be integrated based on instrument type
// and applicable regulations.
// ============================================================

import type { Measurement } from '../types';

/**
 * Configurable permissible error thresholds (prototype).
 * In production, these would be loaded from a regulatory database
 * based on instrument type, capacity, and applicable standards.
 */
export interface ErrorThreshold {
  label: string;
  maxAbsoluteError: number; // in the measurement unit
  maxPercentageError: number; // as a percentage
}

/**
 * Default prototype thresholds — configurable for demonstration.
 */
export const DEFAULT_THRESHOLDS: Record<string, ErrorThreshold> = {
  'Electronic Weighing Scale': {
    label: 'Electronic Weighing Scale (Prototype)',
    maxAbsoluteError: 0.05, // kg
    maxPercentageError: 0.1,  // %
  },
  'Mechanical Weighing Scale': {
    label: 'Mechanical Weighing Scale (Prototype)',
    maxAbsoluteError: 0.1,
    maxPercentageError: 0.2,
  },
  'Platform Scale': {
    label: 'Platform Scale (Prototype)',
    maxAbsoluteError: 0.5,
    maxPercentageError: 0.15,
  },
  'Measuring Tape': {
    label: 'Measuring Tape (Prototype)',
    maxAbsoluteError: 0.002, // meters
    maxPercentageError: 0.1,
  },
  'Fuel Dispenser': {
    label: 'Fuel Dispenser (Prototype)',
    maxAbsoluteError: 0.05, // liters
    maxPercentageError: 0.1,
  },
  default: {
    label: 'Default (Prototype)',
    maxAbsoluteError: 0.05,
    maxPercentageError: 0.1,
  },
};

export function getThreshold(instrumentType: string): ErrorThreshold {
  return DEFAULT_THRESHOLDS[instrumentType] || DEFAULT_THRESHOLDS['default'];
}

/**
 * Calculate the error for a single measurement.
 */
export function calculateMeasurementError(
  standardWeight: number,
  instrumentReading: number,
  instrumentType: string = 'default',
  unit: string = 'kg'
): Measurement {
  const error = instrumentReading - standardWeight;
  const percentageError = standardWeight > 0 ? (Math.abs(error) / standardWeight) * 100 : 0;
  const threshold = getThreshold(instrumentType);

  const result: 'PASS' | 'FAIL' =
    Math.abs(error) <= threshold.maxAbsoluteError && percentageError <= threshold.maxPercentageError
      ? 'PASS'
      : 'FAIL';

  return {
    id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    standardWeight,
    instrumentReading,
    error: Number(error.toFixed(4)),
    percentageError: Number(percentageError.toFixed(4)),
    result,
    unit,
  };
}

/**
 * Determine the overall result from multiple measurements.
 */
export function calculateOverallResult(measurements: Measurement[]): 'PASS' | 'FAIL' {
  if (measurements.length === 0) return 'FAIL';
  return measurements.every((m) => m.result === 'PASS') ? 'PASS' : 'FAIL';
}

/**
 * Calculate average error.
 */
export function calculateAverageError(measurements: Measurement[]): number {
  if (measurements.length === 0) return 0;
  const totalError = measurements.reduce((sum, m) => sum + Math.abs(m.error), 0);
  return Number((totalError / measurements.length).toFixed(4));
}
