import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
}

export default function LoadingSpinner({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="animate-spin text-[#1e3a5f] mb-4" size={40} />
      {message && <p className="text-gray-600 font-medium">{message}</p>}
    </div>
  );
}
