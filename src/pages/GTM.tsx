import { Code2, AlertTriangle, CheckCircle, XCircle, Tag, Zap, Variable } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { gtmTags } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function GTM() {
  const activeTags = gtmTags.filter((t) => t.status === 'active').length;
  const pausedTags = gtmTags.filter((t) => t.status === 'paused').length;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Code2 className="h-5 w-5 text-slate-700" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Google Tag Manager</h1>
          <p className="text-sm text-slate-500">ShoeStore - GTM Container</p>
        </div>
      </div>

      {/* Container status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-slate-500">Published Version</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">v24</p>
          <p className="text-xs text-slate-400 mt-1">Last published: Sep 12</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-slate-500">Active Tags</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{activeTags}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-slate-500">Triggers</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{gtmTags.filter((t) => t.type === 'Trigger').length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-2">
            <Variable className="h-5 w-5 text-violet-600" />
            <p className="text-sm text-slate-500">Variables</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{gtmTags.filter((t) => t.type === 'Variable').length}</p>
        </div>
      </div>

      {/* AI Detection banner */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 shrink-0">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-900">AI Tracking Detection</p>
          <p className="text-sm text-amber-700 mt-1 leading-relaxed">
            The "Meta Pixel - Purchase" tag is currently paused. This means Meta Ads is not receiving
            purchase conversion data, which could affect campaign optimization and ROAS reporting.
            Re-enable this tag to restore full tracking.
          </p>
        </div>
      </div>

      {/* Tags table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Container Contents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Triggers</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Last Changed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gtmTags.map((tag, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{tag.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant={tag.type === 'Tag' ? 'blue' : tag.type === 'Trigger' ? 'warning' : 'neutral'}>{tag.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{tag.triggers}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {tag.status === 'active' ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-xs text-emerald-700 font-medium">Active</span>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="text-xs text-amber-700 font-medium">Paused</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-500">{tag.lastChanged}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" /> AI Tracking Recommendations
        </h3>
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Re-enable Meta Pixel - Purchase tag</p>
              <p className="text-sm text-slate-600 mt-0.5">This tag is paused, causing Meta Ads to lose conversion data. This affects campaign optimization and ROAS calculation.</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Add missing GA4 view_item event</p>
              <p className="text-sm text-slate-600 mt-0.5">No view_item tag detected. This event is needed for dynamic retargeting and detailed product reporting.</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">All Google Ads conversion tags are healthy</p>
              <p className="text-sm text-slate-600 mt-0.5">Conversion tracking for Google Ads is properly configured and firing correctly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
