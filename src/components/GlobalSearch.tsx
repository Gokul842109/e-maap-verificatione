import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import StatusBadge from './ui/StatusBadge';
import { formatDate } from '../utils/formatters';

export default function GlobalSearch() {
  const { state } = useStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const q = query.toLowerCase().trim();
  const results = q.length < 2 ? [] : state.instruments.filter(i =>
    i.instrumentId.toLowerCase().includes(q) ||
    i.serialNumber.toLowerCase().includes(q) ||
    i.businessName.toLowerCase().includes(q) ||
    (i.certificateId && state.certificates.find(c => c.id === i.certificateId)?.certificateNumber.toLowerCase().includes(q))
  ).slice(0, 8);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search instruments, certificates..."
          className="bg-transparent outline-none text-sm w-full"
          value={query}
          onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
        />
        {query && <X size={14} className="text-gray-400 cursor-pointer" onClick={() => { setQuery(''); setIsOpen(false); }} />}
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {results.map(inst => (
            <button key={inst.id} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
              onClick={() => { navigate(`/instrument/${inst.id}`); setIsOpen(false); setQuery(''); }}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-gov-blue">{inst.instrumentId}</span>
                <StatusBadge status={inst.status} />
              </div>
              <div className="text-xs text-gray-500 mt-1">{inst.businessName} · {inst.serialNumber}</div>
              {inst.verificationDate && <div className="text-xs text-gray-400 mt-0.5">Last verified: {formatDate(inst.verificationDate)}</div>}
            </button>
          ))}
        </div>
      )}
      {isOpen && q.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 left-0 w-80 bg-white rounded-xl shadow-lg border p-4 z-50 text-center text-sm text-gray-500">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
