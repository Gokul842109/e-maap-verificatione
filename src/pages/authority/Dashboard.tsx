import { useStore } from '../../store/useStore';
import { Scale, CheckCircle, Clock, XCircle, AlertTriangle, MessageSquare, RefreshCw } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatDateTime } from '../../utils/formatters';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trendData = [{name:'Jan',count:45},{name:'Feb',count:52},{name:'Mar',count:48},{name:'Apr',count:61},{name:'May',count:55},{name:'Jun',count:72},{name:'Jul',count:78},{name:'Aug',count:85},{name:'Sep',count:28}];
const passFail = [{name:'Pass',value:85,color:'#16a34a'},{name:'Fail',value:15,color:'#dc2626'}];
const districtData = [{name:'Kopargaon',value:15},{name:'Pune',value:22},{name:'Nashik',value:18},{name:'Ahmednagar',value:12},{name:'Solapur',value:8},{name:'Sangli',value:10},{name:'Satara',value:7},{name:'Kolhapur',value:14},{name:'Aurangabad',value:11},{name:'Latur',value:9}];
const categoryData = [{name:'Electronic Scale',value:45,color:'#1e3a5f'},{name:'Mechanical Scale',value:20,color:'#2563eb'},{name:'Platform Scale',value:15,color:'#7c3aed'},{name:'Fuel Dispenser',value:12,color:'#f59e0b'},{name:'Measuring Tape',value:8,color:'#10b981'}];
const complaintsData = [{name:'Jan',count:8},{name:'Feb',count:12},{name:'Mar',count:10},{name:'Apr',count:15},{name:'May',count:11},{name:'Jun',count:18},{name:'Jul',count:14},{name:'Aug',count:20},{name:'Sep',count:9}];

export default function AuthorityDashboard() {
  const { state } = useStore();

  const activeCount = state.instruments.filter(i => i.status === 'ACTIVE').length;
  const pendingCount = state.instruments.filter(i => i.status === 'PENDING_VERIFICATION').length;
  const expiredCount = state.instruments.filter(i => i.status === 'EXPIRED').length;
  const mismatchCount = state.alerts.filter(a => a.type === 'IDENTITY_MISMATCH').length;
  const reInspectionCount = state.verificationRequests.filter(vr => vr.isReInspection).length;

  const recentAlerts = [...state.alerts].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Authority Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard title="Total Instruments" value={state.instruments.length} icon={<Scale size={20} className="text-gov-blue" />} />
        <StatCard title="Active Verified" value={activeCount} icon={<CheckCircle size={20} className="text-green-600" />} />
        <StatCard title="Pending" value={pendingCount} icon={<Clock size={20} className="text-amber-500" />} />
        <StatCard title="Expired" value={expiredCount} icon={<XCircle size={20} className="text-red-500" />} />
        <StatCard title="Mismatch Alerts" value={mismatchCount} icon={<AlertTriangle size={20} className="text-red-600" />} />
        <StatCard title="Complaints" value={state.complaints.length} icon={<MessageSquare size={20} className="text-purple-600" />} />
        <StatCard title="Re-inspections" value={reInspectionCount} icon={<RefreshCw size={20} className="text-blue-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card"><h3 className="font-semibold mb-4">Verification Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="count" stroke="#1e3a5f" strokeWidth={2} /></LineChart>
          </ResponsiveContainer></div>
        <div className="card"><h3 className="font-semibold mb-4">Pass vs Fail</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={passFail} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,value})=>`${name}: ${value}%`}>{passFail.map((e,i)=><Cell key={i} fill={e.color} />)}</Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer></div>
        <div className="card"><h3 className="font-semibold mb-4">District-wise Instruments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize:10}} /><YAxis /><Tooltip /><Bar dataKey="value" fill="#1e3a5f" radius={[4,4,0,0]} /></BarChart>
          </ResponsiveContainer></div>
        <div className="card"><h3 className="font-semibold mb-4">Instrument Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,value})=>`${name}: ${value}%`}>{categoryData.map((e,i)=><Cell key={i} fill={e.color} />)}</Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer></div>
        <div className="card lg:col-span-2"><h3 className="font-semibold mb-4">Complaints Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={complaintsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="count" fill="#7c3aed" fillOpacity={0.2} stroke="#7c3aed" /></AreaChart>
          </ResponsiveContainer></div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${alert.severity === 'HIGH' ? 'bg-red-500' : alert.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.instrumentId} · {alert.businessName}</p>
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={alert.status} />
                <p className="text-xs text-gray-400 mt-1">{formatDateTime(alert.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
