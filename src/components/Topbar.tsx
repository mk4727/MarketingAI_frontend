import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { api } from '@/lib/api';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api.alerts.list()
      .then((alerts) => setUnreadCount(alerts.filter((a: any) => !a.isRead).length))
      .catch(() => {});
  }, []);

  const initials = user?.avatarInitials || user?.email?.substring(0, 2).toUpperCase() || 'MK';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns, keywords, products..."
            className="w-80 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <button
          onClick={() => navigate('/app/alerts')}
          className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Bell className="h-5 w-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-xs font-bold text-white">
              {initials}
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
              {user?.fullName || user?.email || 'marketer@brand.com'}
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">{user?.email || 'marketer@brand.com'}</p>
                  <p className="text-xs text-slate-500">Growth Plan</p>
                </div>
                <button
                  onClick={() => { setShowProfile(false); navigate('/app/settings'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={async () => { await signOut(); navigate('/'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
