// ============================================================
// Application Store — React Context + useReducer + LocalStorage
// ============================================================

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { AppState, AppAction, Toast, User } from '../types';
import {
  mockUsers, mockBusinesses, mockInstruments, mockVerificationRequests,
  mockInspections, mockCertificates, mockComplaints, mockAlerts,
  mockAuditLogs, mockNotifications
} from '../data/mockData';

const STORAGE_KEY = 'emaap-verification-state';

function getInitialState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, toasts: [] };
    }
  } catch {
    // ignore
  }
  return {
    currentUser: null,
    users: mockUsers,
    businesses: mockBusinesses,
    instruments: mockInstruments,
    verificationRequests: mockVerificationRequests,
    inspections: mockInspections,
    certificates: mockCertificates,
    complaints: mockComplaints,
    alerts: mockAlerts,
    auditLogs: mockAuditLogs,
    notifications: mockNotifications,
    toasts: [],
    demoStep: 0,
    demoActive: false,
  };
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };

    case 'ADD_INSTRUMENT':
      return { ...state, instruments: [...state.instruments, action.payload] };
    case 'UPDATE_INSTRUMENT':
      return {
        ...state,
        instruments: state.instruments.map(i =>
          i.id === action.payload.id ? { ...i, ...action.payload.updates } : i
        ),
      };

    case 'ADD_VERIFICATION_REQUEST':
      return { ...state, verificationRequests: [...state.verificationRequests, action.payload] };
    case 'UPDATE_VERIFICATION_REQUEST':
      return {
        ...state,
        verificationRequests: state.verificationRequests.map(vr =>
          vr.id === action.payload.id ? { ...vr, ...action.payload.updates } : vr
        ),
      };

    case 'ADD_INSPECTION':
      return { ...state, inspections: [...state.inspections, action.payload] };
    case 'UPDATE_INSPECTION':
      return {
        ...state,
        inspections: state.inspections.map(ins =>
          ins.id === action.payload.id ? { ...ins, ...action.payload.updates } : ins
        ),
      };

    case 'ADD_CERTIFICATE':
      return { ...state, certificates: [...state.certificates, action.payload] };
    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };

    case 'ADD_COMPLAINT':
      return { ...state, complaints: [...state.complaints, action.payload] };
    case 'UPDATE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };

    case 'ADD_ALERT':
      return { ...state, alerts: [...state.alerts, action.payload] };
    case 'UPDATE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map(a =>
          a.id === action.payload.id ? { ...a, ...action.payload.updates } : a
        ),
      };

    case 'ADD_AUDIT_LOG':
      return { ...state, auditLogs: [action.payload, ...state.auditLogs] };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    case 'SET_DEMO_STEP':
      return { ...state, demoStep: action.payload };
    case 'SET_DEMO_ACTIVE':
      return { ...state, demoActive: action.payload };

    case 'RESET_DATA':
      localStorage.removeItem(STORAGE_KEY);
      return {
        currentUser: null,
        users: mockUsers,
        businesses: mockBusinesses,
        instruments: mockInstruments,
        verificationRequests: mockVerificationRequests,
        inspections: mockInspections,
        certificates: mockCertificates,
        complaints: mockComplaints,
        alerts: mockAlerts,
        auditLogs: mockAuditLogs,
        notifications: mockNotifications,
        toasts: [],
        demoStep: 0,
        demoActive: false,
      };

    default:
      return state;
  }
}

interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToast: (message: string, type: Toast['type']) => void;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  // Persist to LocalStorage on every state change (except toasts)
  useEffect(() => {
    const { toasts, ...persistable } = state;
    void toasts;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = `toast-${Date.now()}`;
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, 4000);
  }, []);

  const login = useCallback((email: string, password: string): User | null => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    }
    return null;
  }, [state.users]);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  return React.createElement(
    StoreContext.Provider,
    { value: { state, dispatch, addToast, login, logout } },
    children
  );
}

export function useStore(): StoreContextType {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
