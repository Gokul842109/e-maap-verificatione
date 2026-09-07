import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Fingerprint, 
  QrCode, 
  Shield, 
  ClipboardList, 
  Search, 
  Award, 
  Eye, 
  RefreshCw, 
  ShieldAlert, 
  BarChart3, 
  FileText 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4d7c] py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Digital Verification.<br className="hidden sm:block" /> Continuous Trust.
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Verify, identify and monitor weighing and measuring instruments throughout their lifecycle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Apply for Verification
            </button>
            <button 
              onClick={() => navigate('/verify')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg px-8 py-4 w-full sm:w-auto transition-colors"
            >
              Verify Certificate
            </button>
          </div>

          <div className="mt-16 flex justify-center items-center space-x-4 sm:space-x-8 text-white/80">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-2">
                <Scale className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">Scale</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-white/30 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-2">
                <Fingerprint className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">Fingerprint</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-white/30 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-2">
                <QrCode className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">QR Code</span>
            </div>
            <div className="h-0.5 w-8 sm:w-16 bg-white/30 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-2">
                <Shield className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium">Shield</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-white border-b border-gray-200 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="text-center px-4">
              <ClipboardList className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">12,450+</div>
              <div className="text-sm text-gray-500 font-medium">Registered Instruments</div>
            </div>
            <div className="text-center px-4">
              <Award className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">9,820</div>
              <div className="text-sm text-gray-500 font-medium">Active Verified</div>
            </div>
            <div className="text-center px-4">
              <Eye className="h-8 w-8 mx-auto text-amber-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">430</div>
              <div className="text-sm text-gray-500 font-medium">Expiring Soon</div>
            </div>
            <div className="text-center px-4">
              <ShieldAlert className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">34</div>
              <div className="text-sm text-gray-500 font-medium">Mismatch Alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive lifecycle approach to verifying and monitoring measuring instruments.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 border-t-2 border-dashed border-gray-300 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 flex flex-col items-center md:h-full relative">
                <div className="bg-blue-100 text-[#1e3a5f] w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative md:-mt-10 md:bg-[#1e3a5f] md:text-white">
                  1
                </div>
                <ClipboardList className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Register</h3>
                <p className="text-sm text-gray-600">
                  Business registers instrument details and submits verification request
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 flex flex-col items-center md:h-full relative md:mt-8">
                <div className="bg-blue-100 text-[#1e3a5f] w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative md:-mt-10 md:bg-[#1e3a5f] md:text-white">
                  2
                </div>
                <Search className="h-8 w-8 text-indigo-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Inspect</h3>
                <p className="text-sm text-gray-600">
                  Authorized inspector conducts physical verification and records measurements
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 flex flex-col items-center md:h-full relative">
                <div className="bg-blue-100 text-[#1e3a5f] w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative md:-mt-10 md:bg-[#1e3a5f] md:text-white">
                  3
                </div>
                <Award className="h-8 w-8 text-green-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Digitally Certify</h3>
                <p className="text-sm text-gray-600">
                  System generates unique digital identity, fingerprint, and certificate with QR code
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 flex flex-col items-center md:h-full relative md:mt-8">
                <div className="bg-blue-100 text-[#1e3a5f] w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative md:-mt-10 md:bg-[#1e3a5f] md:text-white">
                  4
                </div>
                <Eye className="h-8 w-8 text-amber-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Monitor</h3>
                <p className="text-sm text-gray-600">
                  Continuous monitoring detects anomalies and identity mismatches
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 flex flex-col items-center md:h-full relative">
                <div className="bg-blue-100 text-[#1e3a5f] w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative md:-mt-10 md:bg-[#1e3a5f] md:text-white">
                  5
                </div>
                <RefreshCw className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Re-inspect</h3>
                <p className="text-sm text-gray-600">
                  Authority triggers re-inspection and can revoke certificates if violations found
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by advanced technologies for robust verification and fraud prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                <Fingerprint className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Fingerprinting</h3>
              <p className="text-gray-600">Generates unique, immutable fingerprints for each instrument combining hardware identifiers and inspector credentials.</p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-green-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors duration-200">
                <QrCode className="h-6 w-6 text-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Verification</h3>
              <p className="text-gray-600">Scannable QR codes allow instant public verification of certificate authenticity and instrument status.</p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-red-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors duration-200">
                <ShieldAlert className="h-6 w-6 text-red-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Identity Mismatch Detection</h3>
              <p className="text-gray-600">Automatically detects when physical instrument characteristics do not match the registered digital identity.</p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-amber-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                <Eye className="h-6 w-6 text-amber-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Monitoring</h3>
              <p className="text-gray-600">Ongoing risk assessment and monitoring to identify potentially fraudulent activities or uncalibrated instruments.</p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-purple-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-200">
                <BarChart3 className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Risk-Based Analytics</h3>
              <p className="text-gray-600">Calculates risk scores based on historical accuracy, complaints, and mismatch probabilities to target inspections.</p>
            </div>

            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="bg-teal-100 p-3 rounded-lg inline-block mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-200">
                <FileText className="h-6 w-6 text-teal-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Audit Trail</h3>
              <p className="text-gray-600">Maintains a secure, immutable history of all verification activities, edits, and status changes over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12 border-t border-[#2a4d7c] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Scale className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">e-Maap Verification System</span>
            </div>
            <p className="text-blue-200 text-sm">
              A prototype solution for Smart India Hackathon 2026
            </p>
          </div>
          <div className="text-blue-200 text-sm">
            <p>&copy; 2026 Weights & Measures Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
