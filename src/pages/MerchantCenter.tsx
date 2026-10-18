import { Package, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { merchantIssues } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function MerchantCenter() {
  const totalIssues = merchantIssues.reduce((s, i) => s + i.count, 0);
  const criticalCount = merchantIssues.filter((i) => i.severity === 'critical').reduce((s, i) => s + i.count, 0);
  const warningCount = merchantIssues.filter((i) => i.severity === 'warning').reduce((s, i) => s + i.count, 0);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
          <Package className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Google Merchant Center</h1>
          <p className="text-sm text-slate-500">ShoeStore Merchant Center</p>
        </div>
      </div>

      {/* Feed health summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-slate-500">Approved Products</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">142</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-slate-500">Disapproved</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-slate-500">Warnings</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-slate-500">Total Issues</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalIssues}</p>
        </div>
      </div>

      {/* AI Insight banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shrink-0">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-900">AI Feed Health Analysis</p>
          <p className="text-sm text-blue-700 mt-1 leading-relaxed">
            24 products were disapproved because of missing product information (GTIN).
            8 products have price mismatches between your Shopify store and Merchant Center feed.
            Fix these issues to restore Shopping campaign visibility and recover an estimated ₹15,000/day in lost revenue.
          </p>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        {merchantIssues.map((issue, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg shrink-0',
                  issue.severity === 'critical' ? 'bg-red-50' : 'bg-amber-50'
                )}>
                  {issue.severity === 'critical' ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{issue.issue}</p>
                  <p className="text-xs text-slate-500">{issue.count} products affected</p>
                </div>
              </div>
              <Badge variant={issue.severity === 'critical' ? 'critical' : 'warning'}>
                {issue.severity}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 pl-12">
              {issue.products.map((prod, j) => (
                <span key={j} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                  {prod}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
