import { useState, useEffect, useCallback } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { AlertSeverity } from '@/types';

interface AlertItem {
  id: string;
  severity: AlertSeverity;
  platform: string;
  title: string;
  description: string;
  metric: string;
  changePct: number;
  isRead: boolean;
  time: string;
}

type FilterType = 'all' | AlertSeverity;

export function Alerts() {
  const [alertList, setAlertList] = useState<AlertItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  const loadAlerts = useCallback(async () => {
    try {
      const data = await api.alerts.list();
      setAlertList(data);
    } catch {
      setAlertList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAlerts(); }, [loadAlerts]);

  const filtered = filter === 'all' ? alertList : alertList.filter((a) => a.severity === filter);
  const criticalCount = alertList.filter((a) => a.severity === 'critical').length;
  const warningCount = alertList.filter((a) => a.severity === 'warning').length;
  const infoCount = alertList.filter((a) => a.severity === 'info').length;
  const unreadCount = alertList.filter((a) => !a.isRead).length;

  const markRead = async (id: string) => {
    setAlertList((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
    try { await api.alerts.markRead(id); } catch { /* optimistic */ }
  };

  const markAllRead = async () => {
    setAlertList((prev) => prev.map((a) => ({ ...a, isRead: true })));
    try { await api.alerts.markAllRead(); } catch { /* optimistic */ }
  };

  const severityConfig = {
    critical: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    warning: { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    info: { icon: Info, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
  };

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading alerts...</div>;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Alerts</h1>
            <p className="text-sm text-slate-500">{unreadCount} unread · {alertList.length} total</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <p className="text-xs font-medium text-red-700">Critical</p>
          </div>
          <p className="text-2xl font-bold text-red-900">{criticalCount}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <p className="text-xs font-medium text-amber-700">Warnings</p>
          </div>
          <p className="text-2xl font-bold text-amber-900">{warningCount}</p>
        </div>
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-4 w-4 text-teal-600" />
            <p className="text-xs font-medium text-teal-700">Info</p>
          </div>
          <p className="text-2xl font-bold text-teal-900">{infoCount}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        {(['all', 'critical', 'warning', 'info'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize',
              filter === f ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              onClick={() => markRead(alert.id)}
              className={cn(
                'rounded-xl border bg-white p-4 cursor-pointer transition-all hover:shadow-sm',
                alert.isRead ? 'border-slate-200' : cn(config.border, 'ring-1', alert.severity === 'critical' ? 'ring-red-100' : alert.severity === 'warning' ? 'ring-amber-100' : 'ring-teal-100')
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg shrink-0', config.bg)}>
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                    {!alert.isRead && <span className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">{alert.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" className="text-[10px]">{alert.platform}</Badge>
                    <Badge variant={alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'warning' : 'info'} className="text-[10px]">
                      {alert.metric} {alert.changePct > 0 ? '+' : ''}{alert.changePct}%
                    </Badge>
                    <span className="text-[11px] text-slate-400">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">No alerts found.</p>
        )}
      </div>
    </div>
  );
}
