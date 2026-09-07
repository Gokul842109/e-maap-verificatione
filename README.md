# e-Maap Verification ⚖️
### Online Verification & Continuous Monitoring System for Weighing and Measuring Instruments
**Smart India Hackathon (SIH 2026) Prototype**

A digital platform to establish digital identities for verified weighing/measuring instruments, detect physical replacements (identity mismatches), generate tamper-evident QR verification certificates, and trigger re-inspections.

---

## 🌟 Key Features
- **Deterministic Digital Fingerprinting**: SHA-256 identity hash computed for every verified instrument.
- **Instrument Integrity Verification**: Detects mismatches between registered records and observed instruments (serial number, model, capacity).
- **Physical Inspection Module**: Real-time measurement error calculations against statutory permissible limits.
- **Tamper-Evident QR Certificates**: Instant public verification without leaking business or inspector private records.
- **Authority Alert Center & Re-Inspection**: Real-time mismatch alerts, inspector assignment, and certificate revocation.
- **Immutable Audit Trail**: Append-only log tracking all verification, inspection, and integrity events.
- **Guided SIH Demo Mode**: 15-step interactive walkthrough for evaluators.

---

## 👥 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Business Owner** | `business@demo.com` | `demo123` |
| **Inspector** | `inspector@demo.com` | `demo123` |
| **Authority Admin** | `admin@demo.com` | `demo123` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Gokul842109/e-maap-verificatione.git
cd e-maap-verificatione

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **Cryptography**: Web Crypto API (SHA-256)
