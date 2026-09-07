import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { QRCodeSVG } from 'qrcode.react';
import { Scale, Award, Printer, Download, ExternalLink, Copy, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import { formatDate } from '../utils/formatters';

function truncateFP(fp: string): string {
  if (!fp || fp.length <= 20) return fp;
  return `${fp.slice(0, 10)}...${fp.slice(-8)}`;
}

export default function CertificatePage() {
  const { id } = useParams();
  const { state } = useStore();
  const navigate = useNavigate();

  const cert = state.certificates.find(c => c.id === id);

  if (!cert) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <XCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Certificate Not Found</h2>
          <p className="text-gray-500 mt-2">The certificate you're looking for does not exist.</p>
          <button onClick={() => navigate('/verify')} className="btn-primary mt-4">Verify Certificate</button>
        </div>
      </div>
    );
  }

  const handlePrint = () => window.print();
  const handleCopy = () => {
    navigator.clipboard.writeText(cert.digitalFingerprint);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* No-print controls */}
      <div className="max-w-3xl mx-auto mb-4 flex gap-3 no-print">
        <button onClick={handlePrint} className="btn-primary"><Printer size={16} /> Print Certificate</button>
        <button onClick={handlePrint} className="btn-secondary"><Download size={16} /> Download</button>
        <button onClick={() => navigate('/verify')} className="btn-secondary"><ExternalLink size={16} /> Verify</button>
      </div>

      {/* Certificate */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border-4 border-double border-gov-blue p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-gov-blue pb-6 mb-6">
          <Scale size={48} className="text-gov-blue mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gov-blue tracking-wide">VERIFICATION CERTIFICATE</h1>
          <p className="text-sm text-gray-500 mt-1">Weights & Measures Authority</p>
        </div>

        {/* Certificate Number */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Certificate Number</p>
          <p className="text-2xl font-bold text-gov-blue">{cert.certificateNumber}</p>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-6">
          {cert.status === 'ACTIVE' ? (
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full text-lg font-bold">
              <CheckCircle size={24} /> VERIFIED
            </div>
          ) : (
            <StatusBadge status={cert.status} />
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6 text-sm">
          <div><span className="text-gray-500">Instrument ID</span><p className="font-semibold text-gray-900">{cert.instrumentId}</p></div>
          <div><span className="text-gray-500">Instrument Type</span><p className="font-semibold text-gray-900">{cert.instrumentType}</p></div>
          <div><span className="text-gray-500">Manufacturer</span><p className="font-semibold text-gray-900">{cert.manufacturer}</p></div>
          <div><span className="text-gray-500">Model</span><p className="font-semibold text-gray-900">{cert.model}</p></div>
          <div><span className="text-gray-500">Serial Number</span><p className="font-semibold font-mono text-gray-900">{cert.serialNumber}</p></div>
          <div><span className="text-gray-500">Capacity</span><p className="font-semibold text-gray-900">{cert.capacity}</p></div>
          <div><span className="text-gray-500">Owner</span><p className="font-semibold text-gray-900">{cert.ownerName}</p></div>
          <div><span className="text-gray-500">Business</span><p className="font-semibold text-gray-900">{cert.businessName}</p></div>
          <div><span className="text-gray-500">Verification Date</span><p className="font-semibold text-gray-900">{formatDate(cert.verificationDate)}</p></div>
          <div><span className="text-gray-500">Valid Until</span><p className="font-semibold text-gray-900">{formatDate(cert.validUntil)}</p></div>
        </div>

        {/* Fingerprint */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Digital Fingerprint</p>
              <p className="font-mono text-sm mt-1">{truncateFP(cert.digitalFingerprint)}</p>
            </div>
            <button onClick={handleCopy} className="btn-ghost text-xs no-print"><Copy size={14} /> Copy</button>
          </div>
        </div>

        {/* QR Code & Inspector */}
        <div className="flex items-center justify-between border-t pt-6">
          <div>
            <QRCodeSVG value={cert.qrData || cert.instrumentId} size={120} className="border p-2 rounded" />
            <p className="text-xs text-gray-400 mt-2 text-center">Scan to verify</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Verified by</p>
            <p className="font-semibold text-gray-900">{cert.inspectorName}</p>
            <p className="text-xs text-gray-400 mt-4">Authorized Inspector</p>
            <div className="border-t border-gray-300 mt-2 pt-1 w-48 ml-auto" />
            <p className="text-xs text-gray-500 mt-4">verify.emaap.gov.in/cert/{cert.certificateNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
