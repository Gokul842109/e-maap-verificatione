import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded"></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative z-10 bg-white px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                  ${isCompleted ? 'bg-[#1e3a5f] border-[#1e3a5f] text-white' : 
                    isCurrent ? 'bg-white border-[#1e3a5f] text-[#1e3a5f] shadow-[0_0_0_4px_rgba(30,58,95,0.1)] animate-pulse' : 
                    'bg-white border-gray-300 text-gray-400'}`}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="text-sm font-semibold">{index + 1}</span>}
              </div>
              <span 
                className={`mt-2 text-xs font-medium max-w-[80px] text-center
                  ${isCurrent ? 'text-[#1e3a5f]' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
