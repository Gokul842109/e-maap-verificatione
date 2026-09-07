// ============================================================
// Mock Data — Seeded for SIH Demo
// 10 businesses, 25 instruments, 15 verification requests,
// 20 certificates, 5 complaints, 5 alerts, 3 re-inspections
// ============================================================

import type {
  User, Business, Instrument, VerificationRequest, Inspection,
  Certificate, Complaint, Alert, AuditLog, Notification
} from '../types';

// ============================================================
// USERS
// ============================================================
export const mockUsers: User[] = [
  { id: 'u1', name: 'Rajesh Kumar', email: 'business@demo.com', password: 'demo123', role: 'business', phone: '9876543210', designation: 'Owner', department: 'ABC Traders' },
  { id: 'u2', name: 'Sunil Patil', email: 'business2@demo.com', password: 'demo123', role: 'business', phone: '9876543211', designation: 'Manager', department: 'Fresh Mart' },
  { id: 'u3', name: 'Deepak Sharma', email: 'business3@demo.com', password: 'demo123', role: 'business', phone: '9876543212', designation: 'Owner', department: 'Metro Scales' },
  { id: 'u4', name: 'Inspector Rajesh', email: 'inspector@demo.com', password: 'demo123', role: 'inspector', phone: '9876543220', designation: 'Senior Inspector', department: 'Weights & Measures Dept.' },
  { id: 'u5', name: 'Inspector Priya', email: 'inspector2@demo.com', password: 'demo123', role: 'inspector', phone: '9876543221', designation: 'Inspector', department: 'Weights & Measures Dept.' },
  { id: 'u6', name: 'Dr. Anil Deshmukh', email: 'admin@demo.com', password: 'demo123', role: 'authority', phone: '9876543230', designation: 'Controller', department: 'Weights & Measures Authority' },
];

// ============================================================
// BUSINESSES
// ============================================================
export const mockBusinesses: Business[] = [
  { id: 'b1', name: 'ABC Traders', ownerName: 'Rajesh Kumar', address: 'Shop No. 12, Main Market', district: 'Kopargaon', state: 'Maharashtra', gstin: '27AABCT1234F1ZV', phone: '9876543210', email: 'abc@traders.com', userId: 'u1', registrationDate: '2025-03-15' },
  { id: 'b2', name: 'Fresh Mart Groceries', ownerName: 'Sunil Patil', address: '45, Station Road', district: 'Pune', state: 'Maharashtra', gstin: '27BBFMG5678H2ZP', phone: '9876543211', email: 'freshmart@email.com', userId: 'u2', registrationDate: '2025-04-20' },
  { id: 'b3', name: 'Metro Scales & Services', ownerName: 'Deepak Sharma', address: '78, Industrial Area', district: 'Nashik', state: 'Maharashtra', gstin: '27CCMSS9012J3ZQ', phone: '9876543212', email: 'metro@scales.com', userId: 'u3', registrationDate: '2025-01-10' },
  { id: 'b4', name: 'Sharma Petrol Pump', ownerName: 'Vinod Sharma', address: 'NH-3, Bypass Road', district: 'Ahmednagar', state: 'Maharashtra', gstin: '27DDSPP3456K4ZR', phone: '9876543213', email: 'sharma@petrol.com', userId: 'u1', registrationDate: '2025-05-08' },
  { id: 'b5', name: 'Golden Jewellers', ownerName: 'Arun Gold', address: '23, Jewellers Lane', district: 'Solapur', state: 'Maharashtra', gstin: '27EEGJ7890L5ZS', phone: '9876543214', email: 'golden@jewellers.com', userId: 'u2', registrationDate: '2025-06-12' },
  { id: 'b6', name: 'Kisan Agro Centre', ownerName: 'Mohan Kisan', address: '56, APMC Yard', district: 'Sangli', state: 'Maharashtra', gstin: '27FFKAC1234M6ZT', phone: '9876543215', email: 'kisan@agro.com', userId: 'u1', registrationDate: '2025-02-28' },
  { id: 'b7', name: 'City Gas Agency', ownerName: 'Ramesh Gas', address: '89, Gas Colony', district: 'Satara', state: 'Maharashtra', gstin: '27GGCGA5678N7ZU', phone: '9876543216', email: 'city@gas.com', userId: 'u2', registrationDate: '2025-07-05' },
  { id: 'b8', name: 'Royal Textiles', ownerName: 'Prakash Textile', address: '34, Cloth Market', district: 'Kolhapur', state: 'Maharashtra', gstin: '27HHRT9012P8ZV', phone: '9876543217', email: 'royal@textiles.com', userId: 'u3', registrationDate: '2025-08-15' },
  { id: 'b9', name: 'Sai Medical Store', ownerName: 'Sai Pharma', address: '12, Hospital Road', district: 'Aurangabad', state: 'Maharashtra', gstin: '27IISMS3456Q9ZW', phone: '9876543218', email: 'sai@medical.com', userId: 'u1', registrationDate: '2025-09-01' },
  { id: 'b10', name: 'Bharat Rice Mill', ownerName: 'Bharat Mill', address: '67, Mill Road', district: 'Latur', state: 'Maharashtra', gstin: '27JJBRM7890R0ZX', phone: '9876543219', email: 'bharat@rice.com', userId: 'u3', registrationDate: '2025-04-10' },
];

// ============================================================
// INSTRUMENTS (25)
// ============================================================
export const mockInstruments: Instrument[] = [
  // 1. Fully verified — ACTIVE (primary demo instrument)
  {
    id: 'i1', instrumentId: 'WM-2026-001245', type: 'Electronic Weighing Scale', manufacturer: 'XYZ Ltd.', model: 'XYZ-500', serialNumber: 'ABC12345', capacity: '50 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: 'Shop No. 12, Main Market, Kopargaon', address: 'Kopargaon, Maharashtra', ownerId: 'u1', businessId: 'b1', businessName: 'ABC Traders', ownerName: 'Rajesh Kumar', status: 'ACTIVE', digitalFingerprint: 'A82F91C4D3E5B7081F2A3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C27BC2', verificationDate: '2026-09-07', expiryDate: '2027-09-06', lastInspectionDate: '2026-09-07', nextInspectionDate: '2026-12-07', riskScore: 12, certificateId: 'c1',
  },
  // 2. ACTIVE
  {
    id: 'i2', instrumentId: 'WM-2026-001246', type: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-200', serialNumber: 'AVI20234', capacity: '200 kg', accuracyClass: 'Class III', yearOfManufacture: '2023', location: '45, Station Road, Pune', address: 'Pune, Maharashtra', ownerId: 'u2', businessId: 'b2', businessName: 'Fresh Mart Groceries', ownerName: 'Sunil Patil', status: 'ACTIVE', digitalFingerprint: 'B93FA2D5E4F6C8192G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5', verificationDate: '2026-07-15', expiryDate: '2027-07-14', lastInspectionDate: '2026-07-15', nextInspectionDate: '2026-10-15', riskScore: 8, certificateId: 'c2',
  },
  // 3. ACTIVE
  {
    id: 'i3', instrumentId: 'WM-2026-001247', type: 'Platform Scale', manufacturer: 'Essae Digitronics', model: 'ES-1000', serialNumber: 'ESD10567', capacity: '1000 kg', accuracyClass: 'Class III', yearOfManufacture: '2022', location: '78, Industrial Area, Nashik', address: 'Nashik, Maharashtra', ownerId: 'u3', businessId: 'b3', businessName: 'Metro Scales & Services', ownerName: 'Deepak Sharma', status: 'ACTIVE', digitalFingerprint: 'C04GB3E6F5G7D9203H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6', verificationDate: '2026-06-01', expiryDate: '2027-05-31', lastInspectionDate: '2026-06-01', nextInspectionDate: '2026-09-01', riskScore: 22, certificateId: 'c3',
  },
  // 4. EXPIRED
  {
    id: 'i4', instrumentId: 'WM-2025-000891', type: 'Fuel Dispenser', manufacturer: 'Gilbarco Veeder-Root', model: 'GVR-400', serialNumber: 'GVR40891', capacity: '100 L/min', accuracyClass: 'Class 0.5', yearOfManufacture: '2021', location: 'NH-3, Bypass Road, Ahmednagar', address: 'Ahmednagar, Maharashtra', ownerId: 'u1', businessId: 'b4', businessName: 'Sharma Petrol Pump', ownerName: 'Vinod Sharma', status: 'EXPIRED', digitalFingerprint: 'D15HC4F7G6H8E0314I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7', verificationDate: '2025-08-20', expiryDate: '2026-08-19', lastInspectionDate: '2025-08-20', nextInspectionDate: '2025-11-20', riskScore: 45, certificateId: 'c4',
  },
  // 5. REVOKED (identity mismatch was confirmed)
  {
    id: 'i5', instrumentId: 'WM-2025-000672', type: 'Electronic Weighing Scale', manufacturer: 'CAS India', model: 'CAS-30', serialNumber: 'CAS30672', capacity: '30 kg', accuracyClass: 'Class III', yearOfManufacture: '2023', location: '23, Jewellers Lane, Solapur', address: 'Solapur, Maharashtra', ownerId: 'u2', businessId: 'b5', businessName: 'Golden Jewellers', ownerName: 'Arun Gold', status: 'REVOKED', digitalFingerprint: 'E26ID5G8H7I9F1425J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8', verificationDate: '2025-11-10', expiryDate: '2026-11-09', lastInspectionDate: '2026-04-15', nextInspectionDate: '2026-02-10', riskScore: 85, certificateId: 'c5',
  },
  // 6. RE_INSPECTION_REQUIRED (identity mismatch — primary demo)
  {
    id: 'i6', instrumentId: 'WM-2026-001100', type: 'Electronic Weighing Scale', manufacturer: 'Titan Scales', model: 'TS-100', serialNumber: 'TSC10100', capacity: '100 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: '56, APMC Yard, Sangli', address: 'Sangli, Maharashtra', ownerId: 'u1', businessId: 'b6', businessName: 'Kisan Agro Centre', ownerName: 'Mohan Kisan', status: 'RE_INSPECTION_REQUIRED', digitalFingerprint: 'F37JE6H9I8J0G2536K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9', verificationDate: '2026-03-15', expiryDate: '2027-03-14', lastInspectionDate: '2026-03-15', nextInspectionDate: '2026-06-15', riskScore: 72, certificateId: 'c6',
  },
  // 7. PENDING_VERIFICATION
  {
    id: 'i7', instrumentId: 'WM-2026-001350', type: 'Measuring Tape', manufacturer: 'Freemans', model: 'FM-50M', serialNumber: 'FRM50350', capacity: '50 m', accuracyClass: 'Class II', yearOfManufacture: '2025', location: '89, Gas Colony, Satara', address: 'Satara, Maharashtra', ownerId: 'u2', businessId: 'b7', businessName: 'City Gas Agency', ownerName: 'Ramesh Gas', status: 'PENDING_VERIFICATION', digitalFingerprint: '', verificationDate: undefined, expiryDate: undefined, lastInspectionDate: undefined, nextInspectionDate: undefined, riskScore: 0,
  },
  // 8. ACTIVE
  {
    id: 'i8', instrumentId: 'WM-2026-001248', type: 'Electronic Weighing Scale', manufacturer: 'Mettler Toledo', model: 'MT-5', serialNumber: 'MTL05248', capacity: '5 kg', accuracyClass: 'Class I', yearOfManufacture: '2024', location: '34, Cloth Market, Kolhapur', address: 'Kolhapur, Maharashtra', ownerId: 'u3', businessId: 'b8', businessName: 'Royal Textiles', ownerName: 'Prakash Textile', status: 'ACTIVE', digitalFingerprint: 'H59LG8J0K9L1I4758M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1', verificationDate: '2026-08-01', expiryDate: '2027-07-31', lastInspectionDate: '2026-08-01', nextInspectionDate: '2026-11-01', riskScore: 5, certificateId: 'c8',
  },
  // 9. EXPIRING_SOON
  {
    id: 'i9', instrumentId: 'WM-2025-001050', type: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-500', serialNumber: 'AVI50050', capacity: '500 kg', accuracyClass: 'Class III', yearOfManufacture: '2022', location: '12, Hospital Road, Aurangabad', address: 'Aurangabad, Maharashtra', ownerId: 'u1', businessId: 'b9', businessName: 'Sai Medical Store', ownerName: 'Sai Pharma', status: 'EXPIRING_SOON', digitalFingerprint: 'I60MH9K1L0M2J5869N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2', verificationDate: '2025-10-15', expiryDate: '2026-10-14', lastInspectionDate: '2025-10-15', nextInspectionDate: '2026-01-15', riskScore: 35, certificateId: 'c9',
  },
  // 10. ACTIVE
  {
    id: 'i10', instrumentId: 'WM-2026-001249', type: 'Platform Scale', manufacturer: 'Essae Digitronics', model: 'ES-2000', serialNumber: 'ESD20249', capacity: '2000 kg', accuracyClass: 'Class III', yearOfManufacture: '2023', location: '67, Mill Road, Latur', address: 'Latur, Maharashtra', ownerId: 'u3', businessId: 'b10', businessName: 'Bharat Rice Mill', ownerName: 'Bharat Mill', status: 'ACTIVE', digitalFingerprint: 'J71NI0L2M1N3K6970O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3', verificationDate: '2026-05-20', expiryDate: '2027-05-19', lastInspectionDate: '2026-05-20', nextInspectionDate: '2026-08-20', riskScore: 15, certificateId: 'c10',
  },
  // 11-25: Additional instruments for variety
  { id: 'i11', instrumentId: 'WM-2026-001251', type: 'Electronic Weighing Scale', manufacturer: 'Essae Digitronics', model: 'ES-50', serialNumber: 'ESD50251', capacity: '50 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: 'Shop 5, Market Yard, Pune', address: 'Pune, Maharashtra', ownerId: 'u2', businessId: 'b2', businessName: 'Fresh Mart Groceries', ownerName: 'Sunil Patil', status: 'ACTIVE', digitalFingerprint: 'K82OJ1M3N2O4L7081P2Q3R4S5T6U7', verificationDate: '2026-04-10', expiryDate: '2027-04-09', lastInspectionDate: '2026-04-10', nextInspectionDate: '2026-07-10', riskScore: 10, certificateId: 'c11' },
  { id: 'i12', instrumentId: 'WM-2026-001252', type: 'Fuel Dispenser', manufacturer: 'Tokheim', model: 'TK-600', serialNumber: 'TKM60252', capacity: '150 L/min', accuracyClass: 'Class 0.5', yearOfManufacture: '2023', location: 'NH-4, Pune-Satara Road', address: 'Pune, Maharashtra', ownerId: 'u1', businessId: 'b4', businessName: 'Sharma Petrol Pump', ownerName: 'Vinod Sharma', status: 'ACTIVE', digitalFingerprint: 'L93PK2N4O3P5M8192Q3R4S5T6U7V8', verificationDate: '2026-02-28', expiryDate: '2027-02-27', lastInspectionDate: '2026-02-28', nextInspectionDate: '2026-05-28', riskScore: 18, certificateId: 'c12' },
  { id: 'i13', instrumentId: 'WM-2026-001253', type: 'Electronic Weighing Scale', manufacturer: 'CAS India', model: 'CAS-50', serialNumber: 'CAS50253', capacity: '50 kg', accuracyClass: 'Class III', yearOfManufacture: '2025', location: 'APMC Yard, Sangli', address: 'Sangli, Maharashtra', ownerId: 'u1', businessId: 'b6', businessName: 'Kisan Agro Centre', ownerName: 'Mohan Kisan', status: 'ACTIVE', digitalFingerprint: 'M04QL3O5P4Q6N9203R4S5T6U7V8W9', verificationDate: '2026-01-15', expiryDate: '2027-01-14', lastInspectionDate: '2026-01-15', nextInspectionDate: '2026-04-15', riskScore: 20, certificateId: 'c13' },
  { id: 'i14', instrumentId: 'WM-2025-000900', type: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-100', serialNumber: 'AVI10900', capacity: '100 kg', accuracyClass: 'Class III', yearOfManufacture: '2020', location: 'Market Area, Nashik', address: 'Nashik, Maharashtra', ownerId: 'u3', businessId: 'b3', businessName: 'Metro Scales & Services', ownerName: 'Deepak Sharma', status: 'EXPIRED', digitalFingerprint: 'N15RM4P6Q5R7O0314S5T6U7V8W9X0', verificationDate: '2025-06-01', expiryDate: '2026-05-31', lastInspectionDate: '2025-06-01', nextInspectionDate: '2025-09-01', riskScore: 55, certificateId: 'c14' },
  { id: 'i15', instrumentId: 'WM-2026-001254', type: 'Electronic Weighing Scale', manufacturer: 'Mettler Toledo', model: 'MT-20', serialNumber: 'MTL20254', capacity: '20 kg', accuracyClass: 'Class II', yearOfManufacture: '2024', location: 'Gold Market, Solapur', address: 'Solapur, Maharashtra', ownerId: 'u2', businessId: 'b5', businessName: 'Golden Jewellers', ownerName: 'Arun Gold', status: 'ACTIVE', digitalFingerprint: 'O26SN5Q7R6S8P1425T6U7V8W9X0Y1', verificationDate: '2026-08-10', expiryDate: '2027-08-09', lastInspectionDate: '2026-08-10', nextInspectionDate: '2026-11-10', riskScore: 28, certificateId: 'c15' },
  { id: 'i16', instrumentId: 'WM-2026-001255', type: 'Platform Scale', manufacturer: 'Titan Scales', model: 'TS-500', serialNumber: 'TSC50255', capacity: '500 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: 'Mill Road, Latur', address: 'Latur, Maharashtra', ownerId: 'u3', businessId: 'b10', businessName: 'Bharat Rice Mill', ownerName: 'Bharat Mill', status: 'ACTIVE', digitalFingerprint: 'P37TO6R8S7T9Q2536U7V8W9X0Y1Z2', verificationDate: '2026-07-05', expiryDate: '2027-07-04', lastInspectionDate: '2026-07-05', nextInspectionDate: '2026-10-05', riskScore: 14, certificateId: 'c16' },
  { id: 'i17', instrumentId: 'WM-2026-001256', type: 'Measuring Tape', manufacturer: 'Freemans', model: 'FM-30M', serialNumber: 'FRM30256', capacity: '30 m', accuracyClass: 'Class II', yearOfManufacture: '2025', location: 'Cloth Market, Kolhapur', address: 'Kolhapur, Maharashtra', ownerId: 'u3', businessId: 'b8', businessName: 'Royal Textiles', ownerName: 'Prakash Textile', status: 'ACTIVE', digitalFingerprint: 'Q48UP7S9T8U0R3647V8W9X0Y1Z2A3', verificationDate: '2026-06-20', expiryDate: '2027-06-19', lastInspectionDate: '2026-06-20', nextInspectionDate: '2026-09-20', riskScore: 6, certificateId: 'c17' },
  { id: 'i18', instrumentId: 'WM-2026-001257', type: 'Electronic Weighing Scale', manufacturer: 'XYZ Ltd.', model: 'XYZ-200', serialNumber: 'XYZ20257', capacity: '200 kg', accuracyClass: 'Class III', yearOfManufacture: '2023', location: 'Main Market, Kopargaon', address: 'Kopargaon, Maharashtra', ownerId: 'u1', businessId: 'b1', businessName: 'ABC Traders', ownerName: 'Rajesh Kumar', status: 'ACTIVE', digitalFingerprint: 'R59VQ8T0U9V1S4758W9X0Y1Z2A3B4', verificationDate: '2026-03-10', expiryDate: '2027-03-09', lastInspectionDate: '2026-03-10', nextInspectionDate: '2026-06-10', riskScore: 16, certificateId: 'c18' },
  { id: 'i19', instrumentId: 'WM-2025-000780', type: 'Fuel Dispenser', manufacturer: 'Gilbarco Veeder-Root', model: 'GVR-300', serialNumber: 'GVR30780', capacity: '80 L/min', accuracyClass: 'Class 0.5', yearOfManufacture: '2020', location: 'Bypass Road, Ahmednagar', address: 'Ahmednagar, Maharashtra', ownerId: 'u1', businessId: 'b4', businessName: 'Sharma Petrol Pump', ownerName: 'Vinod Sharma', status: 'SUSPENDED', digitalFingerprint: 'S60WR9U1V0W2T5869X0Y1Z2A3B4C5', verificationDate: '2025-04-20', expiryDate: '2026-04-19', lastInspectionDate: '2026-01-20', nextInspectionDate: '2026-04-20', riskScore: 68, certificateId: 'c19' },
  { id: 'i20', instrumentId: 'WM-2026-001258', type: 'Electronic Weighing Scale', manufacturer: 'Essae Digitronics', model: 'ES-10', serialNumber: 'ESD10258', capacity: '10 kg', accuracyClass: 'Class II', yearOfManufacture: '2025', location: 'Hospital Road, Aurangabad', address: 'Aurangabad, Maharashtra', ownerId: 'u1', businessId: 'b9', businessName: 'Sai Medical Store', ownerName: 'Sai Pharma', status: 'ACTIVE', digitalFingerprint: 'T71XS0V2W1X3U6970Y1Z2A3B4C5D6', verificationDate: '2026-08-20', expiryDate: '2027-08-19', lastInspectionDate: '2026-08-20', nextInspectionDate: '2026-11-20', riskScore: 8, certificateId: 'c20' },
  { id: 'i21', instrumentId: 'WM-2026-001351', type: 'Electronic Weighing Scale', manufacturer: 'CAS India', model: 'CAS-100', serialNumber: 'CAS10351', capacity: '100 kg', accuracyClass: 'Class III', yearOfManufacture: '2025', location: 'Station Road, Pune', address: 'Pune, Maharashtra', ownerId: 'u2', businessId: 'b2', businessName: 'Fresh Mart Groceries', ownerName: 'Sunil Patil', status: 'PENDING_VERIFICATION', digitalFingerprint: '', riskScore: 0 },
  { id: 'i22', instrumentId: 'WM-2026-001352', type: 'Platform Scale', manufacturer: 'Essae Digitronics', model: 'ES-3000', serialNumber: 'ESD30352', capacity: '3000 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: 'APMC Yard, Sangli', address: 'Sangli, Maharashtra', ownerId: 'u1', businessId: 'b6', businessName: 'Kisan Agro Centre', ownerName: 'Mohan Kisan', status: 'PENDING_VERIFICATION', digitalFingerprint: '', riskScore: 0 },
  { id: 'i23', instrumentId: 'WM-2026-001259', type: 'Electronic Weighing Scale', manufacturer: 'Titan Scales', model: 'TS-25', serialNumber: 'TSC25259', capacity: '25 kg', accuracyClass: 'Class III', yearOfManufacture: '2024', location: 'Market Complex, Satara', address: 'Satara, Maharashtra', ownerId: 'u2', businessId: 'b7', businessName: 'City Gas Agency', ownerName: 'Ramesh Gas', status: 'ACTIVE', digitalFingerprint: 'W04AT3Y5Z4A6X9203B4C5D6E7F8G9', verificationDate: '2026-05-10', expiryDate: '2027-05-09', lastInspectionDate: '2026-05-10', nextInspectionDate: '2026-08-10', riskScore: 11, certificateId: 'c21' },
  { id: 'i24', instrumentId: 'WM-2026-001260', type: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-1000', serialNumber: 'AVI10260', capacity: '1000 kg', accuracyClass: 'Class III', yearOfManufacture: '2022', location: 'Industrial Area, Nashik', address: 'Nashik, Maharashtra', ownerId: 'u3', businessId: 'b3', businessName: 'Metro Scales & Services', ownerName: 'Deepak Sharma', status: 'EXPIRING_SOON', digitalFingerprint: 'X15BU4Z6A5B7Y0314C5D6E7F8G9H0', verificationDate: '2025-10-01', expiryDate: '2026-09-30', lastInspectionDate: '2025-10-01', nextInspectionDate: '2026-01-01', riskScore: 38, certificateId: 'c22' },
  { id: 'i25', instrumentId: 'WM-2026-001261', type: 'Fuel Dispenser', manufacturer: 'Tokheim', model: 'TK-800', serialNumber: 'TKM80261', capacity: '200 L/min', accuracyClass: 'Class 0.5', yearOfManufacture: '2024', location: 'National Highway, Kolhapur', address: 'Kolhapur, Maharashtra', ownerId: 'u1', businessId: 'b4', businessName: 'Sharma Petrol Pump', ownerName: 'Vinod Sharma', status: 'ACTIVE', digitalFingerprint: 'Y26CV5A7B6C8Z1425D6E7F8G9H0I1', verificationDate: '2026-07-25', expiryDate: '2027-07-24', lastInspectionDate: '2026-07-25', nextInspectionDate: '2026-10-25', riskScore: 9, certificateId: 'c23' },
];

// ============================================================
// VERIFICATION REQUESTS (15)
// ============================================================
export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: 'vr1', requestId: 'VR-2026-001245', instrumentId: 'i1', businessId: 'b1', businessName: 'ABC Traders', status: 'COMPLETED', submittedDate: '2026-08-20', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-09-05', completedDate: '2026-09-07', isReInspection: false,
    timeline: [
      { label: 'Application Submitted', status: 'completed', date: '2026-08-20' },
      { label: 'Documents Verified', status: 'completed', date: '2026-08-22' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-08-25' },
      { label: 'Inspection Scheduled', status: 'completed', date: '2026-09-01' },
      { label: 'Physical Verification', status: 'completed', date: '2026-09-07' },
      { label: 'Certificate Generation', status: 'completed', date: '2026-09-07' },
    ],
  },
  {
    id: 'vr2', requestId: 'VR-2026-001246', instrumentId: 'i2', businessId: 'b2', businessName: 'Fresh Mart Groceries', status: 'COMPLETED', submittedDate: '2026-06-28', inspectorId: 'u5', inspectorName: 'Inspector Priya', scheduledDate: '2026-07-12', completedDate: '2026-07-15', isReInspection: false,
    timeline: [
      { label: 'Application Submitted', status: 'completed', date: '2026-06-28' },
      { label: 'Documents Verified', status: 'completed', date: '2026-06-30' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-07-03' },
      { label: 'Inspection Scheduled', status: 'completed', date: '2026-07-10' },
      { label: 'Physical Verification', status: 'completed', date: '2026-07-15' },
      { label: 'Certificate Generation', status: 'completed', date: '2026-07-15' },
    ],
  },
  {
    id: 'vr3', requestId: 'VR-2026-001350', instrumentId: 'i7', businessId: 'b7', businessName: 'City Gas Agency', status: 'INSPECTOR_ASSIGNED', submittedDate: '2026-09-01', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', isReInspection: false,
    timeline: [
      { label: 'Application Submitted', status: 'completed', date: '2026-09-01' },
      { label: 'Documents Verified', status: 'completed', date: '2026-09-03' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-09-05' },
      { label: 'Inspection Scheduled', status: 'current' },
      { label: 'Physical Verification', status: 'pending' },
      { label: 'Certificate Generation', status: 'pending' },
    ],
  },
  {
    id: 'vr4', requestId: 'VR-2026-001351', instrumentId: 'i21', businessId: 'b2', businessName: 'Fresh Mart Groceries', status: 'SUBMITTED', submittedDate: '2026-09-06', isReInspection: false,
    timeline: [
      { label: 'Application Submitted', status: 'completed', date: '2026-09-06' },
      { label: 'Documents Verified', status: 'current' },
      { label: 'Inspector Assigned', status: 'pending' },
      { label: 'Inspection Scheduled', status: 'pending' },
      { label: 'Physical Verification', status: 'pending' },
      { label: 'Certificate Generation', status: 'pending' },
    ],
  },
  {
    id: 'vr5', requestId: 'VR-2026-001352', instrumentId: 'i22', businessId: 'b6', businessName: 'Kisan Agro Centre', status: 'DOCUMENTS_VERIFIED', submittedDate: '2026-09-04', isReInspection: false,
    timeline: [
      { label: 'Application Submitted', status: 'completed', date: '2026-09-04' },
      { label: 'Documents Verified', status: 'completed', date: '2026-09-06' },
      { label: 'Inspector Assigned', status: 'current' },
      { label: 'Inspection Scheduled', status: 'pending' },
      { label: 'Physical Verification', status: 'pending' },
      { label: 'Certificate Generation', status: 'pending' },
    ],
  },
  // Re-inspection requests
  {
    id: 'vr6', requestId: 'VR-2026-RI-001', instrumentId: 'i6', businessId: 'b6', businessName: 'Kisan Agro Centre', status: 'INSPECTION_SCHEDULED', submittedDate: '2026-09-05', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-09-10', isReInspection: true, reInspectionReason: 'Instrument identity mismatch reported', priority: 'URGENT',
    timeline: [
      { label: 'Re-inspection Requested', status: 'completed', date: '2026-09-05' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-09-05' },
      { label: 'Inspection Scheduled', status: 'completed', date: '2026-09-06' },
      { label: 'Physical Verification', status: 'current' },
      { label: 'Result & Action', status: 'pending' },
    ],
  },
  {
    id: 'vr7', requestId: 'VR-2026-RI-002', instrumentId: 'i5', businessId: 'b5', businessName: 'Golden Jewellers', status: 'COMPLETED', submittedDate: '2026-04-01', inspectorId: 'u5', inspectorName: 'Inspector Priya', scheduledDate: '2026-04-10', completedDate: '2026-04-15', isReInspection: true, reInspectionReason: 'Customer complaint — suspected instrument replacement', priority: 'HIGH',
    timeline: [
      { label: 'Re-inspection Requested', status: 'completed', date: '2026-04-01' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-04-02' },
      { label: 'Inspection Scheduled', status: 'completed', date: '2026-04-05' },
      { label: 'Physical Verification', status: 'completed', date: '2026-04-15' },
      { label: 'Result & Action', status: 'completed', date: '2026-04-15' },
    ],
  },
  {
    id: 'vr8', requestId: 'VR-2026-RI-003', instrumentId: 'i19', businessId: 'b4', businessName: 'Sharma Petrol Pump', status: 'PHYSICAL_VERIFICATION', submittedDate: '2026-08-15', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-08-25', isReInspection: true, reInspectionReason: 'Repeated customer complaints about fuel measurement', priority: 'HIGH',
    timeline: [
      { label: 'Re-inspection Requested', status: 'completed', date: '2026-08-15' },
      { label: 'Inspector Assigned', status: 'completed', date: '2026-08-16' },
      { label: 'Inspection Scheduled', status: 'completed', date: '2026-08-20' },
      { label: 'Physical Verification', status: 'current' },
      { label: 'Result & Action', status: 'pending' },
    ],
  },
  // More completed requests
  { id: 'vr9', requestId: 'VR-2026-001247', instrumentId: 'i3', businessId: 'b3', businessName: 'Metro Scales & Services', status: 'COMPLETED', submittedDate: '2026-05-10', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-05-28', completedDate: '2026-06-01', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-05-10' }, { label: 'Documents Verified', status: 'completed', date: '2026-05-12' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-05-15' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-05-25' }, { label: 'Physical Verification', status: 'completed', date: '2026-06-01' }, { label: 'Certificate Generation', status: 'completed', date: '2026-06-01' }] },
  { id: 'vr10', requestId: 'VR-2026-001248', instrumentId: 'i8', businessId: 'b8', businessName: 'Royal Textiles', status: 'COMPLETED', submittedDate: '2026-07-10', inspectorId: 'u5', inspectorName: 'Inspector Priya', scheduledDate: '2026-07-28', completedDate: '2026-08-01', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-07-10' }, { label: 'Documents Verified', status: 'completed', date: '2026-07-12' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-07-15' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-07-25' }, { label: 'Physical Verification', status: 'completed', date: '2026-08-01' }, { label: 'Certificate Generation', status: 'completed', date: '2026-08-01' }] },
  { id: 'vr11', requestId: 'VR-2026-001249', instrumentId: 'i10', businessId: 'b10', businessName: 'Bharat Rice Mill', status: 'COMPLETED', submittedDate: '2026-04-28', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-05-15', completedDate: '2026-05-20', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-04-28' }, { label: 'Documents Verified', status: 'completed', date: '2026-04-30' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-05-02' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-05-12' }, { label: 'Physical Verification', status: 'completed', date: '2026-05-20' }, { label: 'Certificate Generation', status: 'completed', date: '2026-05-20' }] },
  { id: 'vr12', requestId: 'VR-2026-001250', instrumentId: 'i11', businessId: 'b2', businessName: 'Fresh Mart Groceries', status: 'COMPLETED', submittedDate: '2026-03-15', inspectorId: 'u5', inspectorName: 'Inspector Priya', scheduledDate: '2026-04-05', completedDate: '2026-04-10', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-03-15' }, { label: 'Documents Verified', status: 'completed', date: '2026-03-17' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-03-20' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-04-02' }, { label: 'Physical Verification', status: 'completed', date: '2026-04-10' }, { label: 'Certificate Generation', status: 'completed', date: '2026-04-10' }] },
  { id: 'vr13', requestId: 'VR-2026-001251', instrumentId: 'i12', businessId: 'b4', businessName: 'Sharma Petrol Pump', status: 'COMPLETED', submittedDate: '2026-02-10', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-02-25', completedDate: '2026-02-28', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-02-10' }, { label: 'Documents Verified', status: 'completed', date: '2026-02-12' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-02-15' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-02-22' }, { label: 'Physical Verification', status: 'completed', date: '2026-02-28' }, { label: 'Certificate Generation', status: 'completed', date: '2026-02-28' }] },
  { id: 'vr14', requestId: 'VR-2026-001252', instrumentId: 'i13', businessId: 'b6', businessName: 'Kisan Agro Centre', status: 'COMPLETED', submittedDate: '2025-12-20', inspectorId: 'u5', inspectorName: 'Inspector Priya', scheduledDate: '2026-01-10', completedDate: '2026-01-15', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2025-12-20' }, { label: 'Documents Verified', status: 'completed', date: '2025-12-22' }, { label: 'Inspector Assigned', status: 'completed', date: '2025-12-25' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-01-08' }, { label: 'Physical Verification', status: 'completed', date: '2026-01-15' }, { label: 'Certificate Generation', status: 'completed', date: '2026-01-15' }] },
  { id: 'vr15', requestId: 'VR-2026-001253', instrumentId: 'i15', businessId: 'b5', businessName: 'Golden Jewellers', status: 'COMPLETED', submittedDate: '2026-07-20', inspectorId: 'u4', inspectorName: 'Inspector Rajesh', scheduledDate: '2026-08-05', completedDate: '2026-08-10', isReInspection: false, timeline: [{ label: 'Application Submitted', status: 'completed', date: '2026-07-20' }, { label: 'Documents Verified', status: 'completed', date: '2026-07-22' }, { label: 'Inspector Assigned', status: 'completed', date: '2026-07-25' }, { label: 'Inspection Scheduled', status: 'completed', date: '2026-08-02' }, { label: 'Physical Verification', status: 'completed', date: '2026-08-10' }, { label: 'Certificate Generation', status: 'completed', date: '2026-08-10' }] },
];

// ============================================================
// INSPECTIONS
// ============================================================
export const mockInspections: Inspection[] = [
  {
    id: 'insp1', inspectionId: 'INS-2026-001', verificationRequestId: 'vr1', instrumentId: 'i1', inspectorId: 'u4', inspectorName: 'Inspector Rajesh',
    measurements: [
      { id: 'm1', standardWeight: 5, instrumentReading: 5.01, error: 0.01, percentageError: 0.2, result: 'PASS', unit: 'kg' },
      { id: 'm2', standardWeight: 10, instrumentReading: 10.02, error: 0.02, percentageError: 0.2, result: 'PASS', unit: 'kg' },
      { id: 'm3', standardWeight: 20, instrumentReading: 20.01, error: 0.01, percentageError: 0.05, result: 'PASS', unit: 'kg' },
      { id: 'm4', standardWeight: 50, instrumentReading: 50.03, error: 0.03, percentageError: 0.06, result: 'PASS', unit: 'kg' },
    ],
    physicalCondition: 'Good', serialNumberMatch: true, photos: [], remarks: 'Instrument in excellent condition. All readings within permissible limits.', result: 'PASS', overallError: 0.0175, date: '2026-09-07', isReInspection: false,
  },
  {
    id: 'insp2', inspectionId: 'INS-2026-002', verificationRequestId: 'vr7', instrumentId: 'i5', inspectorId: 'u5', inspectorName: 'Inspector Priya',
    measurements: [
      { id: 'm5', standardWeight: 5, instrumentReading: 5.15, error: 0.15, percentageError: 3.0, result: 'FAIL', unit: 'kg' },
      { id: 'm6', standardWeight: 10, instrumentReading: 10.22, error: 0.22, percentageError: 2.2, result: 'FAIL', unit: 'kg' },
      { id: 'm7', standardWeight: 20, instrumentReading: 20.35, error: 0.35, percentageError: 1.75, result: 'FAIL', unit: 'kg' },
    ],
    physicalCondition: 'Damaged', serialNumberMatch: false, observedSerial: 'UNK99887', observedModel: 'Unknown-X', photos: [], remarks: 'Serial number does not match registered records. Instrument appears to have been replaced. Significant measurement errors detected.', result: 'FAIL', overallError: 0.24, date: '2026-04-15', isReInspection: true, reInspectionReason: 'Customer complaint — suspected instrument replacement',
  },
];

// ============================================================
// CERTIFICATES (20+)
// ============================================================
export const mockCertificates: Certificate[] = [
  { id: 'c1', certificateNumber: 'CERT-2026-00981', instrumentId: 'WM-2026-001245', instrumentDbId: 'i1', instrumentType: 'Electronic Weighing Scale', manufacturer: 'XYZ Ltd.', model: 'XYZ-500', serialNumber: 'ABC12345', capacity: '50 kg', ownerName: 'Rajesh Kumar', businessName: 'ABC Traders', verificationDate: '2026-09-07', validUntil: '2027-09-06', status: 'ACTIVE', digitalFingerprint: 'A82F91C4D3E5B7081F2A3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C27BC2', qrData: 'WM-2026-001245', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp1' },
  { id: 'c2', certificateNumber: 'CERT-2026-00876', instrumentId: 'WM-2026-001246', instrumentDbId: 'i2', instrumentType: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-200', serialNumber: 'AVI20234', capacity: '200 kg', ownerName: 'Sunil Patil', businessName: 'Fresh Mart Groceries', verificationDate: '2026-07-15', validUntil: '2027-07-14', status: 'ACTIVE', digitalFingerprint: 'B93FA2D5E4F6C8192G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5', qrData: 'WM-2026-001246', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-2' },
  { id: 'c3', certificateNumber: 'CERT-2026-00745', instrumentId: 'WM-2026-001247', instrumentDbId: 'i3', instrumentType: 'Platform Scale', manufacturer: 'Essae Digitronics', model: 'ES-1000', serialNumber: 'ESD10567', capacity: '1000 kg', ownerName: 'Deepak Sharma', businessName: 'Metro Scales & Services', verificationDate: '2026-06-01', validUntil: '2027-05-31', status: 'ACTIVE', digitalFingerprint: 'C04GB3E6F5G7D9203H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6', qrData: 'WM-2026-001247', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-3' },
  { id: 'c4', certificateNumber: 'CERT-2025-00512', instrumentId: 'WM-2025-000891', instrumentDbId: 'i4', instrumentType: 'Fuel Dispenser', manufacturer: 'Gilbarco Veeder-Root', model: 'GVR-400', serialNumber: 'GVR40891', capacity: '100 L/min', ownerName: 'Vinod Sharma', businessName: 'Sharma Petrol Pump', verificationDate: '2025-08-20', validUntil: '2026-08-19', status: 'EXPIRED', digitalFingerprint: 'D15HC4F7G6H8E0314I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7', qrData: 'WM-2025-000891', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-4' },
  { id: 'c5', certificateNumber: 'CERT-2025-00389', instrumentId: 'WM-2025-000672', instrumentDbId: 'i5', instrumentType: 'Electronic Weighing Scale', manufacturer: 'CAS India', model: 'CAS-30', serialNumber: 'CAS30672', capacity: '30 kg', ownerName: 'Arun Gold', businessName: 'Golden Jewellers', verificationDate: '2025-11-10', validUntil: '2026-11-09', status: 'REVOKED', digitalFingerprint: 'E26ID5G8H7I9F1425J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8', qrData: 'WM-2025-000672', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-5' },
  { id: 'c6', certificateNumber: 'CERT-2026-00623', instrumentId: 'WM-2026-001100', instrumentDbId: 'i6', instrumentType: 'Electronic Weighing Scale', manufacturer: 'Titan Scales', model: 'TS-100', serialNumber: 'TSC10100', capacity: '100 kg', ownerName: 'Mohan Kisan', businessName: 'Kisan Agro Centre', verificationDate: '2026-03-15', validUntil: '2027-03-14', status: 'SUSPENDED', digitalFingerprint: 'F37JE6H9I8J0G2536K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9', qrData: 'WM-2026-001100', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-6' },
  { id: 'c8', certificateNumber: 'CERT-2026-00890', instrumentId: 'WM-2026-001248', instrumentDbId: 'i8', instrumentType: 'Electronic Weighing Scale', manufacturer: 'Mettler Toledo', model: 'MT-5', serialNumber: 'MTL05248', capacity: '5 kg', ownerName: 'Prakash Textile', businessName: 'Royal Textiles', verificationDate: '2026-08-01', validUntil: '2027-07-31', status: 'ACTIVE', digitalFingerprint: 'H59LG8J0K9L1I4758M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1', qrData: 'WM-2026-001248', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-8' },
  { id: 'c9', certificateNumber: 'CERT-2025-00678', instrumentId: 'WM-2025-001050', instrumentDbId: 'i9', instrumentType: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-500', serialNumber: 'AVI50050', capacity: '500 kg', ownerName: 'Sai Pharma', businessName: 'Sai Medical Store', verificationDate: '2025-10-15', validUntil: '2026-10-14', status: 'EXPIRING_SOON', digitalFingerprint: 'I60MH9K1L0M2J5869N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2', qrData: 'WM-2025-001050', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-9' },
  { id: 'c10', certificateNumber: 'CERT-2026-00756', instrumentId: 'WM-2026-001249', instrumentDbId: 'i10', instrumentType: 'Platform Scale', manufacturer: 'Essae Digitronics', model: 'ES-2000', serialNumber: 'ESD20249', capacity: '2000 kg', ownerName: 'Bharat Mill', businessName: 'Bharat Rice Mill', verificationDate: '2026-05-20', validUntil: '2027-05-19', status: 'ACTIVE', digitalFingerprint: 'J71NI0L2M1N3K6970O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3', qrData: 'WM-2026-001249', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-10' },
  { id: 'c11', certificateNumber: 'CERT-2026-00634', instrumentId: 'WM-2026-001251', instrumentDbId: 'i11', instrumentType: 'Electronic Weighing Scale', manufacturer: 'Essae Digitronics', model: 'ES-50', serialNumber: 'ESD50251', capacity: '50 kg', ownerName: 'Sunil Patil', businessName: 'Fresh Mart Groceries', verificationDate: '2026-04-10', validUntil: '2027-04-09', status: 'ACTIVE', digitalFingerprint: 'K82OJ1M3N2O4L7081P2Q3R4S5T6U7', qrData: 'WM-2026-001251', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-11' },
  { id: 'c12', certificateNumber: 'CERT-2026-00520', instrumentId: 'WM-2026-001252', instrumentDbId: 'i12', instrumentType: 'Fuel Dispenser', manufacturer: 'Tokheim', model: 'TK-600', serialNumber: 'TKM60252', capacity: '150 L/min', ownerName: 'Vinod Sharma', businessName: 'Sharma Petrol Pump', verificationDate: '2026-02-28', validUntil: '2027-02-27', status: 'ACTIVE', digitalFingerprint: 'L93PK2N4O3P5M8192Q3R4S5T6U7V8', qrData: 'WM-2026-001252', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-12' },
  { id: 'c13', certificateNumber: 'CERT-2026-00415', instrumentId: 'WM-2026-001253', instrumentDbId: 'i13', instrumentType: 'Electronic Weighing Scale', manufacturer: 'CAS India', model: 'CAS-50', serialNumber: 'CAS50253', capacity: '50 kg', ownerName: 'Mohan Kisan', businessName: 'Kisan Agro Centre', verificationDate: '2026-01-15', validUntil: '2027-01-14', status: 'ACTIVE', digitalFingerprint: 'M04QL3O5P4Q6N9203R4S5T6U7V8W9', qrData: 'WM-2026-001253', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-13' },
  { id: 'c14', certificateNumber: 'CERT-2025-00310', instrumentId: 'WM-2025-000900', instrumentDbId: 'i14', instrumentType: 'Mechanical Weighing Scale', manufacturer: 'Avery India', model: 'AV-100', serialNumber: 'AVI10900', capacity: '100 kg', ownerName: 'Deepak Sharma', businessName: 'Metro Scales & Services', verificationDate: '2025-06-01', validUntil: '2026-05-31', status: 'EXPIRED', digitalFingerprint: 'N15RM4P6Q5R7O0314S5T6U7V8W9X0', qrData: 'WM-2025-000900', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-14' },
  { id: 'c15', certificateNumber: 'CERT-2026-00912', instrumentId: 'WM-2026-001254', instrumentDbId: 'i15', instrumentType: 'Electronic Weighing Scale', manufacturer: 'Mettler Toledo', model: 'MT-20', serialNumber: 'MTL20254', capacity: '20 kg', ownerName: 'Arun Gold', businessName: 'Golden Jewellers', verificationDate: '2026-08-10', validUntil: '2027-08-09', status: 'ACTIVE', digitalFingerprint: 'O26SN5Q7R6S8P1425T6U7V8W9X0Y1', qrData: 'WM-2026-001254', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-15' },
  { id: 'c16', certificateNumber: 'CERT-2026-00823', instrumentId: 'WM-2026-001255', instrumentDbId: 'i16', instrumentType: 'Platform Scale', manufacturer: 'Titan Scales', model: 'TS-500', serialNumber: 'TSC50255', capacity: '500 kg', ownerName: 'Bharat Mill', businessName: 'Bharat Rice Mill', verificationDate: '2026-07-05', validUntil: '2027-07-04', status: 'ACTIVE', digitalFingerprint: 'P37TO6R8S7T9Q2536U7V8W9X0Y1Z2', qrData: 'WM-2026-001255', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-16' },
  { id: 'c17', certificateNumber: 'CERT-2026-00789', instrumentId: 'WM-2026-001256', instrumentDbId: 'i17', instrumentType: 'Measuring Tape', manufacturer: 'Freemans', model: 'FM-30M', serialNumber: 'FRM30256', capacity: '30 m', ownerName: 'Prakash Textile', businessName: 'Royal Textiles', verificationDate: '2026-06-20', validUntil: '2027-06-19', status: 'ACTIVE', digitalFingerprint: 'Q48UP7S9T8U0R3647V8W9X0Y1Z2A3', qrData: 'WM-2026-001256', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-17' },
  { id: 'c18', certificateNumber: 'CERT-2026-00567', instrumentId: 'WM-2026-001257', instrumentDbId: 'i18', instrumentType: 'Electronic Weighing Scale', manufacturer: 'XYZ Ltd.', model: 'XYZ-200', serialNumber: 'XYZ20257', capacity: '200 kg', ownerName: 'Rajesh Kumar', businessName: 'ABC Traders', verificationDate: '2026-03-10', validUntil: '2027-03-09', status: 'ACTIVE', digitalFingerprint: 'R59VQ8T0U9V1S4758W9X0Y1Z2A3B4', qrData: 'WM-2026-001257', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-18' },
  { id: 'c19', certificateNumber: 'CERT-2025-00445', instrumentId: 'WM-2025-000780', instrumentDbId: 'i19', instrumentType: 'Fuel Dispenser', manufacturer: 'Gilbarco Veeder-Root', model: 'GVR-300', serialNumber: 'GVR30780', capacity: '80 L/min', ownerName: 'Vinod Sharma', businessName: 'Sharma Petrol Pump', verificationDate: '2025-04-20', validUntil: '2026-04-19', status: 'SUSPENDED', digitalFingerprint: 'S60WR9U1V0W2T5869X0Y1Z2A3B4C5', qrData: 'WM-2025-000780', inspectorName: 'Inspector Rajesh', inspectorId: 'u4', inspectionId: 'insp-auto-19' },
  { id: 'c20', certificateNumber: 'CERT-2026-00934', instrumentId: 'WM-2026-001258', instrumentDbId: 'i20', instrumentType: 'Electronic Weighing Scale', manufacturer: 'Essae Digitronics', model: 'ES-10', serialNumber: 'ESD10258', capacity: '10 kg', ownerName: 'Sai Pharma', businessName: 'Sai Medical Store', verificationDate: '2026-08-20', validUntil: '2027-08-19', status: 'ACTIVE', digitalFingerprint: 'T71XS0V2W1X3U6970Y1Z2A3B4C5D6', qrData: 'WM-2026-001258', inspectorName: 'Inspector Priya', inspectorId: 'u5', inspectionId: 'insp-auto-20' },
];

// ============================================================
// COMPLAINTS (5)
// ============================================================
export const mockComplaints: Complaint[] = [
  { id: 'cmp1', complaintId: 'CMP-2026-00125', instrumentId: 'WM-2026-001100', instrumentDbId: 'i6', issueType: 'instrument_replaced', description: 'The weighing machine at this shop seems different from last month. The display and body look completely different.', location: '56, APMC Yard, Sangli', reporterName: 'Anita Desai', reporterContact: '9876500001', status: 'INVESTIGATING', submittedDate: '2026-09-04' },
  { id: 'cmp2', complaintId: 'CMP-2026-00126', instrumentId: 'WM-2025-000672', instrumentDbId: 'i5', issueType: 'incorrect_weighing', description: 'This shop consistently under-weighs gold items. I got a second opinion from another jeweller and my purchase was 2g short.', location: '23, Jewellers Lane, Solapur', reporterName: 'Priya Joshi', reporterContact: '9876500002', status: 'RESOLVED', submittedDate: '2026-03-20', resolvedDate: '2026-04-20' },
  { id: 'cmp3', complaintId: 'CMP-2026-00127', instrumentId: 'WM-2025-000780', instrumentDbId: 'i19', issueType: 'suspected_tampering', description: 'The fuel dispenser display seems to run faster than normal. I suspect the meter has been tampered with.', location: 'NH-3, Bypass Road, Ahmednagar', reporterName: 'Ramesh Kulkarni', reporterContact: '9876500003', status: 'INVESTIGATING', submittedDate: '2026-08-10' },
  { id: 'cmp4', complaintId: 'CMP-2026-00128', instrumentId: 'WM-2025-000891', instrumentDbId: 'i4', issueType: 'expired_certificate', description: 'I scanned the QR code on the weighing machine and it shows the certificate has expired. The shopkeeper claims it is still valid.', location: 'NH-3, Bypass Road, Ahmednagar', reporterName: 'Sanjay More', reporterContact: '9876500004', status: 'UNDER_REVIEW', submittedDate: '2026-08-25' },
  { id: 'cmp5', complaintId: 'CMP-2026-00129', instrumentId: 'WM-2026-001246', instrumentDbId: 'i2', issueType: 'incorrect_weighing', description: 'Vegetables weighed at this shop seem to be less than what the scale shows. Suspecting calibration issue.', location: '45, Station Road, Pune', reporterName: 'Kavita Pawar', reporterContact: '9876500005', status: 'SUBMITTED', submittedDate: '2026-09-06' },
];

// ============================================================
// ALERTS (5)
// ============================================================
export const mockAlerts: Alert[] = [
  { id: 'alt1', instrumentId: 'WM-2026-001100', instrumentDbId: 'i6', type: 'IDENTITY_MISMATCH', severity: 'HIGH', message: 'Instrument identity mismatch detected. Observed serial number does not match registered records.', businessName: 'Kisan Agro Centre', location: 'Sangli', timestamp: '2026-09-05T10:32:00', status: 'ASSIGNED', assignedInspectorId: 'u4', details: { registeredSerial: 'TSC10100', observedSerial: 'XYZ98765', registeredModel: 'TS-100', observedModel: 'ABC-900' } },
  { id: 'alt2', instrumentId: 'WM-2025-000891', instrumentDbId: 'i4', type: 'CERTIFICATE_EXPIRED', severity: 'MEDIUM', message: 'Certificate CERT-2025-00512 has expired. Instrument is operating without valid certification.', businessName: 'Sharma Petrol Pump', location: 'Ahmednagar', timestamp: '2026-08-20T00:00:00', status: 'ACKNOWLEDGED' },
  { id: 'alt3', instrumentId: 'WM-2025-000672', instrumentDbId: 'i5', type: 'CUSTOMER_COMPLAINT', severity: 'HIGH', message: 'Multiple customer complaints received regarding incorrect measurements. Re-inspection completed — certificate revoked.', businessName: 'Golden Jewellers', location: 'Solapur', timestamp: '2026-03-21T09:15:00', status: 'RESOLVED' },
  { id: 'alt4', instrumentId: 'WM-2025-000780', instrumentDbId: 'i19', type: 'REPEATED_FAILURE', severity: 'HIGH', message: 'Repeated complaints about fuel measurement accuracy. Instrument has history of violations.', businessName: 'Sharma Petrol Pump', location: 'Ahmednagar', timestamp: '2026-08-12T14:30:00', status: 'ASSIGNED', assignedInspectorId: 'u4' },
  { id: 'alt5', instrumentId: 'WM-2026-001245', instrumentDbId: 'i1', type: 'INSTRUMENT_REPLACEMENT', severity: 'LOW', message: 'Routine monitoring — no issues detected. Last verification passed successfully.', businessName: 'ABC Traders', location: 'Kopargaon', timestamp: '2026-09-07T08:00:00', status: 'RESOLVED' },
];

// ============================================================
// AUDIT LOGS
// ============================================================
export const mockAuditLogs: AuditLog[] = [
  { id: 'log1', timestamp: '2026-09-07T10:20:00', actor: 'Inspector Rajesh', actorRole: 'inspector', action: 'Verified instrument', details: 'Physical verification completed for WM-2026-001245. Result: PASS', entityType: 'inspection', entityId: 'insp1' },
  { id: 'log2', timestamp: '2026-09-07T10:24:00', actor: 'System', actorRole: 'system', action: 'Digital identity created', details: 'Digital fingerprint generated for instrument WM-2026-001245', entityType: 'instrument', entityId: 'i1' },
  { id: 'log3', timestamp: '2026-09-07T10:25:00', actor: 'System', actorRole: 'system', action: 'Certificate generated', details: 'Certificate CERT-2026-00981 issued for WM-2026-001245. Valid until 06 Sep 2027.', entityType: 'certificate', entityId: 'c1' },
  { id: 'log4', timestamp: '2026-09-05T10:32:00', actor: 'System', actorRole: 'system', action: 'Mismatch alert generated', details: 'Identity mismatch detected for WM-2026-001100. Registered: TSC10100, Observed: XYZ98765', entityType: 'alert', entityId: 'alt1' },
  { id: 'log5', timestamp: '2026-09-05T11:00:00', actor: 'Dr. Anil Deshmukh', actorRole: 'authority', action: 'Re-inspection assigned', details: 'Inspector Rajesh assigned to re-inspect WM-2026-001100 due to identity mismatch', entityType: 'verificationRequest', entityId: 'vr6' },
  { id: 'log6', timestamp: '2026-09-04T15:45:00', actor: 'Anita Desai', actorRole: 'public', action: 'Complaint submitted', details: 'Complaint CMP-2026-00125 filed for suspected instrument replacement at Kisan Agro Centre', entityType: 'complaint', entityId: 'cmp1' },
  { id: 'log7', timestamp: '2026-08-20T10:00:00', actor: 'Rajesh Kumar', actorRole: 'business', action: 'Verification request submitted', details: 'New verification request VR-2026-001245 submitted for Electronic Weighing Scale', entityType: 'verificationRequest', entityId: 'vr1' },
  { id: 'log8', timestamp: '2026-08-22T14:30:00', actor: 'System', actorRole: 'system', action: 'Documents verified', details: 'All submitted documents verified for VR-2026-001245', entityType: 'verificationRequest', entityId: 'vr1' },
  { id: 'log9', timestamp: '2026-08-25T09:15:00', actor: 'Dr. Anil Deshmukh', actorRole: 'authority', action: 'Inspector assigned', details: 'Inspector Rajesh assigned to verification request VR-2026-001245', entityType: 'verificationRequest', entityId: 'vr1' },
  { id: 'log10', timestamp: '2026-04-15T16:00:00', actor: 'Inspector Priya', actorRole: 'inspector', action: 'Re-inspection completed', details: 'Re-inspection of WM-2025-000672 failed. Instrument appears replaced.', entityType: 'inspection', entityId: 'insp2' },
  { id: 'log11', timestamp: '2026-04-15T16:05:00', actor: 'System', actorRole: 'system', action: 'Certificate revoked', details: 'Certificate CERT-2025-00389 revoked for WM-2025-000672 due to failed re-inspection.', entityType: 'certificate', entityId: 'c5' },
  { id: 'log12', timestamp: '2026-03-21T09:15:00', actor: 'System', actorRole: 'system', action: 'Alert generated', details: 'Customer complaint alert generated for WM-2025-000672', entityType: 'alert', entityId: 'alt3' },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', message: 'Certificate CERT-2026-00981 has been issued for your instrument WM-2026-001245.', type: 'success', read: false, timestamp: '2026-09-07T10:25:00', link: '/business/certificates' },
  { id: 'n2', userId: 'u1', message: 'Certificate CERT-2025-00678 expires in 37 days. Apply for re-verification.', type: 'warning', read: false, timestamp: '2026-09-07T08:00:00', link: '/business/certificates' },
  { id: 'n3', userId: 'u4', message: 'New verification request VR-2026-001350 assigned to you.', type: 'info', read: false, timestamp: '2026-09-05T10:00:00', link: '/inspector/requests' },
  { id: 'n4', userId: 'u4', message: 'URGENT: Re-inspection required for WM-2026-001100 — identity mismatch detected.', type: 'error', read: false, timestamp: '2026-09-05T10:35:00', link: '/inspector/requests' },
  { id: 'n5', userId: 'u6', message: 'Identity mismatch detected for WM-2026-001100 at Kisan Agro Centre, Sangli.', type: 'error', read: false, timestamp: '2026-09-05T10:32:00', link: '/authority/alerts' },
  { id: 'n6', userId: 'u6', message: '34 instruments have active mismatch alerts requiring attention.', type: 'warning', read: true, timestamp: '2026-09-01T09:00:00', link: '/authority/alerts' },
  { id: 'n7', userId: 'u6', message: 'New complaint CMP-2026-00129 filed for WM-2026-001246.', type: 'info', read: false, timestamp: '2026-09-06T11:20:00', link: '/authority/complaints' },
  { id: 'n8', userId: 'u4', message: 'Re-inspection scheduled for WM-2025-000780 on 25 Aug 2026.', type: 'info', read: true, timestamp: '2026-08-20T10:00:00', link: '/inspector/requests' },
];
