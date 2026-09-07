import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff, Lock, User, LogIn } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockUsers } from '../data/mockData';

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'business' | 'inspector' | 'authority'>('business');
  const [email, setEmail] = useState('business@demo.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { dispatch, addToast, state } = useStore();

  const handleRoleChange = (newRole: 'business' | 'inspector' | 'authority') => {
    setRole(newRole);
    if (newRole === 'business') setEmail('business@demo.com');
    if (newRole === 'inspector') setEmail('inspector@demo.com');
    if (newRole === 'authority') setEmail('admin@demo.com');
    setPassword('demo123');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedEmail = email.trim().toLowerCase();
    
    // Find user in store state or fallback to mockData
    let user = state.users?.find(u => u.email.toLowerCase() === normalizedEmail) 
            || mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    
    // If not found by email, fallback to default user for the selected role
    if (!user) {
      if (role === 'business') user = mockUsers[0];
      else if (role === 'inspector') user = mockUsers[3];
      else if (role === 'authority') user = mockUsers[5];
    }
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      addToast(`Welcome, ${user.name}!`, 'success');
      
      if (user.role === 'business') navigate('/business/dashboard');
      else if (user.role === 'inspector') navigate('/inspector/dashboard');
      else if (user.role === 'authority') navigate('/authority/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto bg-[#1e3a5f] h-16 w-16 rounded-full flex items-center justify-center shadow-lg mb-4 cursor-pointer" onClick={() => navigate('/')}>
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            e-Maap Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your portal
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          {/* 3 Role Tabs at the top */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => handleRoleChange('business')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                role === 'business' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/30 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Business Owner
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('inspector')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                role === 'inspector' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/30 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Inspector
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('authority')}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                role === 'authority' 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/30 font-semibold' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Authority
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Forgot password?
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#2a4d7c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">Demo Credentials:</p>
              <ul className="space-y-1">
                <li><span className="font-medium">Business:</span> business@demo.com / demo123</li>
                <li><span className="font-medium">Inspector:</span> inspector@demo.com / demo123</li>
                <li><span className="font-medium">Authority:</span> admin@demo.com / demo123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
