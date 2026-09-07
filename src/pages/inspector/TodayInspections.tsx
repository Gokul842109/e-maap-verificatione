import React from 'react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { Calendar, Play, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const TodayInspections: React.FC = () => {
  const { state } = useStore();
  
  const todayStr = new Date().toISOString().split('T')[0];
  
  const todayRequests = state.verificationRequests.filter(
    vr => vr.inspectorId === state.currentUser?.id && 
          vr.scheduledDate?.startsWith(todayStr) && 
          ['PENDING', 'SCHEDULED'].includes(vr.status)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Today's Inspections</h1>
      
      {todayRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayRequests.map(vr => {
            const inst = state.instruments.find(i => i.id === vr.instrumentId);
            const biz = state.businesses?.find(b => b.id === inst?.businessId);
            
            return (
              <div key={vr.id} className="card flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      vr.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 
                      vr.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {vr.priority}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {vr.scheduledDate?.split('T')[1]?.substring(0, 5) || 'Any time'}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{biz?.name || 'Unknown Business'}</h3>
                  <div className="flex items-start text-sm text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                    <p>{biz?.address || 'No address provided'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md mb-4 text-sm">
                    <p><span className="font-medium">Instrument:</span> {inst?.type}</p>
                    <p><span className="font-medium">ID:</span> {inst?.id}</p>
                    {vr.isReInspection && (
                      <p className="text-amber-600 font-medium mt-1">Re-inspection</p>
                    )}
                  </div>
                </div>
                
                <Link to={`/inspector/inspection/${vr.id}`} className="btn-primary w-full justify-center flex items-center">
                  <Play size={16} className="mr-2" /> Start Inspection
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-16 flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4 text-gray-400">
            <Calendar size={48} />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No inspections scheduled for today</h2>
          <p className="text-gray-500">You're all caught up! Enjoy your day or check the pending requests tab.</p>
          <Link to="/inspector/requests" className="mt-6 text-blue-600 font-medium hover:underline">
            View all requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default TodayInspections;
