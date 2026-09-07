import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Scale, Menu, LayoutDashboard, PlusCircle, ClipboardList, 
  Award, AlertTriangle, Calendar, History, Bell, MessageSquare, 
  RefreshCw, FileText, Shield, LogOut 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import GlobalSearch from '../components/GlobalSearch';
import NotificationCenter from '../components/NotificationCenter';
import Toast from '../components/ui/Toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = state.currentUser;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null } as any);
    navigate('/');
  };

  const roleNavLinks = {
    BUSINESS: [
      { to: '/business/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { to: '/business/instruments', icon: <Scale size={20} />, label: 'My Instruments' },
      { to: '/business/register', icon: <PlusCircle size={20} />, label: 'Register Instrument' },
      { to: '/business/requests', icon: <ClipboardList size={20} />, label: 'Verification Requests' },
      { to: '/business/certificates', icon: <Award size={20} />, label: 'Certificates' },
      { to: '/business/report', icon: <AlertTriangle size={20} />, label: 'Report Issue' },
    ],
    INSPECTOR: [
      { to: '/inspector/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { to: '/inspector/requests', icon: <ClipboardList size={20} />, label: 'Verification Requests' },
      { to: '/inspector/today', icon: <Calendar size={20} />, label: "Today's Inspections" },
      { to: '/inspector/history', icon: <History size={20} />, label: 'Inspection History' },
      { to: '/inspector/alerts', icon: <Bell size={20} />, label: 'Alerts' },
    ],
    AUTHORITY: [
      { to: '/authority/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { to: '/authority/instruments', icon: <Scale size={20} />, label: 'All Instruments' },
      { to: '/authority/alerts', icon: <AlertTriangle size={20} />, label: 'Alert Center' },
      { to: '/authority/complaints', icon: <MessageSquare size={20} />, label: 'Complaints' },
      { to: '/authority/reinspection', icon: <RefreshCw size={20} />, label: 'Re-inspection' },
      { to: '/authority/audit', icon: <FileText size={20} />, label: 'Audit Log' },
      { to: '/authority/risk', icon: <Shield size={20} />, label: 'Risk Analysis' },
    ]
  };

  const roleKey = currentUser.role.toUpperCase() as keyof typeof roleNavLinks;
  const navLinks = roleNavLinks[roleKey] || [];
  
  const getPageTitle = () => {
    const link = navLinks.find((l: { to: string; label: string }) => location.pathname.startsWith(l.to));
    return link ? link.label : 'Dashboard';
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#1e3a5f] p-1.5 rounded-lg">
              <Scale size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg text-[#1e3a5f]">e-Maap</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              dispatch({ type: 'RESET_DATA' } as any);
              window.location.reload();
            }}
            className="w-full text-xs py-2 px-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Reset Demo Data
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden sm:flex items-center text-sm">
              <span className="text-gray-500 capitalize">{currentUser.role.toLowerCase()}</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="font-medium text-gray-900">{getPageTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <div className="hidden md:block flex-1 max-w-md ml-4">
              <GlobalSearch />
            </div>
            <NotificationCenter />
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <div className="md:hidden p-4 bg-white border-b border-gray-200 shrink-0">
          <GlobalSearch />
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <Toast />
    </div>
  );
}
