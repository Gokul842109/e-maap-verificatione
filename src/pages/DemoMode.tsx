import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Play, Shield, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function DemoMode() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 15;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Step renderers
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Business Registers Instrument</h2>
            <p className="text-gray-600">A business owner logs in and registers a new weighing scale.</p>
            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-md mx-auto text-left mt-6">
              <h3 className="font-bold border-b pb-2 mb-4">Registration Data</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Type:</span> Electronic Weighing Scale</p>
                <p><span className="text-gray-500">Model:</span> XYZ-500</p>
                <p><span className="text-gray-500">Serial No:</span> <span className="font-mono font-bold bg-gray-100 px-1">ABC12345</span></p>
                <p><span className="text-gray-500">Capacity:</span> 50kg</p>
              </div>
            </div>
          </div>
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Steps 2-10: Standard Workflow</h2>
            <p className="text-gray-600">Request submitted → Inspected → Passed → Fingerprint generated → Certificate Issued.</p>
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 shadow-sm max-w-md mx-auto mt-6">
               <CheckCircle size={48} className="mx-auto mb-4" />
               <h3 className="font-bold text-center">Instrument ACTIVE</h3>
               <div className="mt-4 text-center">
                 <QRCodeSVG value="demo" size={100} className="mx-auto bg-white p-2 border" />
               </div>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-600">11. ⚠️ Instrument Replacement Detected</h2>
            <p className="text-gray-600">A bad actor replaces the certified scale with a non-compliant knockoff.</p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
              <div className="bg-gray-50 p-4 rounded border">
                <p className="font-bold text-gray-700 text-sm">Original Certified (ABC12345)</p>
                <div className="h-32 bg-gray-200 mt-2 flex items-center justify-center border-2 border-green-500">
                  Real Scale
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded border border-red-200 animate-pulse">
                <p className="font-bold text-red-700 text-sm">Replaced Knockoff (XYZ98765)</p>
                <div className="h-32 bg-gray-200 mt-2 flex items-center justify-center border-2 border-red-500">
                  Fake Scale
                </div>
              </div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">12. System Detects Mismatch</h2>
            <p className="text-gray-600">During a routine scan or via IoT sensors, the system compares observed data against the immutable digital fingerprint.</p>
            <div className="bg-white p-6 rounded-xl border shadow-sm max-w-xl mx-auto mt-6">
              <div className="bg-red-100 text-red-800 p-3 rounded font-bold flex items-center justify-center gap-2 mb-6">
                <AlertTriangle /> IDENTITY MISMATCH DETECTED
              </div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-bold text-gray-500 text-xs uppercase mb-2">Expected (Hash match)</h4>
                  <p className="font-mono">Ser: ABC12345</p>
                  <p className="font-mono">Mod: XYZ-500</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-500 text-xs uppercase mb-2">Observed</h4>
                  <p className="font-mono text-red-600 font-bold bg-red-50">Ser: XYZ98765</p>
                  <p className="font-mono text-red-600 font-bold bg-red-50">Mod: ABC-900</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 13:
      case 14:
      case 15:
         return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">End of Workflow</h2>
            <p className="text-gray-600">Alert raised → Re-inspection scheduled → Certificate Revoked.</p>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 max-w-md mx-auto mt-6 text-center">
              <Shield className="mx-auto text-red-600 mb-2" size={48} />
              <h3 className="font-bold text-red-800 text-xl">System Secured</h3>
              <p className="text-sm mt-2 text-red-600">Certificate has been revoked and business penalized.</p>
            </div>
          </div>
        );
      default:
        return <div>Step content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header / Progress */}
      <div className="p-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2"><Play className="text-blue-500" /> SIH Platform Demo Walkthrough</h1>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm">Exit Demo</button>
        </div>
        <div className="max-w-4xl mx-auto mt-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep/totalSteps)*100)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden flex">
            {Array.from({length: totalSteps}).map((_, i) => (
              <div key={i} className={`h-full flex-1 border-r border-gray-900 last:border-0 ${i < currentStep ? 'bg-blue-500' : 'bg-gray-800'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="w-full max-w-3xl">
           <span className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
             Step {currentStep}
           </span>
           {renderStepContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-800 bg-gray-950">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded font-bold transition-colors ${currentStep === 1 ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            <ArrowLeft size={18} /> Previous
          </button>
          
          <button 
            onClick={currentStep === totalSteps ? () => navigate('/') : nextStep} 
            className="flex items-center gap-2 px-6 py-3 rounded font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            {currentStep === totalSteps ? 'Finish Demo' : 'Next Step'} <ArrowRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
