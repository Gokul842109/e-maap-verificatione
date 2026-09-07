import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/formatters';

export default function Toast() {
  const { state, dispatch } = useStore();

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id } as any);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {state.toasts && state.toasts.map((toast: any) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 p-4 rounded-lg shadow-lg border w-80 transform transition-all duration-300 translate-y-0",
            toast.type === 'success' && "bg-green-50 border-green-200 text-green-800",
            toast.type === 'error' && "bg-red-50 border-red-200 text-red-800",
            toast.type === 'warning' && "bg-amber-50 border-amber-200 text-amber-800",
            toast.type === 'info' && "bg-blue-50 border-blue-200 text-blue-800"
          )}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle size={18} className="text-green-500" />}
            {toast.type === 'error' && <XCircle size={18} className="text-red-500" />}
            {toast.type === 'warning' && <AlertTriangle size={18} className="text-amber-500" />}
            {toast.type === 'info' && <Info size={18} className="text-blue-500" />}
          </div>
          <div className="flex-1 text-sm font-medium">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
