import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  Facebook,
  ShoppingBag,
  BarChart3,
  Bot,
  Bell,
  FileText,
  Settings,
  Package,
  Tag,
  Code2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/google-ads', label: 'Google Ads', icon: Megaphone },
  { to: '/app/meta-ads', label: 'Meta Ads', icon: Facebook },
  { to: '/app/shopify', label: 'Shopify', icon: ShoppingBag },
  { to: '/app/ga4', label: 'GA4', icon: BarChart3 },
  { to: '/app/merchant', label: 'Merchant Center', icon: Package },
  { to: '/app/gtm', label: 'Tag Manager', icon: Code2 },
  { to: '/app/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/app/alerts', label: 'Alerts', icon: Bell },
  { to: '/app/reports', label: 'Reports', icon: FileText },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuthStore();
  const items = user?.isAdmin
    ? [...navItems, { to: '/app/admin', label: 'Admin Portal', icon: ShieldCheck }]
    : navItems;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-700 bg-slate-900">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-700">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 shadow-sm">
          <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight">MarketingAI</h1>
          <p className="text-[11px] text-slate-400 leading-tight">Performance Assistant</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-teal-500/10 text-teal-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <div className="rounded-lg bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-3.5 border border-teal-500/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Tag className="h-4 w-4 text-teal-400" />
            <p className="text-xs font-semibold text-teal-300">Growth Plan</p>
          </div>
          <p className="text-[11px] text-teal-400/80 mb-2">5 accounts connected</p>
          <button className="text-[11px] font-medium text-teal-400 hover:text-teal-300 transition-colors">
            Upgrade plan →
          </button>
        </div>
      </div>
    </aside>
  );
}
