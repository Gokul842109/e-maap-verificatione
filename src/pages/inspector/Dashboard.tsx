import React from 'react';
import { useStore } from '../../store/useStore';
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ClipboardList, Calendar, CheckCircle, XCircle, RefreshCw, AlertTriangle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatters';

const Dashboard: React.FC = () => {
  const { state } = useStore();
  const { currentUser, verificationRequests, inspections, instruments, alerts } = state;

  const todayStr = new Date().toISOString().split('T')[0];

  const pendingCount = verificationRequests.filter(vr => vr.inspectorId === currentUser?.id && !['COMPLETED', 'FAILED'].includes(vr.status)).length;
  const todayCount = verificationRequests.filter(vr => vr.scheduledDate?.startsWith(todayStr)).length;
  const passedCount = inspections.filter(insp => insp.result === 'PASS').length;
  const failedCount = inspections.filter(insp => insp.result === 'FAIL').length;
  const reInspectionCount = verificationRequests.filter(vr => vr.isReInspection).length;
  const highRiskCount = instruments.filter(inst => inst.riskScore > 60).length;

  const priorityAlerts = alerts?.filter(a => a.severity === 'HIGH').slice(0, 3) || [];

  const areaData = [
    { name: 'Jan', count: 12 }, { name: 'Feb', count: 18 }, { name: 'Mar', count: 15 },
    { name: 'Apr', count: 22 }, { name: 'May', count: 19 }, { name: 'Jun', count: 25 },
    { name: 'Jul', count: 28 }, { name: 'Aug', count: 31 }, { name: 'Sep', count: 8 }
  ];

  const pieData = [
    { name: 'Pass', value: 85, color: '#16a34a' },
    { name: 'Fail', value: 15, color: '#dc2626' }
  ];

  const barData = [
    { name: 'Electronic', count: 45 },
    { name: 'Mechanical', count: 20 },
    { name: 'Platform', count: 12 },
    { name: 'Fuel Disp.', count: 8 },
    { name: 'Tape', count: 5 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full text-blue-600"><ClipboardList size={24} /></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Inspections</p>
              <p className="text-2xl font-semibold text-gray-900">{todayCount}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600"><Calendar size={24} /></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Passed</p>
              <p className="text-2xl font-semibold text-gray-900">{passedCount}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full text-green-600"><CheckCircle size={24} /></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Failed</p>
              <p className="text-2xl font-semibold text-gray-900">{failedCount}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full text-red-600"><XCircle size={24} /></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Re-inspections</p>
              <p className="text-2xl font-semibold text-gray-900">{reInspectionCount}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-full text-amber-600"><RefreshCw size={24} /></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">High Risk</p>
              <p className="text-2xl font-semibold text-gray-900">{highRiskCount}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full text-orange-600"><AlertTriangle size={24} /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Verification Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#1e3a5f" fill="#1e3a5f" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pass vs Fail (YTD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Instrument Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1e3a5f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="text-red-600 mr-2" size={20} /> Priority Alerts
          </h3>
          <div className="space-y-4">
            {priorityAlerts.length > 0 ? (
              priorityAlerts.map(alert => (
                <div key={alert.id} className="p-3 border border-red-200 bg-red-50 rounded-md">
                  <div className="flex items-start">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-red-600 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-600">ID: {alert.instrumentId}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDateTime(alert.timestamp)}</p>
                    </div>
                    <Link to={`/inspector/alerts`} className="text-blue-600 hover:text-blue-800">
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No priority alerts at this time.</p>
            )}
            {priorityAlerts.length > 0 && (
              <Link to="/inspector/alerts" className="block text-center text-sm text-blue-600 font-medium hover:underline mt-2">
                View All Alerts
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
