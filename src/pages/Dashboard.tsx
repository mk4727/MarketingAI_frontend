import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import {
  Megaphone, DollarSign, TrendingUp, ShoppingBag, AlertTriangle, Bot,
  Zap, Clock, ChevronRight,
} from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import {
  dashboardTimeSeries, channelData, aiRecommendations,
  googleAdsCampaigns, metaAdsCampaigns,
} from '@/lib/mockData';
import { formatCurrency, getGreeting, cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { api } from '@/lib/api';

interface DashboardData {
  kpis: { spend: number; revenue: number; roas: number; orders: number; aov: number };
  platformBreakdown?: Record<string, { spend: number; revenue: number; clicks: number; impressions: number; conversions: number }>;
  shopify?: { totalRevenue: number; totalOrders: number; aov: number } | null;
  alerts: { id: string; severity: string; platform: string; title: string; description: string; isRead: boolean }[];
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.dashboard.get().then(setData).catch(() => {});
  }, []);

  const greeting = getGreeting();
  const userName = user?.fullName || user?.email?.split('@')[0] || 'there';

  const totalSpend = data?.kpis.spend ?? 48000;
  const totalRevenue = data?.kpis.revenue ?? 210000;
  const totalRoas = data?.kpis.roas ?? 4.37;
  const totalOrders = data?.kpis.orders ?? 186;
  const aov = data?.kpis.aov ?? Math.round(totalRevenue / totalOrders);

  const apiAlerts = data?.alerts ?? [];
  const unreadAlerts = apiAlerts.filter(a => !a.isRead).length;

  const googleData = data?.platformBreakdown?.['google-ads'];
  const googleSpend = googleData?.spend ?? googleAdsCampaigns.reduce((s, c) => s + c.spend, 0);
  const googleRevenue = googleData?.revenue ?? googleAdsCampaigns.reduce((s, c) => s + c.revenue, 0);
  const googleRoas = googleSpend > 0 ? googleRevenue / googleSpend : 0;

  const metaData = data?.platformBreakdown?.['meta-ads'];
  const metaSpend = metaData?.spend ?? metaAdsCampaigns.reduce((s, c) => s + c.spend, 0);
  const metaRevenue = metaData?.revenue ?? metaAdsCampaigns.reduce((s, c) => s + c.revenue, 0);
  const metaRoas = metaSpend > 0 ? metaRevenue / metaSpend : 0;

  const pieData = channelData.filter((c) => c.revenue > 0).map((c) => ({
    name: c.name,
    value: c.revenue,
    color: c.color,
  }));

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {greeting}, {userName} <span className="inline-block">👋</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> Yesterday's performance · September 12, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Ad Spend" value={formatCurrency(totalSpend)} change={5.2} icon={<Megaphone className="h-5 w-5" />} />
        <KpiCard label="Revenue" value={formatCurrency(totalRevenue)} change={8.1} icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard label="ROAS" value={totalRoas.toFixed(2)} change={-2.8} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Orders" value={String(totalOrders)} change={12.0} icon={<ShoppingBag className="h-5 w-5" />} />
        <KpiCard label="AOV" value={formatCurrency(aov)} change={3.5} icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Spend vs Revenue</h3>
              <p className="text-xs text-slate-500">Last 7 days</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                <span className="text-xs text-slate-600">Spend</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                <span className="text-xs text-slate-600">Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dashboardTimeSeries} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(value: any) => formatCurrency(Number(value))}
              />
              <Area type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} fill="url(#spendGrad)" />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Revenue by Channel</h3>
          <p className="text-xs text-slate-500 mb-4">Yesterday</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: ch.color }} />
                  <span className="text-xs text-slate-600">{ch.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-900">{formatCurrency(ch.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Megaphone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Google Ads</h3>
                <p className="text-xs text-slate-500">6 campaigns</p>
              </div>
            </div>
            <button onClick={() => navigate('/app/google-ads')} className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-colors">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Spend</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(googleSpend)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Revenue</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(googleRevenue)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">ROAS</p>
              <p className="text-lg font-bold text-emerald-600">{googleRoas.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={googleAdsCampaigns.slice(0, 5)}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} formatter={(v: any) => formatCurrency(Number(v))} />
                <Bar dataKey="spend" fill="#93c5fd" radius={[3, 3, 0, 0]} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                <svg className="h-4 w-4 text-violet-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.92v-8.44H7.08v-3.48h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.48h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z"/></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Meta Ads</h3>
                <p className="text-xs text-slate-500">4 campaigns</p>
              </div>
            </div>
            <button onClick={() => navigate('/app/meta-ads')} className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-colors">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Spend</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(metaSpend)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Revenue</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(metaRevenue)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">ROAS</p>
              <p className="text-lg font-bold text-amber-600">{metaRoas.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={metaAdsCampaigns}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 11 }} formatter={(v: any) => formatCurrency(Number(v))} />
                <Bar dataKey="spend" fill="#c4b5fd" radius={[3, 3, 0, 0]} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Problems Detected</h3>
            <Badge variant="critical" className="ml-auto">{unreadAlerts} new</Badge>
          </div>
          <div className="space-y-3">
            {apiAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/app/alerts')}>
                <div className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-lg shrink-0',
                  alert.severity === 'critical' ? 'bg-red-50' : alert.severity === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                )}>
                  <AlertTriangle className={cn(
                    'h-3.5 w-3.5',
                    alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{alert.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="neutral" className="text-[10px]">{alert.platform}</Badge>
                  </div>
                </div>
              </div>
            ))}
            {apiAlerts.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No alerts detected.</p>
            )}
          </div>
          <button onClick={() => navigate('/app/alerts')} className="mt-3 w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors py-2">
            View all alerts →
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">AI Recommendations</h3>
            <Badge variant="info" className="ml-auto">{aiRecommendations.filter(r => r.status === 'pending').length} pending</Badge>
          </div>
          <div className="space-y-3">
            {aiRecommendations.slice(0, 4).map((rec) => (
              <div key={rec.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0 bg-blue-50">
                  <Zap className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{rec.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{rec.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant={rec.impact === 'high' ? 'critical' : rec.impact === 'medium' ? 'warning' : 'neutral'} className="text-[10px]">{rec.impact} impact</Badge>
                    <Badge variant="neutral" className="text-[10px]">{rec.platform}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/app/ai-assistant')} className="mt-3 w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors py-2">
            Ask AI Assistant →
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">ROAS Trend</h3>
            <p className="text-xs text-slate-500">Last 7 days</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            <span className="text-xs text-slate-600">ROAS</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={dashboardTimeSeries}>
            <defs>
              <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[3.5, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: any) => Number(v).toFixed(2)} />
            <Area type="monotone" dataKey="roas" stroke="#10b981" strokeWidth={2.5} fill="url(#roasGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
