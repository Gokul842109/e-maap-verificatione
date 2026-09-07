import React from 'react';

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  onClick?: () => void;
}

const StatCard: React.FC<Props> = ({ title, value, icon, trend, trendUp, color, onClick }) => {
  return (
    <div 
      className={`stat-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">{trend}</span>
              <span className="ml-2 text-gray-500 text-xs">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color || 'bg-blue-50 text-blue-600'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
