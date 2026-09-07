import React from 'react';
import { getStatusColor, getStatusLabel } from '../../utils/formatters';

interface Props {
  status: string;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);
  
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  
  return (
    <span className={`inline-flex items-center justify-center font-medium rounded-full ${sizeClasses} ${colorClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
