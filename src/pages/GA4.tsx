import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import {
  BarChart3, Users, Eye, TrendingDown, AlertTriangle, Monitor,
  ShoppingCart, Activity,
} from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { ConnectCard } from '@/components/ConnectCard';
import { ga4LandingPages, dashboardTimeSeries } from '@/lib/mockData';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

const trafficData = dashboardTimeSeries.map((d) => ({
  date: d.date,
  users: Math.round(d.impressions / 8),
  sessions: Math.round(d.impressions / 6),
  conversions: d.conversions,
}));

const sourceData = [
  { source: 'Google Ads', users: 12400, rate: 2.1 },
  { source: 'Meta Ads', users: 8200, rate: 1.8 },
  { source: 'Organic Search', users: 6800, rate: 1.5 },
  { source: 'Direct', users: 4200, rate: 2.8 },
  { source: 'Email', users: 2400, rate: 3.2 },
  { source: 'Referral', users: 1200, rate: 0.9 },
];

const aiInsights = [
  { icon: AlertTriangle, title: 'Conversion tracking issue detected', desc: 'Purchase events dropped 40% vs 7-day average. GA4 purchase tag may be misconfigured. Check GTM container for tag status.', impact: 'high', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: TrendingDown, title: 'Checkout conversion dropped from 3.2% to 2.1%', desc: 'Sessions remained stable but checkout completions fell 34%. Possible UX issue or payment gateway problem.', impact: 'high', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Activity, title: 'Traffic anomaly on /products/hiking-boots', desc: 'Sessions dropped 45% in 2 days. Check if the page is loading correctly and if Google Ads is still directing traffic here.', impact: 'medium', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Eye, title: 'High bounce rate on /products/hiking-boots', desc: 'Bounce rate at 45.2% vs site average of 38.4%. Page may need content or loading speed improvements.', impact: 'low', color: 'text-blue-600', bg: 'bg-blue-50' },
];

export function GA4() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
          <BarChart3 className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Google Analytics 4</h1>
          <p className="text-sm text-slate-500">ShoeStore - Web Property</p>
        </div>
      </div>

      <ConnectCard
        platformName="Google Analytics 4"
        icon={<BarChart3 className="h-5 w-5 text-orange-600" />}
        accentColor="bg-orange-50"
        connectedText="ShoeStore - Web Property"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Users" value={formatNumber(35200)} change={5.2} icon={<Users className="h-5 w-5" />} />
        <KpiCard label="Sessions" value={formatNumber(48600)} change={4.8} icon={<Eye className="h-5 w-5" />} />
        <KpiCard label="Conversions" value="186" change={-18.0} positive={false} icon={<ShoppingCart className="h-5 w-5" />} />
        <KpiCard label="Revenue" value={formatCurrency(210000)} change={8.1} icon={<TrendingDown className="h-5 w-5" />} />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Activity className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Engagement Rate</p></div>
          <p className="text-lg font-bold text-slate-900">62.4%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Monitor className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Bounce Rate</p></div>
          <p className="text-lg font-bold text-slate-900">38.4%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><TrendingDown className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Conv. Rate</p></div>
          <p className="text-lg font-bold text-red-600">0.38%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><ShoppingCart className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">AOV</p></div>
          <p className="text-lg font-bold text-slate-900">₹1,129</p>
        </div>
      </div>

      {/* Traffic chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Users & Sessions</h3>
        <p className="text-xs text-slate-500 mb-4">Last 7 days</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Area type="monotone" dataKey="users" stroke="#f97316" strokeWidth={2} fill="url(#usersGrad)" />
            <Area type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} fill="url(#sessGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Source/Medium */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Traffic by Source</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sourceData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="users" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Conversion Rate by Source</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sourceData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: any) => `${v}%`} />
              <Bar dataKey="rate" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Landing pages table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Top Landing Pages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Page</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Sessions</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Conversions</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Conv. Rate</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ga4LandingPages.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.page}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{formatNumber(p.sessions)}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{p.conversions}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span className={p.rate >= 1.5 ? 'text-emerald-600 font-medium' : p.rate >= 1.0 ? 'text-slate-700' : 'text-red-600 font-medium'}>{p.rate.toFixed(2)}%</span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(p.revenue)}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span className={p.bounceRate > 42 ? 'text-amber-600 font-medium' : 'text-slate-700'}>{p.bounceRate.toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" /> AI Analytics Insights
        </h3>
        <div className="space-y-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 flex items-start gap-3">
              <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg shrink-0', insight.bg)}>
                <insight.icon className={cn('h-4 w-4', insight.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-900">{insight.title}</p>
                  <Badge variant={insight.impact === 'high' ? 'critical' : insight.impact === 'medium' ? 'warning' : 'info'} className="text-[10px]">{insight.impact}</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
