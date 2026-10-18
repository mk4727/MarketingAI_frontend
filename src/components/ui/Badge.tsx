import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'critical' | 'info' | 'neutral' | 'blue';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  critical: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-teal-50 text-teal-700 border-teal-200',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  blue: 'bg-teal-50 text-teal-700 border-teal-200',
};

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
