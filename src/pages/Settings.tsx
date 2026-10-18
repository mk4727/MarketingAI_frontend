import { useState, useEffect, useCallback } from 'react';
import {
  Settings as SettingsIcon, Megaphone, Facebook, ShoppingBag, BarChart3,
  Package, Code2, Check, X, Plus, User, CreditCard, Bell,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';
import type { Platform } from '@/types';

const platformConfig: Record<Platform, { name: string; icon: React.ElementType; color: string; bg: string; desc: string }> = {
  'google-ads': { name: 'Google Ads', icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Campaign data, keywords, and performance metrics' },
  'meta-ads': { name: 'Meta Ads', icon: Facebook, color: 'text-violet-600', bg: 'bg-violet-50', desc: 'Campaign, creative, and audience data' },
  'shopify': { name: 'Shopify', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Orders, products, inventory, and revenue' },
  'ga4': { name: 'Google Analytics 4', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Traffic, sessions, conversions, and funnels' },
  'merchant': { name: 'Merchant Center', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Product feed health and approvals' },
  'gtm': { name: 'Tag Manager', icon: Code2, color: 'text-slate-600', bg: 'bg-slate-100', desc: 'Tags, triggers, and conversion tracking' },
};

type Tab = 'connections' | 'profile' | 'billing' | 'notifications';

interface Account {
  _id: string;
  platform: Platform;
  accountName: string;
  status: 'connected' | 'disconnected' | 'error';
  connectedAt: string | null;
}

export function Settings() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>('connections');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  const loadAccounts = useCallback(async () => {
    try {
      const data = await api.settings.accounts();
      setAccounts(data);
    } catch {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAccounts(); }, [loadAccounts]);

  const toggleConnection = async (id: string) => {
    try {
      const updated = await api.settings.toggleAccount(id);
      setAccounts((prev) => prev.map((a) => (a._id === id ? updated : a)));
    } catch { /* ignore */ }
  };

  const syncAll = async () => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const result = await api.integrations.syncAll();
      setSyncMsg(result.synced ? `Synced ${result.count} campaigns from Google Ads and Meta Ads` : 'No platforms configured yet');
    } catch {
      setSyncMsg('Sync failed — check your API credentials in backend/.env');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <SettingsIcon className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">Manage your account and integrations</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
        {([
          { id: 'connections', label: 'Connected Accounts', icon: Megaphone },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'billing', label: 'Billing', icon: CreditCard },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap',
              tab === t.id ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'connections' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100/50 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-900">Sync Platform Data</p>
              <p className="text-xs text-teal-700/70 mt-0.5">Pull latest campaigns and metrics from Google Ads, Meta Ads, and Shopify</p>
              {syncMsg && <p className="text-xs text-teal-800 mt-1.5">{syncMsg}</p>}
            </div>
            <button
              onClick={syncAll}
              disabled={syncing}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>

          {loading && <p className="text-sm text-slate-500">Loading...</p>}
          {!loading && accounts.map((account) => {
            const config = platformConfig[account.platform];
            const Icon = config.icon;
            const isConnected = account.status === 'connected';
            return (
              <div key={account._id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', config.bg)}>
                      <Icon className={cn('h-5 w-5', config.color)} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{config.name}</p>
                        <Badge variant={isConnected ? 'success' : 'neutral'}>
                          {isConnected ? (
                            <><Check className="h-3 w-3" /> Connected</>
                          ) : (
                            <><X className="h-3 w-3" /> Disconnected</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isConnected ? account.accountName : config.desc}
                      </p>
                      {isConnected && account.connectedAt && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Connected on {new Date(account.connectedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleConnection(account._id)}
                    className={cn(
                      'rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
                      isConnected
                        ? 'border border-slate-300 text-slate-600 hover:bg-slate-50'
                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                    )}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
          {!loading && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 flex items-center justify-center">
              <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <Plus className="h-4 w-4" />
                Add new integration
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'profile' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-xl font-bold text-white">
              {user?.avatarInitials || 'MK'}
            </div>
            <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Change avatar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <input
                type="text"
                defaultValue={user?.fullName || ''}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                disabled
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
              <input
                type="text"
                defaultValue=""
                placeholder="Your company"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <select className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all">
                <option>D2C Business Owner</option>
                <option>Performance Marketer</option>
                <option>Marketing Agency</option>
              </select>
            </div>
          </div>

          <button className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all">
            Save changes
          </button>
        </div>
      )}

      {tab === 'billing' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-teal-900">Current Plan</p>
                <p className="text-2xl font-bold text-teal-900 mt-1">Growth · ₹4,999/month</p>
              </div>
              <Badge variant="info">Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-teal-700/70">Next billing date</p><p className="font-medium text-teal-900">Oct 15, 2026</p></div>
              <div><p className="text-teal-700/70">Accounts used</p><p className="font-medium text-teal-900">5 of 5</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Starter', price: '₹1,999', current: false },
              { name: 'Growth', price: '₹4,999', current: true },
              { name: 'Agency', price: '₹9,999', current: false },
            ].map((plan) => (
              <div key={plan.name} className={cn('rounded-xl border p-4', plan.current ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white')}>
                <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                <p className="text-xl font-bold text-slate-900 mt-1">{plan.price}<span className="text-xs font-normal text-slate-500">/mo</span></p>
                {plan.current ? (
                  <Badge variant="info" className="mt-2">Current plan</Badge>
                ) : (
                  <button className="mt-2 w-full rounded-lg border border-slate-300 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Switch to {plan.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          {[
            { label: 'Critical alerts', desc: 'ROAS drops, out of stock, tracking issues', enabled: true },
            { label: 'Warning alerts', desc: 'CPC increases, frequency rising, sales declining', enabled: true },
            { label: 'Info alerts', desc: 'Campaign performance changes, budget recommendations', enabled: true },
            { label: 'Daily report emails', desc: 'Receive a daily performance summary via email', enabled: true },
            { label: 'Weekly report emails', desc: 'Receive a weekly performance analysis every Monday', enabled: false },
            { label: 'AI recommendations', desc: 'Get notified when AI finds new optimization opportunities', enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  item.enabled ? 'bg-teal-600' : 'bg-slate-200'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                  item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                )} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
