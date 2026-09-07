// ============================================================
// Formatters — dates, IDs, numbers
// ============================================================

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateId(prefix: string = ''): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
  return prefix ? `${prefix}-${year}-${seq}` : `${year}-${seq}`;
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function daysAgo(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - target.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(dateStr: string, daysThreshold: number = 30): boolean {
  const d = daysUntil(dateStr);
  return d > 0 && d <= daysThreshold;
}

export function isExpired(dateStr: string): boolean {
  return daysUntil(dateStr) <= 0;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
    case 'PASS':
    case 'COMPLETED':
    case 'RESOLVED':
      return 'bg-green-100 text-green-800';
    case 'EXPIRED':
    case 'REVOKED':
    case 'FAIL':
    case 'FAILED':
      return 'bg-red-100 text-red-800';
    case 'PENDING_VERIFICATION':
    case 'SUBMITTED':
    case 'UNDER_REVIEW':
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'EXPIRING_SOON':
      return 'bg-amber-100 text-amber-800';
    case 'SUSPENDED':
    case 'RE_INSPECTION_REQUIRED':
    case 'INVESTIGATING':
      return 'bg-orange-100 text-orange-800';
    case 'ACKNOWLEDGED':
    case 'ASSIGNED':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusLabel(status: string): string {
  return status.replace(/_/g, ' ');
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
