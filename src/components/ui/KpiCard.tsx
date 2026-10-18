import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  icon?: React.ReactNode;
  positive?: boolean;
}

export function KpiCard({ label, value, change, icon, positive = true }: KpiCardProps) {
  const isPositive = positive ? change >= 0 : change <= 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        <div
          className={cn(
            'flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-md',
            isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
          )}
        >
          <Icon className="h-3 w-3" />
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
