import React, { useState, useRef, useEffect } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/formatters';

export default function NotificationCenter() {
  const { state, dispatch } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentUser = state.currentUser;
  
  const notifications = (state as any).notifications?.filter((n: any) => !n.userId || n.userId === currentUser?.id) || [];
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id } as any);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ALERT': return <AlertTriangle size={16} className="text-red-500" />;
      case 'SUCCESS': return <CheckCircle size={16} className="text-green-500" />;
      case 'WARNING': return <AlertTriangle size={16} className="text-amber-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{unreadCount} unread</span>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notif: any) => (
                  <Link 
                    key={notif.id}
                    to={notif.link || '#'}
                    onClick={() => { markAsRead(notif.id); setIsOpen(false); }}
                    className={`block p-3 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 mt-0.5">
                        {getIcon(notif.type)}
                      </div>
                      <div>
                        <p className={`text-sm ${!notif.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {formatDateTime(notif.createdAt)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                No notifications right now.
              </div>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-2 border-t border-gray-100 text-center">
              <button 
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
                onClick={() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' } as any)}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
