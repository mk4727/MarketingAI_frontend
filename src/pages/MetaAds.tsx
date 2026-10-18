import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, Zap, Eye, MousePointer,
  Repeat, Target,
} from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { ConnectCard } from '@/components/ConnectCard';
import { api } from '@/lib/api';
import { dashboardTimeSeries } from '@/lib/mockData';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

type Tab = 'campaigns' | 'creatives' | 'ai-insights';

interface Campaign {
  _id: string;
  name: string;
  status: string;
  spend: number;
  revenue: number;
  roas: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  conversions: number;
  cpa: number;
  frequency?: number;
}

const creativeData = [
  { name: 'Creative A - Lifestyle Video', spend: 4200, revenue: 31000, roas: 7.38, ctr: 1.8, frequency: 1.4, status: 'winning' },
  { name: 'Creative B - Product Showcase', spend: 3800, revenue: 18000, roas: 4.74, ctr: 1.2, frequency: 2.8, status: 'average' },
  { name: 'Creative C - UGC Testimonial', spend: 2600, revenue: 14000, roas: 5.38, ctr: 1.5, frequency: 2.1, status: 'good' },
  { name: 'Creative D - Static Image', spend: 3200, revenue: 8200, roas: 2.56, ctr: 0.8, frequency: 5.8, status: 'fatigued' },
  { name: 'Creative E - Carousel Ad', spend: 1800, revenue: 6800, roas: 3.78, ctr: 0.9, frequency: 4.2, status: 'declining' },
];

const frequencyData = [
  { date: 'Sep 7', frequency: 1.2 },
  { date: 'Sep 8', frequency: 1.5 },
  { date: 'Sep 9', frequency: 1.8 },
  { date: 'Sep 10', frequency: 2.4 },
  { date: 'Sep 11', frequency: 3.6 },
  { date: 'Sep 12', frequency: 4.8 },
  { date: 'Sep 13', frequency: 5.8 },
];

export function MetaAds() {
  const [tab, setTab] = useState<Tab>('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.campaigns.list('meta-ads')
      .then((data) => { setCampaigns(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const avgCpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgCpm = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;

  const aiInsights = [
    { icon: AlertTriangle, title: 'Creative fatigue detected on Interest Stack campaign', desc: 'Frequency reached 5.8 (up from 1.2 in 7 days). CTR dropped from 1.8% to 0.8%. Upload 3-5 new creatives immediately to reset frequency.', impact: 'high', action: 'Refresh Creatives', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: TrendingUp, title: 'Scale Retargeting - 30 Day campaign', desc: 'ROAS 7.50 with low frequency (3.2). This campaign has headroom for 20% budget increase. Expected additional revenue: ₹7,200/day.', impact: 'high', action: 'Increase Budget', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Zap, title: 'Creative A is your winner', desc: 'Lifestyle Video creative has 35% higher ROAS than account average. Consider creating 3 variations of this format.', impact: 'medium', action: 'Duplicate & Test', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: TrendingDown, title: 'Pause Creative D - Static Image', desc: 'ROAS dropped to 2.56 with frequency 5.8. This creative is exhausted and burning budget.', impact: 'medium', action: 'Pause Creative', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Target, title: 'Lookalike audience 1% is outperforming', desc: 'ROAS 6.67 vs Interest Stack 3.33. Consider testing 2% and 3% lookalike audiences for scale.', impact: 'low', action: 'Test New Audience', color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
          <svg className="h-5 w-5 text-violet-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.92v-8.44H7.08v-3.48h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.48h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z"/></svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Meta Ads</h1>
          <p className="text-sm text-slate-500">ShoeStore Business Manager</p>
        </div>
      </div>

      <ConnectCard
        platformName="Meta Ads"
        icon={<svg className="h-5 w-5 text-violet-600" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.92v-8.44H7.08v-3.48h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.48h-2.8v8.44C19.61 23.08 24 18.09 24 12.07z"/></svg>}
        accentColor="bg-violet-50"
        connectedText="ShoeStore Business Manager"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Spend" value={formatCurrency(totalSpend)} change={4.8} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Revenue" value={formatCurrency(totalRevenue)} change={6.2} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="ROAS" value={totalRoas.toFixed(2)} change={-3.5} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Purchases" value={String(totalConversions)} change={8.5} icon={<Target className="h-5 w-5" />} />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Eye className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Impressions</p></div>
          <p className="text-lg font-bold text-slate-900">{formatNumber(totalImpressions)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><MousePointer className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Avg CTR</p></div>
          <p className="text-lg font-bold text-slate-900">{avgCtr.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><TrendingDown className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Avg CPC</p></div>
          <p className="text-lg font-bold text-slate-900">₹{avgCpc.toFixed(1)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Repeat className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Avg CPM</p></div>
          <p className="text-lg font-bold text-slate-900">₹{avgCpm.toFixed(1)}</p>
        </div>
      </div>

      {/* Frequency chart - critical for Meta */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Frequency Trend</h3>
            <p className="text-xs text-slate-500">Prospecting - Interest Stack campaign</p>
          </div>
          <Badge variant="critical">Critical: 5.8 frequency</Badge>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={frequencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 7]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Line type="monotone" dataKey="frequency" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {([
          { id: 'campaigns', label: 'Campaigns' },
          { id: 'creatives', label: 'Creatives' },
          { id: 'ai-insights', label: 'AI Insights' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
              tab === t.id ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Campaigns tab */}
      {tab === 'campaigns' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Campaign</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Spend</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Revenue</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">ROAS</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CTR</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CPC</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Freq.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Conv.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr><td colSpan={10} className="px-4 py-6 text-center text-sm text-slate-500">Loading...</td></tr>
                )}
                {campaigns.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{c.name}</td>
                    <td className="px-4 py-3 text-right"><Badge variant={c.status === 'active' ? 'success' : 'neutral'}>{c.status}</Badge></td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(c.spend)}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(c.revenue)}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold">
                      <span className={c.roas >= 5 ? 'text-emerald-600' : c.roas >= 3.5 ? 'text-amber-600' : 'text-red-600'}>{c.roas.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{c.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">₹{c.cpc.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <span className={c.frequency && c.frequency >= 5 ? 'text-red-600 font-semibold' : c.frequency && c.frequency >= 3 ? 'text-amber-600 font-medium' : 'text-slate-700'}>{c.frequency?.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{c.conversions}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">₹{c.cpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Creatives tab */}
      {tab === 'creatives' && (
        <div className="space-y-3">
          {creativeData.map((cr, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cr.name}</p>
                    <p className="text-xs text-slate-500">Frequency {cr.frequency} · CTR {cr.ctr}%</p>
                  </div>
                </div>
                <Badge variant={cr.status === 'winning' ? 'success' : cr.status === 'fatigued' ? 'critical' : cr.status === 'declining' ? 'warning' : 'neutral'}>
                  {cr.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><p className="text-xs text-slate-500">Spend</p><p className="text-sm font-semibold text-slate-900">{formatCurrency(cr.spend)}</p></div>
                <div><p className="text-xs text-slate-500">Revenue</p><p className="text-sm font-semibold text-slate-900">{formatCurrency(cr.revenue)}</p></div>
                <div><p className="text-xs text-slate-500">ROAS</p><p className="text-sm font-semibold text-slate-900">{cr.roas.toFixed(2)}</p></div>
                <div><p className="text-xs text-slate-500">CTR</p><p className="text-sm font-semibold text-slate-900">{cr.ctr}%</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Insights tab */}
      {tab === 'ai-insights' && (
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
                <button className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors">
                  {insight.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
