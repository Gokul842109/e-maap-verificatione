import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-[#1e3a5f] p-1.5 rounded-lg group-hover:bg-[#2a4d7a] transition-colors">
                  <Scale size={24} className="text-white" />
                </div>
                <span className="font-bold text-xl text-[#1e3a5f] hidden sm:block">e-Maap Verification</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm font-medium hover:text-[#1e3a5f] transition-colors ${isActive('/') ? 'text-[#1e3a5f]' : 'text-gray-600'}`}>Home</Link>
              <a href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#1e3a5f] transition-colors">How It Works</a>
              <Link to="/verify" className={`text-sm font-medium hover:text-[#1e3a5f] transition-colors ${isActive('/verify') ? 'text-[#1e3a5f]' : 'text-gray-600'}`}>Verify Certificate</Link>
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
              <Link to="/login" className="text-sm font-medium text-[#1e3a5f] hover:text-[#2a4d7a] transition-colors">Login</Link>
              <Link to="/demo" className="btn-secondary !bg-amber-100 !text-amber-800 !border-amber-200 hover:!bg-amber-200">
                SIH Demo Mode
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-2 pt-2 pb-4 space-y-1 shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <a href="/#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <Link to="/verify" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[#1e3a5f] hover:bg-blue-50" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <div className="px-3 pt-2">
              <Link to="/demo" className="block w-full text-center px-4 py-2 border border-amber-200 rounded-md shadow-sm text-base font-medium text-amber-800 bg-amber-100 hover:bg-amber-200" onClick={() => setMobileMenuOpen(false)}>
                SIH Demo Mode
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
