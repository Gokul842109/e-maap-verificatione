import { Check } from 'lucide-react';
import type { TimelineStep } from '../../types';
import { formatDate } from '../../utils/formatters';

interface Props {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: Props) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
      {steps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <div key={index} className="relative flex items-start gap-3 pb-6 last:pb-0">
            <div
              className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shrink-0 -ml-5
                ${isCompleted ? 'bg-green-500 text-white' :
                  isCurrent ? 'bg-gov-blue text-white animate-pulse' :
                  'bg-gray-200 text-gray-400'}`}
            >
              {isCompleted && <Check size={12} strokeWidth={3} />}
              {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium text-sm ${isCurrent ? 'text-gov-blue' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </h4>
                {step.date && (
                  <span className="text-xs text-gray-400 ml-2">{formatDate(step.date)}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
