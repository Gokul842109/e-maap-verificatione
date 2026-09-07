// ============================================================
// e-Maap Verification — Type Definitions
// ============================================================

export type UserRole = 'business' | 'inspector' | 'authority' | 'public';

export type InstrumentStatus =
  | 'ACTIVE'
  | 'EXPIRING_SOON'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'REVOKED'
  | 'PENDING_VERIFICATION'
  | 'RE_INSPECTION_REQUIRED';

export type VerificationStatus =
  | 'SUBMITTED'
  | 'DOCUMENTS_VERIFIED'
  | 'INSPECTOR_ASSIGNED'
  | 'INSPECTION_SCHEDULED'
  | 'PHYSICAL_VERIFICATION'
  | 'CERTIFICATE_GENERATION'
  | 'COMPLETED'
  | 'FAILED';

export type CertificateStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED';

export type ComplaintStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';

export type AlertSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertType =
  | 'IDENTITY_MISMATCH'
  | 'CERTIFICATE_EXPIRED'
  | 'CUSTOMER_COMPLAINT'
  | 'REPEATED_FAILURE'
  | 'INSTRUMENT_REPLACEMENT';

export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'ASSIGNED' | 'RESOLVED';

export type InspectionResult = 'PASS' | 'FAIL' | 'PENDING';

export type IssueType =
  | 'incorrect_weighing'
  | 'suspected_tampering'
  | 'instrument_replaced'
  | 'qr_mismatch'
  | 'expired_certificate'
  | 'other';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// ============================================================
// Core Models
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  designation?: string;
  department?: string;
}

export interface Business {
  id: string;
  name: string;
  ownerName: string;
  address: string;
  district: string;
  state: string;
  gstin: string;
  phone: string;
  email: string;
  userId: string;
  registrationDate: string;
}

export interface Instrument {
  id: string;
  instrumentId: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity: string;
  accuracyClass: string;
  yearOfManufacture: string;
  location: string;
  address: string;
  ownerId: string;
  businessId: string;
  businessName: string;
  ownerName: string;
  status: InstrumentStatus;
  digitalFingerprint: string;
  photo?: string;
  previousCertificate?: string;
  purchaseDocument?: string;
  verificationDate?: string;
  expiryDate?: string;
  lastInspectionDate?: string;
  nextInspectionDate?: string;
  riskScore: number;
  certificateId?: string;
}

export interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface VerificationRequest {
  id: string;
  requestId: string;
  instrumentId: string;
  instrument?: Instrument;
  businessId: string;
  businessName: string;
  status: VerificationStatus;
  submittedDate: string;
  inspectorId?: string;
  inspectorName?: string;
  scheduledDate?: string;
  completedDate?: string;
  timeline: TimelineStep[];
  isReInspection: boolean;
  reInspectionReason?: string;
  priority?: 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface Measurement {
  id: string;
  standardWeight: number;
  instrumentReading: number;
  error: number;
  percentageError: number;
  result: 'PASS' | 'FAIL';
  unit: string;
}

export interface Inspection {
  id: string;
  inspectionId: string;
  verificationRequestId: string;
  instrumentId: string;
  inspectorId: string;
  inspectorName: string;
  measurements: Measurement[];
  physicalCondition: 'Good' | 'Damaged' | 'Fair';
  serialNumberMatch: boolean;
  observedSerial?: string;
  observedModel?: string;
  observedCapacity?: string;
  photos: string[];
  remarks: string;
  result: InspectionResult;
  overallError: number;
  date: string;
  isReInspection: boolean;
  reInspectionReason?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  instrumentId: string;
  instrumentDbId: string;
  instrumentType: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity: string;
  ownerName: string;
  businessName: string;
  verificationDate: string;
  validUntil: string;
  status: CertificateStatus;
  digitalFingerprint: string;
  qrData: string;
  inspectorName: string;
  inspectorId: string;
  inspectionId: string;
}

export interface Complaint {
  id: string;
  complaintId: string;
  instrumentId: string;
  instrumentDbId?: string;
  issueType: IssueType;
  description: string;
  photo?: string;
  location: string;
  reporterName: string;
  reporterContact: string;
  status: ComplaintStatus;
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

export interface Alert {
  id: string;
  instrumentId: string;
  instrumentDbId?: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  businessName: string;
  location: string;
  timestamp: string;
  status: AlertStatus;
  assignedInspectorId?: string;
  details?: {
    registeredSerial?: string;
    observedSerial?: string;
    registeredModel?: string;
    observedModel?: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: UserRole | 'system' | 'public';
  action: string;
  details: string;
  entityType: string;
  entityId: string;
}

export interface RiskScore {
  instrumentId: string;
  score: number;
  level: RiskLevel;
  factors: RiskFactor[];
}

export interface RiskFactor {
  name: string;
  weight: number;
  present: boolean;
  description: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface IoTSensorData {
  enclosureStatus: 'Secure' | 'Breached';
  configurationStatus: 'Normal' | 'Modified';
  deviceIdentity: 'Matched' | 'Mismatch';
  calibrationState: 'Normal' | 'Altered';
  lastUpdated: string;
}

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
}

// ============================================================
// Store Types
// ============================================================

export interface AppState {
  currentUser: User | null;
  users: User[];
  businesses: Business[];
  instruments: Instrument[];
  verificationRequests: VerificationRequest[];
  inspections: Inspection[];
  certificates: Certificate[];
  complaints: Complaint[];
  alerts: Alert[];
  auditLogs: AuditLog[];
  notifications: Notification[];
  toasts: Toast[];
  demoStep: number;
  demoActive: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_INSTRUMENT'; payload: Instrument }
  | { type: 'UPDATE_INSTRUMENT'; payload: { id: string; updates: Partial<Instrument> } }
  | { type: 'ADD_VERIFICATION_REQUEST'; payload: VerificationRequest }
  | { type: 'UPDATE_VERIFICATION_REQUEST'; payload: { id: string; updates: Partial<VerificationRequest> } }
  | { type: 'ADD_INSPECTION'; payload: Inspection }
  | { type: 'UPDATE_INSPECTION'; payload: { id: string; updates: Partial<Inspection> } }
  | { type: 'ADD_CERTIFICATE'; payload: Certificate }
  | { type: 'UPDATE_CERTIFICATE'; payload: { id: string; updates: Partial<Certificate> } }
  | { type: 'ADD_COMPLAINT'; payload: Complaint }
  | { type: 'UPDATE_COMPLAINT'; payload: { id: string; updates: Partial<Complaint> } }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'UPDATE_ALERT'; payload: { id: string; updates: Partial<Alert> } }
  | { type: 'ADD_AUDIT_LOG'; payload: AuditLog }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_DEMO_STEP'; payload: number }
  | { type: 'SET_DEMO_ACTIVE'; payload: boolean }
  | { type: 'RESET_DATA' };
