import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import {
  Megaphone, Search, TrendingDown, TrendingUp, Ban,
  ArrowUpRight,
} from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { ConnectCard } from '@/components/ConnectCard';
import { api } from '@/lib/api';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import { dashboardTimeSeries, googleAdsKeywords } from '@/lib/mockData';

type Tab = 'campaigns' | 'keywords' | 'ai-insights';

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
}

export function GoogleAds() {
  const [tab, setTab] = useState<Tab>('campaigns');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.campaigns.list('google-ads')
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
  const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;

  const aiInsights = [
    { icon: TrendingDown, title: 'Pause keyword "running shoes online"', desc: '₹3,262 spend, only 4 conversions (CPA ₹816). Your target CPA is ₹250. Pausing saves ₹3,200/week.', impact: 'high', action: 'Pause Keyword', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: Ban, title: 'Add "cheap" as negative keyword', desc: '240 clicks, 2 conversions, CPA ₹1,692. "cheap" attracts bargain hunters who don\'t convert.', impact: 'high', action: 'Add Negative', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: TrendingDown, title: 'Reduce Search - Non-Brand Generic budget by 15%', desc: 'ROAS at 3.06 vs account avg 4.79. Reallocate ₹1,860/day to Performance Max (ROAS 5.71).', impact: 'high', action: 'Reduce Budget', color: 'text-red-600', bg: 'bg-red-50' },
    { icon: TrendingUp, title: 'Scale Performance Max campaign', desc: 'ROAS 5.71 with healthy CPA ₹204. Budget can sustain 20-30% increase without efficiency loss.', impact: 'medium', action: 'Increase Budget', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Ban, title: 'Exclude placement "gameapp123"', desc: '12,000 impressions, 0 conversions, ₹1,200 wasted. Mobile in-app placement with no purchase intent.', impact: 'medium', action: 'Exclude', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Search, title: 'Add "branded sneakers" to all campaigns', desc: 'Exact match, 1.60% CTR, CPA ₹197 — well below target. Consider expanding to phrase match.', impact: 'low', action: 'Expand Keyword', color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
          <Megaphone className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Google Ads</h1>
          <p className="text-sm text-slate-500">ShoeStore India - MCC</p>
        </div>
      </div>

      <ConnectCard
        platformName="Google Ads"
        icon={<Megaphone className="h-5 w-5 text-blue-600" />}
        accentColor="bg-blue-50"
        connectedText="ShoeStore India - MCC"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Spend" value={formatCurrency(totalSpend)} change={5.2} icon={<Megaphone className="h-5 w-5" />} />
        <KpiCard label="Revenue" value={formatCurrency(totalRevenue)} change={7.8} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="ROAS" value={totalRoas.toFixed(2)} change={-1.5} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Conversions" value={String(totalConversions)} change={9.2} icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 mb-1">Avg CPC</p>
          <div className="flex items-end justify-between">
            <p className="text-lg font-bold text-slate-900">₹{avgCpc.toFixed(1)}</p>
            <span className="text-xs font-semibold text-red-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />17%</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 mb-1">Avg CTR</p>
          <div className="flex items-end justify-between">
            <p className="text-lg font-bold text-slate-900">{avgCtr.toFixed(2)}%</p>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />0.3%</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 mb-1">Avg CPA</p>
          <div className="flex items-end justify-between">
            <p className="text-lg font-bold text-slate-900">₹{avgCpa.toFixed(0)}</p>
            <span className="text-xs font-semibold text-red-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />8%</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500 mb-1">Impressions</p>
          <div className="flex items-end justify-between">
            <p className="text-lg font-bold text-slate-900">{formatNumber(totalImpressions)}</p>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />12%</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Performance Trend</h3>
        <p className="text-xs text-slate-500 mb-4">Last 7 days</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={dashboardTimeSeries}>
            <defs>
              <linearGradient id="gSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: any) => formatCurrency(Number(v))} />
            <Area type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} fill="url(#gSpend)" />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#gRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1 border-b border-slate-200">
        {([
          { id: 'campaigns', label: 'Campaigns' },
          { id: 'keywords', label: 'Keywords' },
          { id: 'ai-insights', label: 'AI Insights' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
              tab === t.id ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

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
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Clicks</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CTR</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CPC</th>
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
                    <td className="px-4 py-3 text-right">
                      <Badge variant={c.status === 'active' ? 'success' : 'neutral'}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(c.spend)}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(c.revenue)}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold">
                      <span className={c.roas >= 4 ? 'text-emerald-600' : c.roas >= 3 ? 'text-amber-600' : 'text-red-600'}>{c.roas.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{c.clicks}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{c.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">₹{c.cpc.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">{c.conversions}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700">₹{c.cpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'keywords' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Keyword</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Match Type</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Clicks</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Impr.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CTR</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CPC</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Cost</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Conv.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">CPA</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">AI Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {googleAdsKeywords.map((k) => {
                  const cpaHigh = k.cpa > 500;
                  const cpaMed = k.cpa > 250 && k.cpa <= 500;
                  return (
                    <tr key={k.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{k.keyword}</td>
                      <td className="px-4 py-3"><Badge variant="neutral">{k.matchType}</Badge></td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">{k.clicks}</td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">{formatNumber(k.impressions)}</td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">{k.ctr.toFixed(2)}%</td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">₹{k.cpc.toFixed(1)}</td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(k.cost)}</td>
                      <td className="px-4 py-3 text-right text-sm text-slate-700">{k.conversions}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <span className={cpaHigh ? 'text-red-600 font-semibold' : cpaMed ? 'text-amber-600 font-medium' : 'text-slate-700'}>
                          {k.cpa > 0 ? `₹${k.cpa}` : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {cpaHigh ? (
                          <button className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto">
                            <Ban className="h-3 w-3" /> Pause
                          </button>
                        ) : k.conversions === 0 ? (
                          <button className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 ml-auto">
                            <Ban className="h-3 w-3" /> Negate
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">No action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
