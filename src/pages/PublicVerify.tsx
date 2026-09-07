import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  QrCode, 
  Scale, 
  ShieldCheck, 
  Clock, 
  XCircle,
  Camera,
  X,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDate } from '../utils/formatters';

const PublicVerify: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState('');
  
  const [searchResult, setSearchResult] = useState<{
    certificate: any;
    instrument: any;
    status: 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'NOT_FOUND';
  } | null>(null);

  const performSearch = (query: string) => {
    if (!query.trim()) return;
    
    setHasSearched(true);
    
    // Check if it's a certificate number or instrument ID
    const cert = state.certificates.find(
      c => c.certificateNumber.toLowerCase() === query.toLowerCase() || 
           c.instrumentId.toLowerCase() === query.toLowerCase()
    );
    
    if (cert) {
      const inst = state.instruments.find(i => i.id === cert.instrumentId);
      
      setSearchResult({
        certificate: cert,
        instrument: inst,
        status: cert.status as any
      });
    } else {
      // Might be just an instrument without a certificate yet
      const inst = state.instruments.find(i => i.id.toLowerCase() === query.toLowerCase());
      
      if (inst && inst.status === 'ACTIVE') {
         // Find latest cert if any
         const latestCert = state.certificates.find(c => c.instrumentId === inst.id);
         if (latestCert) {
           setSearchResult({
             certificate: latestCert,
             instrument: inst,
             status: latestCert.status as any
           });
           return;
         }
      }
      
      setSearchResult({
        certificate: null,
        instrument: null,
        status: 'NOT_FOUND'
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleScanSubmit = () => {
    setIsScanning(false);
    setSearchQuery(scanData);
    performSearch(scanData);
    setScanData('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <Scale className="h-8 w-8 text-[#1e3a5f]" />
              <span className="text-xl font-bold text-[#1e3a5f]">e-Maap</span>
            </div>
            <div>
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Verify an Instrument</h1>
          <p className="text-gray-600">Enter the Certificate Number or Instrument ID to verify authenticity</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. CERT-2026-0001 or WM-2026-0001"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary py-3 px-6 whitespace-nowrap flex justify-center items-center"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={() => setIsScanning(true)}
              className="btn-secondary py-3 px-6 whitespace-nowrap flex justify-center items-center"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR
            </button>
          </form>
        </div>

        {/* Results Section */}
        {hasSearched && searchResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {searchResult.status === 'ACTIVE' && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full p-2 mr-4 mt-1">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-green-800 mb-1">VERIFIED INSTRUMENT</h2>
                    <p className="text-green-700 font-medium mb-6">Instrument identity matches registered records.</p>
                    
                    <div className="bg-white rounded-lg p-5 border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Certificate Number</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.certificateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Instrument ID</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.instrumentId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Type</p>
                          <p className="font-medium text-gray-900">{searchResult.instrument?.type || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Serial Number</p>
                          <p className="font-medium text-gray-900">{searchResult.instrument?.serialNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Manufacturer / Model</p>
                          <p className="font-medium text-gray-900">{searchResult.instrument?.manufacturer} / {searchResult.instrument?.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Verification Date</p>
                          <p className="font-medium text-gray-900">{formatDate(searchResult.certificate.issueDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Valid Until</p>
                          <p className="font-semibold text-green-700">{formatDate(searchResult.certificate.expiryDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {searchResult.status === 'EXPIRED' && (
              <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-amber-500 rounded-full p-2 mr-4 mt-1">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-amber-800 mb-1">CERTIFICATE EXPIRED</h2>
                    <p className="text-amber-700 font-medium mb-6">This instrument requires re-verification.</p>
                    
                    <div className="bg-white rounded-lg p-5 border border-amber-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Certificate Number</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.certificateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Instrument ID</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.instrumentId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Type</p>
                          <p className="font-medium text-gray-900">{searchResult.instrument?.type || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Expired
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Expired On</p>
                          <p className="font-semibold text-amber-700">{formatDate(searchResult.certificate.expiryDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {searchResult.status === 'REVOKED' && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-red-500 rounded-full p-2 mr-4 mt-1">
                    <XCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-red-800 mb-1">CERTIFICATE REVOKED</h2>
                    <p className="text-red-700 font-medium mb-6">This certificate has been revoked and is invalid.</p>
                    
                    <div className="bg-white rounded-lg p-5 border border-red-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Certificate Number</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.certificateNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Instrument ID</p>
                          <p className="font-semibold text-gray-900">{searchResult.certificate.instrumentId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Revoked
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {searchResult.status === 'NOT_FOUND' && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-sm text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-red-800 mb-2">Record Not Found</h2>
                <p className="text-red-700">Certificate/Instrument not found in our records.</p>
                <p className="text-gray-600 mt-4 text-sm">Please check the ID and try again, or scan the QR code directly from the certificate.</p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                onClick={() => navigate('/report-issue')}
              >
                Report an Issue with an Instrument
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>e-Maap Verification System - Public Portal</p>
          <p className="mt-1">&copy; 2026 Weights & Measures Authority.</p>
        </div>
      </footer>

      {/* QR Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <QrCode className="h-5 w-5 mr-2" /> Scan QR Code
              </h3>
              <button 
                onClick={() => setIsScanning(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
                <Camera className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center px-4">
                  Camera feed simulation.<br/>Enter the data from QR manually below.
                </p>
                
                {/* Scanner animation line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Simulated QR Scanner — Paste or enter scanned data
                </label>
                <input
                  type="text"
                  value={scanData}
                  onChange={(e) => setScanData(e.target.value)}
                  placeholder="e.g. CERT-2026-0001"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                onClick={handleScanSubmit}
                disabled={!scanData.trim()}
                className="w-full btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simulate Scan Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicVerify;
