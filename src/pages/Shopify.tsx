import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import {
  ShoppingBag, Package, TrendingUp, TrendingDown, AlertTriangle,
  DollarSign, ShoppingCart, RotateCcw, Users,
} from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';
import { ConnectCard } from '@/components/ConnectCard';
import { shopifyProducts, dashboardTimeSeries } from '@/lib/mockData';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

const revenueData = dashboardTimeSeries.map((d) => ({
  date: d.date,
  orders: d.conversions,
  revenue: d.revenue,
}));

const aiInsights = [
  { icon: AlertTriangle, title: 'TrailBlazer Hiking Boots is out of stock', desc: 'Generated ₹3.9L last month. Estimated lost revenue: ₹13,000/day. Prioritize restocking immediately.', impact: 'high', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: TrendingUp, title: 'SpeedForce Athletic Shoes is trending up', desc: 'Sales up 15.8% week-over-week with only 8 units left. Increase ad spend and restock urgently.', impact: 'high', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: TrendingDown, title: 'UrbanFlex Casual Sneakers sales declining', desc: 'Sales down 18.7% WoW. Out of stock — customers can\'t buy. Consider discontinuing or restocking.', impact: 'medium', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Package, title: 'Dead inventory detected', desc: 'Endurance Pro Running has 180 units in stock but -2.3% sales trend. Create a promotional campaign to clear stock.', impact: 'medium', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: TrendingUp, title: 'Cross-sell opportunity: AirFlex + ProStride', desc: '32% of AirFlex buyers also viewed ProStride Sneakers. Bundle them for a 15% cross-sell lift.', impact: 'low', color: 'text-blue-600', bg: 'bg-blue-50' },
];

export function Shopify() {
  const totalRevenue = shopifyProducts.reduce((s, p) => s + p.revenue, 0);
  const totalUnits = shopifyProducts.reduce((s, p) => s + p.unitsSold, 0);
  const aov = Math.round(totalRevenue / totalUnits);
  const lowStock = shopifyProducts.filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock').length;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
          <ShoppingBag className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Shopify</h1>
          <p className="text-sm text-slate-500">shoestore.myshopify.com</p>
        </div>
      </div>

      <ConnectCard
        platformName="Shopify"
        icon={<ShoppingBag className="h-5 w-5 text-emerald-600" />}
        accentColor="bg-emerald-50"
        connectedText="shoestore.myshopify.com"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Revenue" value={formatCurrency(totalRevenue)} change={8.1} icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard label="Orders" value={String(totalUnits)} change={12.0} icon={<ShoppingCart className="h-5 w-5" />} />
        <KpiCard label="AOV" value={formatCurrency(aov)} change={3.5} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label="Low Stock Items" value={String(lowStock)} change={-25} positive={false} icon={<AlertTriangle className="h-5 w-5" />} />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Users className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Returning Customers</p></div>
          <p className="text-lg font-bold text-slate-900">28.4%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><RotateCcw className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Refund Rate</p></div>
          <p className="text-lg font-bold text-slate-900">2.1%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><Package className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Total Products</p></div>
          <p className="text-lg font-bold text-slate-900">{shopifyProducts.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 mb-1"><TrendingUp className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-500">Best Seller</p></div>
          <p className="text-sm font-bold text-slate-900 truncate">AirFlex Running</p>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Revenue & Orders</h3>
        <p className="text-xs text-slate-500 mb-4">Last 7 days</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="shopRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} formatter={(v: any) => formatCurrency(Number(v))} />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#shopRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Product table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">SKU</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Price</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Inventory</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Units Sold</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Trend</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shopifyProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{p.sku}</td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">₹{p.price}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span className={p.inventory === 0 ? 'text-red-600 font-semibold' : p.inventory < 20 ? 'text-amber-600 font-medium' : 'text-slate-700'}>{p.inventory}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-700">{p.unitsSold}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(p.revenue)}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span className={p.trend > 0 ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'}>
                      {p.trend > 0 ? '+' : ''}{p.trend.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={p.status === 'in-stock' ? 'success' : p.status === 'low-stock' ? 'warning' : 'critical'}>
                      {p.status === 'in-stock' ? 'In Stock' : p.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    </Badge>
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
          <Package className="h-4 w-4 text-emerald-600" /> AI Product Insights
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
