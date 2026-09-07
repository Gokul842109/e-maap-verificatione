import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PublicVerify from './pages/PublicVerify';
import InstrumentIntegrity from './pages/InstrumentIntegrity';
import CertificatePage from './pages/CertificatePage';
import DemoMode from './pages/DemoMode';

// Business Pages
import BusinessDashboard from './pages/business/Dashboard';
import MyInstruments from './pages/business/MyInstruments';
import RegisterInstrument from './pages/business/RegisterInstrument';
import VerificationRequests from './pages/business/VerificationRequests';
import BusinessCertificates from './pages/business/Certificates';
import ReportIssue from './pages/business/ReportIssue';

// Inspector Pages
import InspectorDashboard from './pages/inspector/Dashboard';
import InspectorRequests from './pages/inspector/Requests';
import InspectionModule from './pages/inspector/InspectionModule';
import InspectionHistory from './pages/inspector/InspectionHistory';
import TodayInspections from './pages/inspector/TodayInspections';
import InspectorAlerts from './pages/inspector/InspectorAlerts';

// Authority Pages
import AuthorityDashboard from './pages/authority/Dashboard';
import AllInstruments from './pages/authority/AllInstruments';
import AlertCenter from './pages/authority/AlertCenter';
import AuthorityComplaints from './pages/authority/Complaints';
import ReInspection from './pages/authority/ReInspection';
import AuditLog from './pages/authority/AuditLog';
import RiskAnalysis from './pages/authority/RiskAnalysis';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { state } = useStore();
  if (!state.currentUser) return <Navigate to='/login' replace />;
  if (!allowedRoles.includes(state.currentUser.role)) return <Navigate to='/login' replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path='/' element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path='/login' element={<PublicLayout><LoginPage /></PublicLayout>} />
      <Route path='/verify' element={<PublicLayout><PublicVerify /></PublicLayout>} />
      <Route path='/instrument/:id' element={<PublicLayout><InstrumentIntegrity /></PublicLayout>} />
      <Route path='/certificate/:id' element={<CertificatePage />} />
      <Route path='/demo' element={<DemoMode />} />
      
      {/* Business */}
      <Route path='/business/dashboard' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><BusinessDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path='/business/instruments' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><MyInstruments /></DashboardLayout></ProtectedRoute>} />
      <Route path='/business/register' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><RegisterInstrument /></DashboardLayout></ProtectedRoute>} />
      <Route path='/business/requests' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><VerificationRequests /></DashboardLayout></ProtectedRoute>} />
      <Route path='/business/certificates' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><BusinessCertificates /></DashboardLayout></ProtectedRoute>} />
      <Route path='/business/report' element={<ProtectedRoute allowedRoles={['business']}><DashboardLayout><ReportIssue /></DashboardLayout></ProtectedRoute>} />
      
      {/* Inspector */}
      <Route path='/inspector/dashboard' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><InspectorDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path='/inspector/requests' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><InspectorRequests /></DashboardLayout></ProtectedRoute>} />
      <Route path='/inspector/inspection/:id' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><InspectionModule /></DashboardLayout></ProtectedRoute>} />
      <Route path='/inspector/history' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><InspectionHistory /></DashboardLayout></ProtectedRoute>} />
      <Route path='/inspector/today' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><TodayInspections /></DashboardLayout></ProtectedRoute>} />
      <Route path='/inspector/alerts' element={<ProtectedRoute allowedRoles={['inspector']}><DashboardLayout><InspectorAlerts /></DashboardLayout></ProtectedRoute>} />
      
      {/* Authority */}
      <Route path='/authority/dashboard' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><AuthorityDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/instruments' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><AllInstruments /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/alerts' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><AlertCenter /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/complaints' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><AuthorityComplaints /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/reinspection' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><ReInspection /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/audit' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><AuditLog /></DashboardLayout></ProtectedRoute>} />
      <Route path='/authority/risk' element={<ProtectedRoute allowedRoles={['authority']}><DashboardLayout><RiskAnalysis /></DashboardLayout></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path='*' element={<div className='flex items-center justify-center min-h-screen'><div className='text-center'><h1 className='text-4xl font-bold text-gray-400'>404</h1><p className='text-gray-500 mt-2'>Page not found</p><a href='/' className='btn-primary mt-4 inline-block'>Go Home</a></div></div>} />
    </Routes>
  );
}
