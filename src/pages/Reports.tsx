import { useState, useEffect } from 'react';
import { FileText, Calendar, Download, TrendingUp, TrendingDown, Bot, ChevronRight, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

interface ReportItem {
  _id: string;
  type: 'daily' | 'weekly' | 'monthly';
  title: string;
  dateRange: string;
  summary: string;
  createdAt: string;
  metrics?: { spend: number; revenue: number; roas: number; orders: number };
}

type ReportType = 'all' | 'daily' | 'weekly' | 'monthly';

export function Reports() {
  const [filter, setFilter] = useState<ReportType>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.reports.list()
      .then((data) => { setReports(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? reports : reports.filter((r) => r.type === filter);
  const selectedReport = reports.find((r) => r._id === selected);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <FileText className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Reports</h1>
            <p className="text-sm text-slate-500">AI-generated marketing reports</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          Generate Report
        </button>
      </div>

      <div className="flex items-center gap-2">
        {(['all', 'daily', 'weekly', 'monthly'] as ReportType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors capitalize',
              filter === f ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-slate-500">Loading reports...</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          {filtered.map((report) => (
            <div
              key={report._id}
              onClick={() => setSelected(report._id)}
              className={cn(
                'rounded-xl border bg-white p-4 cursor-pointer transition-all hover:shadow-sm',
                selected === report._id ? 'border-teal-300 ring-1 ring-teal-100' : 'border-slate-200'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                    <FileText className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{report.title}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" /> {report.dateRange}
                    </p>
                  </div>
                </div>
                <Badge variant={report.type === 'daily' ? 'blue' : report.type === 'weekly' ? 'info' : 'neutral'} className="capitalize">
                  {report.type}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 mt-2">{report.summary}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] text-slate-400">
                  {new Date(report.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-8">No reports found.</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6 h-fit">
          {selectedReport ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedReport.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedReport.dateRange}</p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Total Spend</p>
                  <p className="text-lg font-bold text-slate-900">₹{selectedReport.metrics?.spend?.toLocaleString('en-IN') || '48,000'}</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />+5.2%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Revenue</p>
                  <p className="text-lg font-bold text-slate-900">₹{selectedReport.metrics?.revenue?.toLocaleString('en-IN') || '2,10,000'}</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />+8.1%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">ROAS</p>
                  <p className="text-lg font-bold text-slate-900">{selectedReport.metrics?.roas?.toFixed(2) || '4.37'}</p>
                  <p className="text-xs text-red-600 flex items-center gap-0.5"><TrendingDown className="h-3 w-3" />-2.8%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Orders</p>
                  <p className="text-lg font-bold text-slate-900">{selectedReport.metrics?.orders || 186}</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />+12%</p>
                </div>
              </div>

              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-teal-600" />
                  <p className="text-sm font-semibold text-teal-900">AI Summary</p>
                </div>
                <p className="text-sm text-teal-800 leading-relaxed">{selectedReport.summary}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-900 mb-2">Major Changes</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="text-slate-700">Meta frequency reached 5.8 on Interest Stack campaign</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span className="text-slate-700">Google CPC increased 17% on Non-Brand campaigns</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span className="text-slate-700">TrailBlazer Hiking Boots went out of stock</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">AI Recommendations</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Bot className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Reduce Search - Non-Brand Generic budget by 15%</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Bot className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Pause keyword "running shoes online" (CPA ₹816)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Bot className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-slate-700">Upload new Meta creatives to reset frequency</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500">Select a report to view details</p>
              <p className="text-xs text-slate-400 mt-1">Reports include AI-generated summaries and recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
